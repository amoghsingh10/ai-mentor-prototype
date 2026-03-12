import { Message, UserContext } from '../types';
import { KNOWLEDGE_BASE, Topic } from './knowledgeBase';

export const getMentorResponse = (userInput: string, context: UserContext): Message => {
    const lowerInput = userInput.toLowerCase();

    let bestMatch: Topic | null = null;
    let maxMatchedWords = 0;

    for (const topic of KNOWLEDGE_BASE) {
        for (const keyword of topic.keywords) {
            if (lowerInput.includes(keyword)) {
                // Simple heuristic: Longest keyword match wins
                if (keyword.length > maxMatchedWords) {
                    maxMatchedWords = keyword.length;
                    bestMatch = topic;
                }
            }
        }
    }

    let contentStr = "I'm still learning, but I'm here to help you understand how your money can grow! I can explain things like Mutual Funds, Compound Interest, Debt, Real Estate, Mortgages, or 401ks. What would you like to explore?";
    let isChartMsg = false;
    let optionsList: string[] | undefined = ["What is an Index Fund?", "Explain Compound Interest", "Show me the math"];

    if (bestMatch) {
        contentStr = typeof bestMatch.content === 'function' ? bestMatch.content(context) : bestMatch.content;
        isChartMsg = bestMatch.isChart || false;
        optionsList = bestMatch.options;
    }

    return {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
        role: 'mentor',
        content: contentStr,
        isChartMsg,
        options: optionsList
    };
};
