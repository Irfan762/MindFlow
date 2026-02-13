import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Smile, Frown, Meh, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MoodTracker = () => {
    const [moods, setMoods] = useState([]);
    const [selectedScore, setSelectedScore] = useState(null);
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(true);

    const moodOptions = [
        { score: 1, icon: <Frown className="w-8 h-8"/>, label: "Awful", color: "text-red-500", bg: "bg-red-100" },
        { score: 2, icon: <Meh className="w-8 h-8"/>, label: "Bad", color: "text-orange-500", bg: "bg-orange-100" },
        { score: 3, icon: <Meh className="w-8 h-8"/>, label: "Okay", color: "text-yellow-500", bg: "bg-yellow-100" },
        { score: 4, icon: <Smile className="w-8 h-8"/>, label: "Good", color: "text-green-500", bg: "bg-green-100" },
        { score: 5, icon: <Heart className="w-8 h-8"/>, label: "Great", color: "text-teal-500", bg: "bg-teal-100" },
    ];

    const fetchMoods = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/mood');
            setMoods(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => { fetchMoods(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedScore) return;

        try {
            const option = moodOptions.find(m => m.score === selectedScore);
            await axios.post('http://localhost:5000/api/mood', {
                moodScore: selectedScore,
                moodEmoji: option.label,
                note
            });
            fetchMoods();
            setSelectedScore(null);
            setNote('');
        } catch (err) {
            console.error(err);
        }
    };

    // Prepare chart data (reverse chronological order for display, chronological for chart)
    const chartData = [...moods].reverse().map(log => ({
        date: new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        score: log.moodScore
    }));

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">How are you feeling today?</h1>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-8 gap-2 overflow-x-auto pb-4 sm:pb-0">
                        {moodOptions.map((option) => (
                            <motion.button
                                key={option.score}
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedScore(option.score)}
                                className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                                    selectedScore === option.score 
                                    ? `${option.bg} shadow-md ring-2 ring-offset-2 ring-teal-500` 
                                    : 'hover:bg-slate-50'
                                }`}
                            >
                                <div className={`${selectedScore === option.score ? option.color : 'text-slate-400'}`}>
                                    {option.icon}
                                </div>
                                <span className={`mt-2 text-sm font-medium ${selectedScore === option.score ? 'text-slate-900' : 'text-slate-500'}`}>
                                    {option.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    <textarea
                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none bg-slate-50"
                        rows="3"
                        placeholder="Add a note about why you're feeling this way... (optional)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>

                    <div className="mt-4 flex justify-end">
                        <button 
                            type="submit"
                            disabled={!selectedScore}
                            className={`px-6 py-2 rounded-lg font-semibold text-white transition-all ${
                                selectedScore ? 'bg-teal-500 hover:bg-teal-600 shadow-md' : 'bg-slate-300 cursor-not-allowed'
                            }`}
                        >
                            Log Mood
                        </button>
                    </div>
                </form>
            </div>

            {/* Mood Graph */}
            {chartData.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Mood Trends</h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="#14B8A6" 
                                    strokeWidth={3}
                                    dot={{ fill: '#14B8A6', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800">Recent Logs</h2>
                {loading ? <p>Loading...</p> : (
                    moods.map((log) => (
                        <div key={log._id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                            <div className={`p-3 rounded-full bg-slate-50`}>
                                {moodOptions.find(m => m.label === log.moodEmoji)?.icon || <Smile className="text-slate-400"/>}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-slate-900">{log.moodEmoji}</span>
                                    <span className="text-xs text-slate-400">• {new Date(log.date).toLocaleDateString()} {new Date(log.date).toLocaleTimeString()}</span>
                                </div>
                                {log.note && <p className="text-slate-600">{log.note}</p>}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MoodTracker;
