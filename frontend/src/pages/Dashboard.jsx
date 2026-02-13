import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Heart, BookOpen, MessageCircle, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [moods, setMoods] = useState([]);
    const [stats, setStats] = useState({ totalLogs: 0, avgMood: 0, streak: 0 });

    useEffect(() => {
        fetchMoodData();
    }, []);

    const fetchMoodData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/mood');
            setMoods(res.data.slice(0, 7).reverse());
            
            if (res.data.length > 0) {
                const avg = res.data.reduce((sum, log) => sum + log.moodScore, 0) / res.data.length;
                setStats({
                    totalLogs: res.data.length,
                    avgMood: avg.toFixed(1),
                    streak: calculateStreak(res.data)
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const calculateStreak = (logs) => {
        if (logs.length === 0) return 0;
        let streak = 1;
        const today = new Date().setHours(0, 0, 0, 0);
        const lastLog = new Date(logs[0].date).setHours(0, 0, 0, 0);
        
        if (today - lastLog > 86400000) return 0;
        
        for (let i = 1; i < logs.length; i++) {
            const current = new Date(logs[i - 1].date).setHours(0, 0, 0, 0);
            const previous = new Date(logs[i].date).setHours(0, 0, 0, 0);
            if (current - previous === 86400000) streak++;
            else break;
        }
        return streak;
    };

    const chartData = moods.map(log => ({
        date: new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        score: log.moodScore
    }));

    const quickActions = [
        { title: 'Log Mood', icon: Heart, color: 'bg-pink-500', link: '/mood' },
        { title: 'Write Journal', icon: BookOpen, color: 'bg-purple-500', link: '/journal' },
        { title: 'AI Chat', icon: MessageCircle, color: 'bg-blue-500', link: '/chat' },
        { title: 'Coping Tools', icon: Sparkles, color: 'bg-teal-500', link: '/coping' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Welcome back, {user?.username || 'Friend'}! 👋</h1>
                <p className="text-slate-600 mt-2">Here's your wellness overview</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-teal-100 text-sm">Average Mood</p>
                            <p className="text-4xl font-bold mt-2">{stats.avgMood || 'N/A'}</p>
                        </div>
                        <TrendingUp className="w-12 h-12 text-teal-200" />
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm">Total Logs</p>
                            <p className="text-4xl font-bold mt-2">{stats.totalLogs}</p>
                        </div>
                        <Calendar className="w-12 h-12 text-purple-200" />
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-pink-100 text-sm">Current Streak</p>
                            <p className="text-4xl font-bold mt-2">{stats.streak} days</p>
                        </div>
                        <Heart className="w-12 h-12 text-pink-200" />
                    </div>
                </motion.div>
            </div>

            {/* Mood Chart */}
            {chartData.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Mood Trends (Last 7 Days)</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Line type="monotone" dataKey="score" stroke="#14B8A6" strokeWidth={3} dot={{ fill: '#14B8A6', strokeWidth: 2, r: 4, stroke: '#fff' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <Link key={index} to={action.link}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                                    <action.icon className="w-6 h-6 text-white" />
                                </div>
                                <p className="font-semibold text-slate-800">{action.title}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Daily Quote */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg">
                <p className="text-lg italic mb-2">"The greatest glory in living lies not in never falling, but in rising every time we fall."</p>
                <p className="text-indigo-200">— Nelson Mandela</p>
            </div>
        </div>
    );
};

export default Dashboard;
