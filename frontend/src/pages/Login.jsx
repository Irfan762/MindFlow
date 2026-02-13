import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuthenticated, error, clearErrors } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        if (error) {
           const timer = setTimeout(() => {
             clearErrors();
           }, 3000);
           return () => clearTimeout(timer);
        }
    }, [isAuthenticated, navigate, error, clearErrors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-2 text-slate-900">Welcome Back</h1>
                <p className="text-center text-slate-500 mb-8">Sign in to continue your journey</p>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            required 
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            required 
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors shadow-md">
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-6 text-slate-600">
                    Don't have an account? <Link to="/register" className="text-teal-600 hover:text-teal-700 font-medium">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
