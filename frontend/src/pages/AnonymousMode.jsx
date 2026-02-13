import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Wind, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const AnonymousMode = () => {
    const [currentMood, setCurrentMood] = useState(null);
    const [moodNote, setMoodNote] = useState('');
    const [strategies, setStrategies] = useState([]);
    const [sessionStats, setSessionStats] = useState({ moodsLogged: 0, strategiesViewed: 0 });

    const moods = [
        { emoji: '😢', label: 'Very Sad', score: 1, color: 'from-blue-400 to-blue-600' },
        { emoji: '😕', label: 'Sad', score: 2, color: 'from-indigo-400 to-indigo-600' },
        { emoji: '😐', label: 'Okay', score: 3, color: 'from-slate-400 to-slate-600' },
        { emoji: '🙂', label: 'Good', score: 4, color: 'from-green-400 to-green-600' },
        { emoji: '😊', label: 'Great', score: 5, color: 'from-teal-400 to-teal-600' }
    ];

    useEffect(() => {
        // Load session stats from sessionStorage
        const stats = JSON.parse(sessionStorage.getItem('anonymousStats') || '{"moodsLogged":0,"strategiesViewed":0}');
        setSessionStats(stats);
        
        // Fetch coping strategies
        fetchStrategies();
    }, []);

    const fetchStrategies = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/coping');
            setStrategies(res.data.slice(0, 6)); // Show first 6
        } catch (err) {
            console.error(err);
        }
    };

    const logMood = () => {
        if (!currentMood) return;
        
        const newStats = {
            ...sessionStats,
            moodsLogged: sessionStats.moodsLogged + 1
        };
        setSessionStats(newStats);
        sessionStorage.setItem('anonymousStats', JSON.stringify(newStats));
        
        setCurrentMood(null);
        setMoodNote('');
        
        // Show success message
        alert('Mood logged! Your data is private and will be cleared when you close the browser.');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Privacy Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3">
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-2 text-sm">
                    <Lock className="w-4 h-4" />
                    <span>Anonymous Mode: Your data is private and will be cleared when you close your browser</span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-slate-800 mb-4"
                    >
                        Welcome to Anonymous Healing
                    </motion.h1>
                    <p className="text-lg text-slate-600 mb-6">
                        Access mental wellness tools without creating an account
                    </p>
                    <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{sessionStats.moodsLogged}</p>
                            <p className="text-xs text-slate-600">Moods Logged</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{sessionStats.strategiesViewed}</p>
                            <p className="text-xs text-slate-600">Strategies Viewed</p>
                        </div>
                    </div>
                </div>

                {/* Quick Mood Logger */}
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Heart className="w-6 h-6 text-pink-500" />
                        How are you feeling?
                    </h2>
                    <div className="grid grid-cols-5 gap-4 mb-6">
                        {moods.map((mood) => (
                            <button
                                key={mood.score}
                                onClick={() => setCurrentMood(mood)}
                                className={`p-6 rounded-xl border-2 transition-all ${
                                    currentMood?.score === mood.score
                                        ? `border-transparent bg-gradient-to-br ${mood.color} text-white shadow-lg scale-105`
                                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                                }`}
                            >
                                <div className="text-4xl mb-2">{mood.emoji}</div>
                                <p className={`text-sm font-medium ${currentMood?.score === mood.score ? 'text-white' : 'text-slate-700'}`}>
                                    {mood.label}
                                </p>
                            </button>
                        ))}
                    </div>
                    {currentMood && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            <textarea
                                className="w-full p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none mb-4"
                                placeholder="Optional: Add a note about how you're feeling..."
                                value={moodNote}
                                onChange={(e) => setMoodNote(e.target.value)}
                                rows={3}
                            ></textarea>
                            <button
                                onClick={logMood}
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                            >
                                Log Mood Anonymously
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Quick Breathing Exercise */}
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-8 rounded-2xl shadow-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Wind className="w-6 h-6" />
                        Quick Breathing Exercise
                    </h2>
                    <p className="mb-4">Try the 4-7-8 breathing technique to calm your mind:</p>
                    <ol className="space-y-2 ml-4 list-decimal mb-6">
                        <li>Breathe in through your nose for 4 seconds</li>
                        <li>Hold your breath for 7 seconds</li>
                        <li>Exhale slowly through your mouth for 8 seconds</li>
                        <li>Repeat 3-4 times</li>
                    </ol>
                    <p className="text-sm text-blue-100">💡 Tip: Use the SOS button (bottom-right) for a guided breathing session</p>
                </div>

                {/* Coping Strategies */}
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-teal-500" />
                        Coping Strategies
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {strategies.map((strategy) => (
                            <div
                                key={strategy._id}
                                onClick={() => {
                                    const newStats = { ...sessionStats, strategiesViewed: sessionStats.strategiesViewed + 1 };
                                    setSessionStats(newStats);
                                    sessionStorage.setItem('anonymousStats', JSON.stringify(newStats));
                                }}
                                className="p-4 border border-slate-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all cursor-pointer"
                            >
                                <h3 className="font-bold text-slate-800 mb-2">{strategy.title}</h3>
                                <p className="text-sm text-slate-600">{strategy.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upgrade Prompt */}
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300 p-8 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Want to Save Your Progress?</h2>
                    <p className="text-slate-600 mb-6">
                        Create a free account to track your mood over time, access AI chatbot, encrypted journaling, and personalized recommendations.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            to="/register"
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2"
                        >
                            Create Free Account
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/login"
                            className="px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold border-2 border-slate-300 hover:border-slate-400 transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnonymousMode;
