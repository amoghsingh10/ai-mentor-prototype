import { useEffect, useState } from 'react';
import { OnboardingForm } from './components/OnboardingForm';
import { ChatInterface } from './components/ChatInterface';
import { Message, UserContext } from './types';
import { getMentorResponse } from './utils/aiLogic';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const initialContext: UserContext = {
  monthlySurplus: 0,
  goal: '',
  riskTolerance: '',
  isOnboarded: false,
};

function App() {
  const [context, setContext] = useState<UserContext>(initialContext);
  const [messages, setMessages] = useState<Message[]>([]);

  // Theme state
  const [isDark, setIsDark] = useState<boolean>(true);

  // Apply theme to body
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Trigger initial greeting once onboarded
  useEffect(() => {
    if (context.isOnboarded && messages.length === 0) {
      const greetingMsg = getMentorResponse("hello initialization string", context);
      setMessages([greetingMsg]);
    }
  }, [context.isOnboarded, context, messages.length]);

  const handleOnboardComplete = (newContextData: Partial<UserContext>) => {
    setContext({ ...context, ...newContextData, isOnboarded: true });
  };

  const handleSendMessage = (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text
    };

    setMessages(prev => [...prev, userMsg]);

    // Simulate network delay for AI thinking
    setTimeout(() => {
      const aiResponse = getMentorResponse(text, context);
      setMessages(prev => [...prev, aiResponse]);
    }, 1200);
  };

  return (
    <main className="w-full h-screen overflow-hidden text-slate-900 dark:text-slate-100 font-sans selection:bg-mentor-500/30 transition-colors duration-500 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-100 to-white dark:from-slate-900 dark:via-slate-950 dark:to-black relative">

      {/* Decorative background orbs that shift color based on theme */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-mentor-400 dark:bg-mentor-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-40 dark:opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-300 dark:bg-fuchsia-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-50 dark:opacity-20 animate-pulse-slow object-none" style={{ animationDelay: '2s' }}></div>

      {/* Global Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg text-slate-600 dark:text-slate-300 hover:text-mentor-600 dark:hover:text-mentor-400 hover:scale-110 transition-all duration-300"
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 fill-current" />}
        </motion.div>
      </button>

      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
        {!context.isOnboarded ? (
          <OnboardingForm onComplete={handleOnboardComplete} />
        ) : (
          <ChatInterface
            context={context}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>
    </main>
  );
}

export default App;
