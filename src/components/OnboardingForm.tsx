import React, { useState } from 'react';
import { Target, DollarSign, ArrowRight, Sparkles } from 'lucide-react';
import { UserContext } from '../types';
import { motion } from 'framer-motion';

interface Props {
    onComplete: (context: Partial<UserContext>) => void;
}

export const OnboardingForm: React.FC<Props> = ({ onComplete }) => {
    const [surplus, setSurplus] = useState<string>('500');
    const [goal, setGoal] = useState<string>('Buy a house');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete({
            monthlySurplus: parseInt(surplus) || 0,
            goal,
            isOnboarded: true
        });
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 flex items-center justify-center relative">
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full glass-panel p-8 sm:p-10 rounded-3xl relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="mx-auto bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl transform rotate-3"
                    >
                        <Sparkles className="w-8 h-8 text-mentor-500 dark:text-mentor-400" />
                    </motion.div>
                    <h1 className="text-3xl font-bold font-outfit mb-3 text-slate-800 dark:text-white transition-colors duration-300">
                        Let's Talk <span className="mentor-gradient-text">Money</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm transition-colors duration-300">
                        I'm your AI Mentor. No complex jargon, just clear analogies to help you grow your wealth safely.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                    >
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors">What is your primary financial goal?</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Target className="h-5 w-5 text-slate-400 group-focus-within:text-mentor-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mentor-500 focus:border-transparent transition-all shadow-sm group-hover:shadow-md"
                                placeholder="e.g. Buying a car, Retirement"
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                    >
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors">How much can you save monthly?</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <DollarSign className="h-5 w-5 text-slate-400 group-focus-within:text-mentor-500 transition-colors" />
                            </div>
                            <input
                                type="number"
                                value={surplus}
                                onChange={(e) => setSurplus(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mentor-500 focus:border-transparent transition-all shadow-sm group-hover:shadow-md"
                                placeholder="500"
                                min="10"
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.02, translateY: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full mt-4 flex items-center justify-center gap-2 py-4 px-4 bg-mentor-600 hover:bg-mentor-500 text-white rounded-xl font-medium transition-all shadow-[0_8px_20px_rgba(124,58,237,0.25)] hover:shadow-[0_12px_25px_rgba(124,58,237,0.35)]"
                    >
                        Start My Journey
                        <ArrowRight className="h-5 w-5" />
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};
