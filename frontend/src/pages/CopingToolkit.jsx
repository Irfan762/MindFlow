import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Wind, Heart, Brain, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

const CopingToolkit = () => {
    const [strategies, setStrategies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    const categories = [
        { value: 'all', label: 'All', icon: Sparkles },
        { value: 'breathing', label: 'Breathing', icon: Wind },
        { value: 'mindfulness', label: 'Mindfulness', icon: Brain },
        { value: 'physical', label: 'Physical', icon: Heart },
        { value: 'cognitive', label: 'Cognitive', icon: Smile }
    ];

    useEffect(() => {
        fetchStrategies();
    }, []);

    const fetchStrategies = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/coping');
            setStrategies(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            // If no strategies, seed them
            if (err.response?.status === 404 || strategies.length === 0) {
                await seedStrategies();
            }
            setLoading(false);
        }
    };

    const seedStrategies = async () => {
        try {
            await axios.post('http://localhost:5000/api/coping/seed');
            fetchStrategies();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredStrategies = selectedCategory === 'all'
        ? strategies
        : strategies.filter(s => s.category === selectedCategory);

    const getCategoryColor = (category) => {
        const colors = {
            breathing: 'bg-blue-500',
            mindfulness: 'bg-purple-500',
            physical: 'bg-pink-500',
            cognitive: 'bg-teal-500'
        };
        return colors[category] || 'bg-slate-500';
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-8 h-8 text-teal-500" />
                    Coping Toolkit
                </h1>
                <p className="text-slate-600 mt-2">Evidence-based strategies to support your mental wellness</p>
            </div>

            {/* Category Filter */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                            selectedCategory === cat.value
                                ? 'bg-teal-500 text-white shadow-md'
                                : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300'
                        }`}
                    >
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Strategies Grid */}
            {loading ? (
                <div className="text-center py-12 text-slate-500">Loading strategies...</div>
            ) : filteredStrategies.length === 0 ? (
                <div className="bg-slate-50 p-8 rounded-xl text-center">
                    <p className="text-slate-600 mb-4">No strategies found in this category.</p>
                    <button
                        onClick={seedStrategies}
                        className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
                    >
                        Load Default Strategies
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStrategies.map((strategy, index) => (
                        <motion.div
                            key={strategy._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-bold text-slate-800">{strategy.title}</h3>
                                <span className={`${getCategoryColor(strategy.category)} w-3 h-3 rounded-full`}></span>
                            </div>
                            <p className="text-slate-600 text-sm mb-4">{strategy.description}</p>
                            {strategy.content && (
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{strategy.content}</p>
                                </div>
                            )}
                            {strategy.duration && (
                                <div className="mt-3 text-xs text-slate-500">
                                    ⏱️ Duration: {strategy.duration} minutes
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Quick Breathing Exercise */}
            <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Quick Breathing Exercise</h2>
                <p className="mb-4">Try the 4-7-8 breathing technique:</p>
                <ol className="space-y-2 ml-4 list-decimal">
                    <li>Breathe in through your nose for 4 seconds</li>
                    <li>Hold your breath for 7 seconds</li>
                    <li>Exhale slowly through your mouth for 8 seconds</li>
                    <li>Repeat 3-4 times</li>
                </ol>
            </div>
        </div>
    );
};

export default CopingToolkit;
