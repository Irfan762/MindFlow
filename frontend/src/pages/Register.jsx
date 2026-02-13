import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const { register, isAuthenticated, error, clearErrors } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = formData;

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register({ username, email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-2 text-slate-900">Create Account</h1>
                <p className="text-center text-slate-500 mb-8">Start your wellness journey today</p>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                        <input 
                            type="text" 
                            name="username"
                            required 
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                            placeholder="MindfulUser"
                            value={username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            required 
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                            placeholder="you@example.com"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            required 
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors shadow-md">
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-6 text-slate-600">
                    Already have an account? <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
