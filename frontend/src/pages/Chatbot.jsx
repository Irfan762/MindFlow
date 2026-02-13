import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I\'m here to support you. How are you feeling today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/ai/chat', {
                message: userMessage
            });
            setMessages(prev => [...prev, { role: 'assistant', content: res.data.response }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'I apologize, I\'m having trouble responding right now. Please try again.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-200px)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                    <Bot className="w-8 h-8 text-blue-500" />
                    AI Wellness Companion
                </h1>
                <p className="text-slate-600 mt-2">A supportive space to talk about your feelings</p>
            </div>

            {/* Messages Container */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 overflow-y-auto mb-4">
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {message.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                            )}
                            <div
                                className={`max-w-[70%] p-4 rounded-2xl ${
                                    message.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-slate-100 text-slate-800'
                                }`}
                            >
                                <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                            {message.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-slate-100 p-4 rounded-2xl">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className={`px-6 py-4 rounded-xl font-semibold text-white transition-all ${
                        loading || !input.trim()
                            ? 'bg-slate-300 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 shadow-md'
                    }`}
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
