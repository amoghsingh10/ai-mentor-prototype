import { Message, UserContext } from '../types';
import { GoogleGenerativeAI, Part } from '@google/generative-ai';

// Initialize the Gemini API client
// Note: In a production app, this should be called from a secure backend.
// For this prototype, we are using the frontend directly.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `You are a helpful, empathetic, and knowledgeable financial mentor.
Your goal is to educate the user about personal finance concepts like Mutual Funds, Compound Interest, Debt, Real Estate, Mortgages, and 401ks.
Keep your answers engaging, concise (1-2 short paragraphs), and easy to understand for beginners.
Avoid giving concrete legal or investment advice; use terms like "educational purposes," "generally," or "typically."

IMPORTANT INSTRUCTIONS FOR RICH UI FEATURES:
1. If the user asks to see compounding interest, math, or a chart, MUST append the exact text "[SHOW_CHART]" at the very end of your response.
2. At the end of every response, provide 2-3 short, relevant follow-up questions the user can ask next. Format these exactly like this at the very end of your message:
[OPTIONS]: Option 1 | Option 2 | Option 3
`;

export const getMentorResponse = async (
    userInput: string,
    context: UserContext,
    history: Message[] = []
): Promise<Message> => {
    
    if (!API_KEY) {
         return {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
            role: 'mentor',
            content: "⚠️ **Missing API Key:** It looks like the Gemini API key is missing. Please add `VITE_GEMINI_API_KEY` to your `.env` file and restart the development server.",
            isChartMsg: false,
        };
    }

    try {
        // Use gemini-1.5-flash because it has a generous free tier
        const model = genAI.getGenerativeModel({
             model: 'gemini-1.5-flash',
             systemInstruction: SYSTEM_PROMPT
        });

        // Convert our Message history into Gemini's expected format
        // Gemini REQUIRES that history starts with a user message and strictly alternates.
        const formattedHistory: {role: string, parts: Part[]}[] = [];

        for (const msg of history) {
            const role = msg.role === 'user' ? 'user' : 'model';
            
            // If the first message in the array is from the model, prepend a generic user greeting
            if (formattedHistory.length === 0 && role === 'model') {
                formattedHistory.push({
                    role: 'user',
                    parts: [{ text: "Hello AI Mentor!" }]
                });
            }
            
            // Ensure strict alternation by combining consecutive messages of the same role
            if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === role) {
                formattedHistory[formattedHistory.length - 1].parts[0].text += `\n\n${msg.content}`;
            } else {
                formattedHistory.push({
                    role,
                    parts: [{ text: msg.content }]
                });
            }
        }

        const chat = model.startChat({
             history: formattedHistory,
             generationConfig: {
                maxOutputTokens: 500,
             }
        });

        const contextInfo = `User Profile:
- Monthly Surplus: $${context.monthlySurplus}
- Goal: ${context.goal}
- Risk Tolerance: ${context.riskTolerance}
`;

        // Send the message with context
        const result = await chat.sendMessage(`${contextInfo}\n\nUser Message: ${userInput}`);
        const textResponse = result.response.text();

        // Parse special UI tags from the LLM response
        let cleanText = textResponse;
        let isChartMsg = false;
        let optionsList: string[] | undefined = undefined;

        // Check for chart tag
        if (cleanText.includes('[SHOW_CHART]')) {
             isChartMsg = true;
             cleanText = cleanText.replace('[SHOW_CHART]', '').trim();
        }

        // Check for options tag
        const optionsMatch = cleanText.match(/\[OPTIONS\]:\s*(.*)/);
        if (optionsMatch) {
             const optionsString = optionsMatch[1];
             optionsList = optionsString.split('|').map(opt => opt.trim()).filter(Boolean);
             cleanText = cleanText.replace(optionsMatch[0], '').trim();
        }

        // Default options if LLM forgets to provide them
        if (!optionsList || optionsList.length === 0) {
             optionsList = ["What else should I know?", "Explain compound interest", "Show me the math"];
        }

        return {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
            role: 'mentor',
            content: cleanText,
            isChartMsg,
            options: optionsList
        };

    } catch (error) {
        console.error("Gemini API Error:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
            role: 'mentor',
            content: `Oops! I'm having trouble connecting to my brain right now.\n\n**Error details:** ${errorMessage}\n\nPlease check that your \`VITE_GEMINI_API_KEY\` is valid in your \`.env\` file and that you've restarted the development server.`,
            isChartMsg: false,
        };
    }
};
