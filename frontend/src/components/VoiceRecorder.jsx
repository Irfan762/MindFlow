import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const VoiceRecorder = ({ onTranscript }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [transcript, setTranscript] = useState('');
    const mediaRecorderRef = useRef(null);
    const recognitionRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            const audioChunks = [];
            mediaRecorder.addEventListener('dataavailable', (event) => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
                stream.getTracks().forEach(track => track.stop());
            });

            mediaRecorder.start();
            setIsRecording(true);

            // Start speech recognition
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;

                recognition.onresult = (event) => {
                    let finalTranscript = '';
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript + ' ';
                        }
                    }
                    if (finalTranscript) {
                        setTranscript(prev => prev + finalTranscript);
                        if (onTranscript) {
                            onTranscript(transcript + finalTranscript);
                        }
                    }
                };

                recognition.start();
                recognitionRef.current = recognition;
            }
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Could not access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const deleteRecording = () => {
        setAudioURL(null);
        setTranscript('');
        if (onTranscript) {
            onTranscript('');
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                {!isRecording && !audioURL && (
                    <button
                        onClick={startRecording}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                        <Mic className="w-5 h-5" />
                        Start Voice Recording
                    </button>
                )}

                {isRecording && (
                    <motion.button
                        onClick={stopRecording}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <Square className="w-5 h-5" />
                        Stop Recording
                    </motion.button>
                )}

                {audioURL && (
                    <div className="flex items-center gap-3">
                        <audio src={audioURL} controls className="h-10" />
                        <button
                            onClick={deleteRecording}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {isRecording && (
                <div className="flex items-center gap-2 text-red-600">
                    <motion.div
                        className="w-3 h-3 bg-red-600 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-sm font-medium">Recording...</span>
                </div>
            )}

            {transcript && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-900 font-medium mb-2">Live Transcription:</p>
                    <p className="text-slate-700">{transcript}</p>
                </div>
            )}
        </div>
    );
};

export default VoiceRecorder;
