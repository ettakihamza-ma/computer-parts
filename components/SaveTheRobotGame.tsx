import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Battery, BatteryCharging, BatteryWarning, ZapOff } from 'lucide-react';
import { ComputerPart } from '../types';
import { playLocalAudio } from '../services/audioService';

interface SaveTheRobotGameProps {
    parts: ComputerPart[];
    language: 'fr' | 'en' | 'ar';
    onBack: () => void;
}

export const SaveTheRobotGame: React.FC<SaveTheRobotGameProps> = ({ parts, language, onBack }) => {
    const [targetWord, setTargetWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [errors, setErrors] = useState(0);
    const maxErrors = 6;
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    const alphabet = language === 'ar'
        ? 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('')
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    useEffect(() => {
        startNewGame();
    }, [language]);

    const normalize = (str: string) => {
        return str
            .normalize('NFD') // Decompose accents
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-zA-Z\u0600-\u06FF]/g, '')
            .toUpperCase();
    };

    const startNewGame = () => {
        const randomPart = parts[Math.floor(Math.random() * parts.length)];
        const word = normalize(randomPart.name[language]);
        setTargetWord(word);
        setGuessedLetters([]);
        setErrors(0);
        setGameOver(false);
        setWin(false);
        playLocalAudio('start_game', language);
    };

    const handleGuess = (letter: string) => {
        if (gameOver || guessedLetters.includes(letter)) return;

        const isCorrect = targetWord.includes(letter);
        setGuessedLetters(prev => [...prev, letter]);

        if (!isCorrect) {
            setErrors(prev => prev + 1);
            playLocalAudio('wrong_answer', language);
        } else {
            playLocalAudio('good_answer', language);
        }
    };

    useEffect(() => {
        if (!targetWord) return;

        const isWin = targetWord.split('').every(char => guessedLetters.includes(char));
        const isLost = errors >= maxErrors;

        if (isWin) {
            setWin(true);
            setGameOver(true);
            playLocalAudio('game_won', language);
        } else if (isLost) {
            setWin(false);
            setGameOver(true);
            playLocalAudio('game_lost', language); // Assuming generic game lost audio
        }
    }, [guessedLetters, errors, targetWord, language]);

    // Robot / Battery Visual
    const renderRobotStatus = () => {
        // visual representation of the robot's power level
        const lifePercentage = Math.max(0, (maxErrors - errors) / maxErrors) * 100;

        let color = 'text-green-500';
        if (lifePercentage < 60) color = 'text-yellow-500';
        if (lifePercentage < 30) color = 'text-red-500';

        return (
            <div className="flex flex-col items-center justify-center mb-8 animate-float">
                {/* Robot Head */}
                <div className={`relative transition-all duration-500 ${errors > 0 ? 'shake' : ''}`}>
                    {lifePercentage > 0 ? (
                        <div className={`w-32 h-32 md:w-48 md:h-48 rounded-2xl border-8 ${color.replace('text', 'border')} bg-white shadow-2xl flex items-center justify-center relative overflow-hidden`}>
                            {/* Eyes */}
                            <div className="flex gap-4 mb-2">
                                <div className={`w-4 h-4 md:w-6 md:h-6 rounded-full bg-gray-800 ${errors > 4 ? 'animate-ping' : ''}`}></div>
                                <div className={`w-4 h-4 md:w-6 md:h-6 rounded-full bg-gray-800 ${errors > 4 ? 'animate-ping' : ''}`}></div>
                            </div>
                            {/* Mouth */}
                            <div className="absolute bottom-6 w-12 h-2 bg-gray-800 rounded-full"></div>

                            {/* Battery Level Fill */}
                            <div
                                className={`absolute bottom-0 left-0 right-0 ${color.replace('text', 'bg')} opacity-20 transition-all duration-500`}
                                style={{ height: `${lifePercentage}%` }}
                            ></div>
                        </div>
                    ) : (
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl border-8 border-gray-400 bg-gray-200 shadow-inner flex items-center justify-center">
                            <ZapOff size={64} className="text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Status Text */}
                <div className={`mt-4 text-xl font-bold ${color}`}>
                    {lifePercentage > 0 ? `${Math.round(lifePercentage)}% Power` : 'System Offline'}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-purple-50 to-white overflow-hidden absolute inset-0 z-50">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-white shadow-md">
                <button
                    onClick={onBack}
                    className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={32} className="text-gray-600" />
                </button>

                <h2 className="text-2xl font-bold text-kid-purple">
                    {language === 'fr' ? 'Sauve le Robot' : language === 'en' ? 'Save the Robot' : 'انقذ الروبوت'}
                </h2>

                <button
                    onClick={startNewGame}
                    className="p-3 bg-kid-purple text-white rounded-full hover:bg-purple-600 transition-colors"
                >
                    <RefreshCw size={32} />
                </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex flex-col items-center max-w-4xl mx-auto w-full">

                {renderRobotStatus()}

                {/* Word Display */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {targetWord.split('').map((char, index) => (
                        <div key={index} className="w-10 h-12 md:w-14 md:h-16 border-b-4 border-gray-400 flex items-center justify-center text-3xl font-bold text-gray-800">
                            {guessedLetters.includes(char) || gameOver ? char : ''}
                        </div>
                    ))}
                </div>

                {/* Keyboard */}
                <div className="flex flex-wrap justify-center gap-2 max-w-2xl bg-white p-6 rounded-3xl shadow-lg">
                    {alphabet.map((letter) => {
                        const isGuessed = guessedLetters.includes(letter);
                        const isCorrect = targetWord.includes(letter);

                        let btnClass = 'bg-white hover:bg-gray-100 text-gray-700 border-2 border-gray-200 shadow-sm';
                        if (isGuessed) {
                            btnClass = isCorrect
                                ? 'bg-green-500 text-white border-green-600 shadow-inner opacity-50'
                                : 'bg-red-200 text-red-400 border-red-200 opacity-50';
                        }

                        return (
                            <button
                                key={letter}
                                onClick={() => handleGuess(letter)}
                                disabled={isGuessed || gameOver}
                                className={`
                            w-10 h-10 md:w-12 md:h-12 rounded-xl text-xl font-bold transition-all transform hover:-translate-y-1
                            ${btnClass}
                        `}
                            >
                                {letter}
                            </button>
                        );
                    })}
                </div>
            </div>

            {gameOver && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl text-center transform scale-110">
                        <h2 className={`text-4xl font-bold mb-4 ${win ? 'text-green-500' : 'text-red-500'}`}>
                            {win ? 'Mission Accomplished! 🚀' : 'Mission Failed 🛑'}
                        </h2>
                        <p className="text-xl mb-6">
                            {win
                                ? (language === 'fr' ? 'Le robot est sauvé !' : 'The robot is saved!')
                                : (language === 'fr' ? `Le mot était : ${targetWord}` : `The word was: ${targetWord}`)
                            }
                        </p>
                        <button
                            onClick={startNewGame}
                            className="px-8 py-3 bg-kid-purple text-white text-xl font-bold rounded-full hover:bg-purple-600 transition-transform hover:scale-105 shadow-lg"
                        >
                            {language === 'fr' ? 'Rejouer' : language === 'en' ? 'Try Again' : 'حاول مرة أخرى'}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};
