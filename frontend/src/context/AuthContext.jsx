import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case 'REGISTER_FAIL':
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        } else {
             // If no token, stop loading
             dispatch({ type: 'AUTH_ERROR' });
             return;
        }

        try {
            const res = await axios.get('http://localhost:5000/api/auth/me');
            dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    // Register User
    const register = async formData => {
        console.log('🔵 Registration attempt with data:', formData);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            console.log('🔵 Sending POST to http://localhost:5000/api/auth/register');
            const res = await axios.post('http://localhost:5000/api/auth/register', formData, config);
            console.log('✅ Registration successful:', res.data);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
            // Don't call loadUser here - let the app handle navigation first
        } catch (err) {
            console.error('❌ Registration error:', err);
            console.error('❌ Error response:', err.response);
            console.error('❌ Error message:', err.message);
            dispatch({
                type: 'REGISTER_FAIL',
                payload: err.response?.data?.message || err.message || 'Registration failed'
            });
        }
    };

    // Login User
    const login = async formData => {
        console.log('🔵 Login attempt with:', { email: formData.email });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            console.log('🔵 Sending POST to http://localhost:5000/api/auth/login');
            const res = await axios.post('http://localhost:5000/api/auth/login', formData, config);
            console.log('✅ Login successful:', res.data);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            // Don't call loadUser here - let the app handle navigation first
        } catch (err) {
            console.error('❌ Login error:', err);
            console.error('❌ Error response:', err.response);
            console.error('❌ Error message:', err.message);
            dispatch({
                type: 'LOGIN_FAIL',
                payload: err.response?.data?.message || err.message || 'Login failed'
            });
        }
    };

    // Logout
    const logout = () => dispatch({ type: 'LOGOUT' });

    // Clear Errors
    const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                login,
                logout,
                clearErrors
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
