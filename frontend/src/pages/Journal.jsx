import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Trash2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Journal = () => {
    const [entries, setEntries] = useState([]);
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/journal');
            setEntries(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/journal', {
                content,
                tags: tags.split(',').map(t => t.trim()).filter(t => t)
            });
            setContent('');
            setTags('');
            fetchEntries();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this entry?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/journal/${id}`);
            fetchEntries();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-8 h-8 text-purple-500" />
                    My Journal
                </h1>
                <p className="text-slate-600 mt-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Your entries are encrypted and private
                </p>
            </div>

            {/* Write Entry */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Write New Entry</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none bg-slate-50 min-h-[200px]"
                        placeholder="How are you feeling today? Write your thoughts here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <input
                        type="text"
                        className="w-full mt-4 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="Tags (comma separated, e.g., grateful, anxious, happy)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            disabled={loading || !content.trim()}
                            className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                                loading || !content.trim()
                                    ? 'bg-slate-300 cursor-not-allowed'
                                    : 'bg-purple-500 hover:bg-purple-600 shadow-md'
                            }`}
                        >
                            {loading ? 'Saving...' : 'Save Entry'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Entries List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800">Previous Entries</h2>
                {entries.length === 0 ? (
                    <div className="bg-slate-50 p-8 rounded-xl text-center text-slate-500">
                        No entries yet. Start writing to track your thoughts!
                    </div>
                ) : (
                    entries.map((entry) => (
                        <motion.div
                            key={entry._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <p className="text-sm text-slate-500">
                                        {new Date(entry.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    {entry.tags && entry.tags.length > 0 && (
                                        <div className="flex gap-2 mt-2">
                                            {entry.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleDelete(entry._id)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-slate-700 whitespace-pre-wrap">{entry.content}</p>
                            {entry.sentimentScore !== undefined && (
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <p className="text-xs text-slate-500">
                                        Sentiment: {entry.sentimentScore > 0 ? '😊 Positive' : entry.sentimentScore < 0 ? '😔 Negative' : '😐 Neutral'}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Journal;
