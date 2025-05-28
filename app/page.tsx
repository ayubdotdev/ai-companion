'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, ArrowRight, GraduationCap, BookOpen, Lightbulb } from 'lucide-react';
import Link from 'next/link';

const features = [
    {
        icon: Brain,
        title: "Smart Learning, Your Way",
        description: "No more one-size-fits-all. Your AI buddy adapts to how YOU learn best - whether you're a night owl or an early bird 🦉"
    },
    {
        icon: Sparkles,
        title: "Talk Like Friends",
        description: "Forget boring lectures! Have actual conversations that make learning feel like hanging out with a friend who really gets it ✨"
    },
    {
        icon: Zap,
        title: "Instant Help, No Waiting",
        description: "Stuck on a problem? Get help right away - no more waiting for office hours or feeling lost in class 🚀"
    }
];

const Hero = () => {
    return (
        <section className="w-full bg-white min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto flex-1 flex flex-col">
                {/* Main Heading Section */}
                <div className="text-center mb-16 pt-20 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-6"
                    >
                        <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium">
                            ✨ Learn with EduNova
                        </span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl md:text-6xl font-bold mb-6 text-black leading-tight"
                    >
                        Learn Smarter,{" "}
                        <span className="relative  inline-block">
                            Not Harder
                            <motion.span
                                className="absolute -bottom-2 left-0 w-full h-3 bg-blue-300 rounded-lg -rotate-1"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            />
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-black/80 max-w-2xl mx-auto leading-relaxed"
                    >
                        Tired of boring lectures? Meet your new study buddy - an AI companion that makes learning feel like talking with a friend who actually gets it! 🎓
                    </motion.p>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20 px-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-black">
                                {feature.title}
                            </h3>
                            <p className="text-black/70 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="mt-auto pb-20 px-4"
                >
                    <div className="text-center">
                        <Link href="/home-content">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group bg-black text-white px-8 py-3 rounded-xl text-lg font-medium inline-flex items-center gap-2 hover:bg-black/90 transition-colors"
                            >
                                Start Learning
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.8 }}
                            className="mt-6 text-black/60 text-sm"
                        >
                            Join today and learn with EduNova 🚀
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero; 