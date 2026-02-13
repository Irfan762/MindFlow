import React, { useState } from 'react';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickTherapy = () => {
    const [selectedSession, setSelectedSession] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);

    const sessions = [
        {
            id: 'breathing',
            title: '4-7-8 Breathing',
            duration: 3,
            color: 'from-blue-400 to-cyan-500',
            icon: '🌬️',
            description: 'Calm your nervous system with controlled breathing',
            steps: [
                { instruction: 'Find a comfortable position and close your eyes', duration: 10 },
                { instruction: 'Breathe in through your nose for 4 seconds', duration: 4 },
                { instruction: 'Hold your breath for 7 seconds', duration: 7 },
                { instruction: 'Exhale slowly through your mouth for 8 seconds', duration: 8 },
                { instruction: 'Repeat this cycle 3 more times', duration: 57 }
            ]
        },
        {
            id: 'gratitude',
            title: 'Gratitude Practice',
            duration: 2,
            color: 'from-pink-400 to-rose-500',
            icon: '💖',
            description: 'Shift your mindset with appreciation',
            steps: [
                { instruction: 'Think of 3 things you\'re grateful for today', duration: 30 },
                { instruction: 'Visualize each one and feel the gratitude', duration: 45 },
                { instruction: 'Say "thank you" out loud for each blessing', duration: 15 },
                { instruction: 'Notice how you feel now', duration: 10 }
            ]
        },
        {
            id: 'bodyscan',
            title: 'Body Scan Meditation',
            duration: 5,
            color: 'from-purple-400 to-indigo-500',
            icon: '🧘',
            description: 'Release tension through mindful awareness',
            steps: [
                { instruction: 'Lie down or sit comfortably', duration: 15 },
                { instruction: 'Focus on your feet - notice any sensations', duration: 30 },
                { instruction: 'Move attention to your legs, releasing tension', duration: 30 },
                { instruction: 'Scan your torso, chest, and back', duration: 45 },
                { instruction: 'Notice your arms, hands, and fingers', duration: 30 },
                { instruction: 'Focus on your neck, face, and head', duration: 30 },
                { instruction: 'Take 3 deep breaths and slowly open your eyes', duration: 20 }
            ]
        },
        {
            id: 'reframing',
            title: 'Cognitive Reframing',
            duration: 4,
            color: 'from-teal-400 to-green-500',
            icon: '🧠',
            description: 'Transform negative thoughts into balanced perspectives',
            steps: [
                { instruction: 'Identify a negative thought you\'re having', duration: 30 },
                { instruction: 'Ask: Is this thought 100% true?', duration: 30 },
                { instruction: 'What evidence contradicts this thought?', duration: 45 },
                { instruction: 'Create a more balanced, realistic thought', duration: 60 },
                { instruction: 'Repeat the new thought 3 times', duration: 15 }
            ]
        }
    ];

    const startSession = (session) => {
        setSelectedSession(session);
        setCurrentStep(0);
        setIsComplete(false);
        setTimeRemaining(session.steps[0].duration);
        runSession(session);
    };

    const runSession = (session) => {
        let stepIndex = 0;
        let timeLeft = session.steps[0].duration;

        const timer = setInterval(() => {
            timeLeft--;
            setTimeRemaining(timeLeft);

            if (timeLeft <= 0) {
                stepIndex++;
                if (stepIndex >= session.steps.length) {
                    clearInterval(timer);
                    setIsComplete(true);
                } else {
                    setCurrentStep(stepIndex);
                    timeLeft = session.steps[stepIndex].duration;
                    setTimeRemaining(timeLeft);
                }
            }
        }, 1000);
    };

    const resetSession = () => {
        setSelectedSession(null);
        setCurrentStep(0);
        setIsComplete(false);
        setTimeRemaining(0);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                    <Clock className="w-8 h-8 text-teal-500" />
                    5-Minute Therapy Sessions
                </h1>
                <p className="text-slate-600 mt-2">Quick, evidence-based wellness interventions</p>
            </div>

            {!selectedSession ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sessions.map((session) => (
                        <motion.div
                            key={session.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer"
                            onClick={() => startSession(session)}
                        >
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${session.color} flex items-center justify-center text-3xl mb-4`}>
                                {session.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{session.title}</h3>
                            <p className="text-slate-600 mb-4">{session.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500 flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {session.duration} minutes
                                </span>
                                <ArrowRight className="w-5 h-5 text-teal-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    {!isComplete ? (
                        <>
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-slate-800">{selectedSession.title}</h2>
                                    <div className="text-3xl font-bold text-teal-600">{timeRemaining}s</div>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <motion.div
                                        className={`h-2 rounded-full bg-gradient-to-r ${selectedSession.color}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentStep + 1) / selectedSession.steps.length) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </div>

                            <div className="text-center py-12">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${selectedSession.color} flex items-center justify-center text-5xl mb-8`}
                                >
                                    {selectedSession.icon}
                                </motion.div>
                                <motion.p
                                    key={`step-${currentStep}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-2xl font-medium text-slate-700"
                                >
                                    {selectedSession.steps[currentStep].instruction}
                                </motion.p>
                            </div>

                            <div className="text-center text-sm text-slate-500">
                                Step {currentStep + 1} of {selectedSession.steps.length}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center mb-6"
                            >
                                <CheckCircle className="w-16 h-16 text-white" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-4">Session Complete! 🎉</h2>
                            <p className="text-lg text-slate-600 mb-8">Great job completing the {selectedSession.title} session</p>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => startSession(selectedSession)}
                                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                                >
                                    Do Again
                                </button>
                                <button
                                    onClick={resetSession}
                                    className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
                                >
                                    Choose Another
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuickTherapy;
