import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './layouts/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import MoodTracker from './pages/MoodTracker';
import Journal from './pages/Journal';
import CopingToolkit from './pages/CopingToolkit';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/mood" element={<PrivateRoute><MoodTracker /></PrivateRoute>} />
            <Route path="/journal" element={<PrivateRoute><Journal /></PrivateRoute>} />
            <Route path="/coping" element={<PrivateRoute><CopingToolkit /></PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
