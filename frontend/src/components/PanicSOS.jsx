import React, { useState } from 'react';
import { X, Phone, Heart, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PanicSOS = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('breathing');
    const [breathingPhase, setBreathingPhase] = useState('ready');
    const [breathCount, setBreathCount] = useState(0);

    const crisisHotlines = [
        { name: 'National Suicide Prevention Lifeline', number: '988', description: '24/7 Crisis Support' },
        { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Free 24/7 Support' },
        { name: 'SAMHSA Helpline', number: '1-800-662-4357', description: 'Mental Health & Substance Abuse' }
    ];

    const startBreathing = () => {
        setBreathingPhase('inhale');
        setBreathCount(0);
        
        const sequence = [
            { phase: 'inhale', duration: 4000, next: 'hold' },
            { phase: 'hold', duration: 7000, next: 'exhale' },
            { phase: 'exhale', duration: 8000, next: 'rest' },
            { phase: 'rest', duration: 2000, next: 'inhale' }
        ];

        let currentIndex = 0;
        let cycleCount = 0;

        const runCycle = () => {
            const current = sequence[currentIndex];
            setBreathingPhase(current.phase);

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % sequence.length;
                if (currentIndex === 0) {
                    cycleCount++;
                    setBreathCount(cycleCount);
                    if (cycleCount >= 4) {
                        setBreathingPhase('complete');
                        return;
                    }
                }
                runCycle();
            }, current.duration);
        };

        runCycle();
    };

    const groundingExercise = {
        title: '5-4-3-2-1 Grounding Technique',
        steps: [
            '5 things you can SEE around you',
            '4 things you can TOUCH',
            '3 things you can HEAR',
            '2 things you can SMELL',
            '1 thing you can TASTE'
        ]
    };

    return (
        <>
            {/* SOS Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-2xl flex items-center justify-center text-white font-bold text-lg hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                    boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.7)', '0 0 0 20px rgba(239, 68, 68, 0)'],
                }}
                transition={{ 
                    boxShadow: { duration: 1.5, repeat: Infinity }
                }}
            >
                SOS
            </motion.button>

            {/* SOS Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold">You're Not Alone</h2>
                                        <p className="text-red-100 mt-1">Immediate support is here</p>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-slate-200">
                                <button
                                    onClick={() => setActiveTab('breathing')}
                                    className={`flex-1 py-3 px-4 font-medium transition-colors ${
                                        activeTab === 'breathing'
                                            ? 'text-red-600 border-b-2 border-red-600'
                                            : 'text-slate-600 hover:text-slate-800'
                                    }`}
                                >
                                    <Wind className="w-5 h-5 inline mr-2" />
                                    Breathing
                                </button>
                                <button
                                    onClick={() => setActiveTab('grounding')}
                                    className={`flex-1 py-3 px-4 font-medium transition-colors ${
                                        activeTab === 'grounding'
                                            ? 'text-red-600 border-b-2 border-red-600'
                                            : 'text-slate-600 hover:text-slate-800'
                                    }`}
                                >
                                    <Heart className="w-5 h-5 inline mr-2" />
                                    Grounding
                                </button>
                                <button
                                    onClick={() => setActiveTab('hotlines')}
                                    className={`flex-1 py-3 px-4 font-medium transition-colors ${
                                        activeTab === 'hotlines'
                                            ? 'text-red-600 border-b-2 border-red-600'
                                            : 'text-slate-600 hover:text-slate-800'
                                    }`}
                                >
                                    <Phone className="w-5 h-5 inline mr-2" />
                                    Hotlines
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                {/* Breathing Tab */}
                                {activeTab === 'breathing' && (
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-slate-800 mb-4">4-7-8 Breathing Exercise</h3>
                                        <p className="text-slate-600 mb-6">This technique helps calm your nervous system</p>
                                        
                                        {breathingPhase === 'ready' && (
                                            <button
                                                onClick={startBreathing}
                                                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-shadow"
                                            >
                                                Start Breathing Exercise
                                            </button>
                                        )}

                                        {breathingPhase !== 'ready' && breathingPhase !== 'complete' && (
                                            <div className="space-y-6">
                                                <div className="relative w-48 h-48 mx-auto">
                                                    <motion.div
                                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-orange-400"
                                                        animate={{
                                                            scale: breathingPhase === 'inhale' ? 1.5 : breathingPhase === 'hold' ? 1.5 : 1,
                                                        }}
                                                        transition={{ duration: breathingPhase === 'inhale' ? 4 : breathingPhase === 'exhale' ? 8 : 0 }}
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="text-white text-center">
                                                            <p className="text-3xl font-bold capitalize">{breathingPhase}</p>
                                                            <p className="text-sm mt-2">Cycle {breathCount + 1}/4</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-slate-600">
                                                    {breathingPhase === 'inhale' && <p>Breathe in through your nose...</p>}
                                                    {breathingPhase === 'hold' && <p>Hold your breath...</p>}
                                                    {breathingPhase === 'exhale' && <p>Exhale slowly through your mouth...</p>}
                                                    {breathingPhase === 'rest' && <p>Rest...</p>}
                                                </div>
                                            </div>
                                        )}

                                        {breathingPhase === 'complete' && (
                                            <div className="space-y-4">
                                                <div className="text-6xl">✨</div>
                                                <p className="text-xl font-semibold text-slate-800">Great job!</p>
                                                <p className="text-slate-600">You completed 4 breathing cycles</p>
                                                <button
                                                    onClick={() => setBreathingPhase('ready')}
                                                    className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                                                >
                                                    Do Another Round
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Grounding Tab */}
                                {activeTab === 'grounding' && (
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-4">{groundingExercise.title}</h3>
                                        <p className="text-slate-600 mb-6">Focus on your senses to ground yourself in the present moment:</p>
                                        <div className="space-y-4">
                                            {groundingExercise.steps.map((step, index) => (
                                                <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                                                        {index + 1}
                                                    </div>
                                                    <p className="text-slate-700 pt-1">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Hotlines Tab */}
                                {activeTab === 'hotlines' && (
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-4">Crisis Support Hotlines</h3>
                                        <p className="text-slate-600 mb-6">Professional help is available 24/7:</p>
                                        <div className="space-y-4">
                                            {crisisHotlines.map((hotline, index) => (
                                                <div key={index} className="p-4 border-2 border-slate-200 rounded-xl hover:border-red-300 transition-colors">
                                                    <h4 className="font-bold text-slate-800 mb-1">{hotline.name}</h4>
                                                    <p className="text-2xl font-bold text-red-600 mb-1">{hotline.number}</p>
                                                    <p className="text-sm text-slate-600">{hotline.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                            <p className="text-sm text-blue-800">
                                                <strong>Remember:</strong> Reaching out for help is a sign of strength, not weakness. These professionals are here to support you.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PanicSOS;
