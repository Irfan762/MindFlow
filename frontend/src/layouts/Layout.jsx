import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Heart, Activity, BookOpen, MessageCircle, Shield } from 'lucide-react';
import PanicSOS from '../components/PanicSOS';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <Heart className="h-8 w-8 text-teal-500 fill-teal-500" />
                            <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                MindFlow
                            </span>
                        </Link>
                        
                        <nav className="hidden md:flex space-x-8">
                            <Link to="/dashboard" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Dashboard</Link>
                            <Link to="/mood" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Mood Tracker</Link>
                            <Link to="/journal" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Journal</Link>
                            <Link to="/coping" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Toolkit</Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-full shadow-md hover:shadow-lg transition-all">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-slate-200 mt-12 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                         <Heart className="h-5 w-5 text-slate-400" />
                         <span className="text-slate-500 text-sm">© 2026 MindFlow. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-slate-400 hover:text-teal-500 transition-colors">Privacy</a>
                        <a href="#" className="text-slate-400 hover:text-teal-500 transition-colors">Terms</a>
                        <a href="#" className="text-slate-400 hover:text-teal-500 transition-colors">Support</a>
                    </div>
                </div>
            </footer>
            
            {/* Global Panic SOS Button */}
            <PanicSOS />
        </div>
    );
};

export default Layout;
