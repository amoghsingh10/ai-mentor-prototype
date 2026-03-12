import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Bot, ShieldAlert } from 'lucide-react';
import { Message, UserContext } from '../types';
import { CompoundingChart } from './CompoundingChart';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface Props {
    context: UserContext;
    messages: Message[];
    onSendMessage: (text: string) => void;
}

export const ChatInterface: React.FC<Props> = ({ context, messages, onSendMessage }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    const handleOptionClick = (option: string) => {
        onSendMessage(option);
    };

    return (
        <div className="flex flex-col h-full w-full max-w-5xl mx-auto relative px-0 sm:px-4 py-0 sm:py-6">

            {/* Main Chat Container that looks like a sleek app window */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col h-full w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sm:border border-slate-200 dark:border-white/10 sm:rounded-3xl shadow-2xl overflow-hidden relative z-20"
            >

                {/* Header */}
                <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="bg-mentor-100 dark:bg-mentor-600/20 p-2.5 rounded-xl text-mentor-600 dark:text-mentor-400 shadow-sm border border-mentor-200 dark:border-transparent">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-outfit font-semibold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                                Financial Mentor <Sparkles className="w-4 h-4 text-fuchsia-500 dark:text-fuchsia-400" />
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> Online
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:flex text-xs text-slate-500 dark:text-slate-400 items-center gap-2 bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/5 shadow-inner">
                        <ShieldAlert className="w-4 h-4 text-mentor-500 dark:text-mentor-300" />
                        <span className="font-medium">Educational purposes only. Not a legal advisor.</span>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth bg-transparent">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                <div
                                    className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 text-[15px] sm:text-base ${msg.role === 'user'
                                        ? 'bg-gradient-to-br from-mentor-500 to-mentor-600 text-white rounded-br-sm shadow-md'
                                        : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-white/10 rounded-bl-sm shadow-sm leading-relaxed'
                                        }`}
                                >
                                    {msg.role === 'mentor' ? (
                                        <div className="prose prose-sm sm:prose-base max-w-none">
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.content
                                    )}
                                </div>

                                {/* Chart Rendered Outside Text Bubble To Prevent Flex Overlap */}
                                {msg.isChartMsg && msg.role === 'mentor' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="w-full mt-4 max-w-4xl mx-auto"
                                    >
                                        <CompoundingChart monthlySurplus={context.monthlySurplus} />
                                    </motion.div>
                                )}

                                {/* Quick Replies Options */}
                                {msg.options && msg.role === 'mentor' && msg === messages[messages.length - 1] && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                                        className="flex flex-wrap gap-2 mt-3 ml-2"
                                    >
                                        {msg.options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionClick(option)}
                                                className="text-xs sm:text-sm font-medium px-4 py-2 bg-white hover:bg-mentor-50 dark:bg-slate-800 dark:hover:bg-mentor-900/40 border border-slate-200 hover:border-mentor-300 dark:border-slate-700 dark:hover:border-mentor-500 text-slate-600 hover:text-mentor-700 dark:text-slate-300 dark:hover:text-white rounded-full transition-all shadow-sm hover:shadow active:scale-95"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} className="h-2" />
                </div>

                {/* Input Area */}
                <div className="p-4 sm:p-6 bg-white/60 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 shrink-0">
                    <form onSubmit={handleSubmit} className="flex gap-3 max-w-4xl mx-auto relative group">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about mutual funds, taxes, or how to start..."
                            className="flex-1 bg-white dark:bg-white/5 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mentor-500 focus:border-transparent transition-all font-sans shadow-sm group-hover:shadow-md"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="bg-mentor-600 hover:bg-mentor-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 rounded-2xl transition-all flex items-center justify-center transform active:scale-95 disabled:active:scale-100 disabled:shadow-none shadow-[0_4px_14px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)]"
                        >
                            <Send className="w-5 h-5 sm:mr-2" />
                            <span className="hidden sm:inline font-medium">Send</span>
                        </button>
                    </form>
                    <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-3 hidden sm:block">
                        AI Mentor replies can sometimes be inaccurate. Please seek a certified fiduciary for legal financial advice.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
