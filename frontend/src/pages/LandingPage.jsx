import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Smile, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-20 lg:pt-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
                        >
                            Find Your <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Inner Peace</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed"
                        >
                            Your personal AI-powered companion for mental wellness. Track moods, journal freely, and find coping strategies tailored just for you.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link to="/register" className="px-8 py-4 bg-teal-500 text-white rounded-full font-bold text-lg shadow-lg hover:bg-teal-600 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                                Start Your Journey <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/anonymous" className="px-8 py-4 bg-white text-teal-600 border-2 border-teal-500 rounded-full font-bold text-lg shadow-sm hover:bg-teal-50 transition-all">
                                Try Anonymously 🔒
                            </Link>
                        </motion.div>
                        <p className="text-slate-500 mt-4 text-sm">No credit card • Privacy-first • Anonymous mode available</p>
                    </div>
                </div>
                
                {/* Abstract Background Element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to thrive</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Comprehensive tools designed to support your mental health journey every step of the way.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Smile className="w-8 h-8 text-teal-500" />, title: "Mood Tracking", desc: "Log your daily emotions and visualize patterns over time." },
                            { icon: <MessageCircle className="w-8 h-8 text-indigo-500" />, title: "AI Therapy Chat", desc: "24/7 supportive conversations with our empathetic AI companion." },
                            { icon: <Shield className="w-8 h-8 text-rose-500" />, title: "Secure Journaling", desc: "Write freely with end-to-end encrypted private entries." },
                            { icon: <Activity className="w-8 h-8 text-amber-500" />, title: "Coping Strategies", desc: "Access a library of breathing exercises and mindfulness tools." }
                        ].map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-slate-100"
                            >
                                <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
