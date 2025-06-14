'use client';

import { Spotlight } from '@/components/ui/spotlight-new';
import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Loader2, BookOpen, Users, Target, ArrowRight, CheckCircle, Star, MessageCircle, Headphones, Settings, Play } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const features = [
    {
        icon: Brain,
        title: "Smart Learning, Your Way",
        description: "No more one-size-fits-all. Your AI buddy adapts to how YOU learn best - whether you're a night owl or an early bird"
    },
    {
        icon: Sparkles,
        title: "Talk Like Friends",
        description: "Forget boring lectures! Have actual conversations that make learning feel like hanging out with a friend who really gets it"
    },
    {
        icon: Zap,
        title: "Instant Help, No Waiting",
        description: "Stuck on a problem? Get help right away - no more waiting for office hours or feeling lost in class"
    }
];

const howToUseSteps = [
    {
        icon: BookOpen,
        title: "Choose Your Subject",
        description: "Select from a wide range of subjects or create your own custom learning path"
    },
    {
        icon: Users,
        title: "Pick Your Companion",
        description: "Choose from our library of AI companions or create a personalized one that matches your learning style"
    },
    {
        icon: MessageCircle,
        title: "Start Learning",
        description: "Begin natural conversations with your AI companion and learn through interactive discussions"
    },
    {
        icon: Target,
        title: "Track Progress",
        description: "Monitor your learning journey with detailed progress tracking and personalized insights"
    }
];

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Medical Student",
        content: "EduNova helped me understand complex anatomy concepts through natural conversations. It's like having a study partner who never gets tired!",
        rating: 5
    },
    {
        name: "Marcus Rodriguez",
        role: "High School Student",
        content: "Math used to be my worst subject. Now I actually enjoy it thanks to my AI companion who explains everything in a way that makes sense.",
        rating: 5
    },
    {
        name: "Dr. Emily Watson",
        role: "University Professor",
        content: "I recommend EduNova to all my students. It's incredible how it adapts to different learning styles and keeps students engaged.",
        rating: 5
    }
];

const Hero = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = () => {
        setIsLoading(true)  
    }

    return (
        <div className="w-full">
            <Spotlight />
            {/* Hero Section */}
            <section className="w-full  relative min-h-screen flex flex-col overflow-hidden">

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto flex-1 flex flex-col">
                    {/* Main Heading Section */}
                    <div className="text-center mb-16 pt-20 px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block mb-6"
                        >
                            <span className="bg-indigo-100/80 dark:bg-indigo-900/20 backdrop-blur-sm text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-medium border border-indigo-200/50 dark:border-indigo-800/30">
                                ✨ Learn with EduNova
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight"
                        >
                            Learn Smarter,{" "}
                            <span className="relative inline-block">
                                Not Harder
                                <motion.span
                                    className="absolute mt-2 -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 to-purple-400 dark:from-indigo-500 dark:to-purple-500 rounded-lg -rotate-1"
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
                            className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
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
                                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 dark:hover:bg-gray-900/90"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-600/20 dark:to-purple-600/20 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 dark:from-indigo-400/30 dark:to-purple-400/30 rounded-xl"></div>
                                    <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 relative z-10" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

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
                                    className={`group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-medium inline-flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl `}
                                    onClick={handleClick}
                                >
                                    {isLoading && <Loader2 className='w-5 h-5 animate-spin' />}
                                    <p>{isLoading ? "Starting..." : "Get Started"}</p>
                                </motion.button>
                            </Link>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.8 }}
                                className="mt-6 text-slate-500 dark:text-gray-400 text-sm"
                            >
                                Join today and learn with EduNova 🚀
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="py-16 bg-slate-50 dark:bg-black">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            How to Start
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Getting started with EduNova is simple and intuitive. Follow these steps to begin your personalized learning journey.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howToUseSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <step.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold shadow-md">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 dark:text-gray-400">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Powerful Features for Better Learning
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Discover the tools and features that make EduNova the ultimate learning companion.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 dark:bg-gray-900/50 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4">
                                <Headphones className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                Voice Conversations
                            </h3>
                            <p className="text-slate-600 dark:text-gray-400">
                                Natural voice interactions that make learning feel like talking with a friend.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 dark:bg-gray-900/50 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                                <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                Personalized Learning
                            </h3>
                            <p className="text-slate-600 dark:text-gray-400">
                                AI that adapts to your learning style and pace for optimal results.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 dark:bg-gray-900/50 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
                                <Play className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                Interactive Learning
                            </h3>
                            <p className="text-slate-600 dark:text-gray-400">
                                Engage in dynamic conversations and interactive exercises.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="col-span-2">
                            <h3 className="text-2xl font-bold mb-4">EduNova</h3>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Transform your learning experience with AI-powered companions that adapt to your style and help you achieve your educational goals.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Companions</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2025 EduNova. All rights reserved
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Hero;