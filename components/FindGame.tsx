import React, { useState, useEffect } from 'react';
import { ComputerPart, Language, UI_TEXT } from '../types';
import { getIcon } from '../constants';
import { playLocalAudio } from '../services/audioService';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';

interface FindGameProps {
    parts: ComputerPart[];
    language: Language;
    onBack: () => void;
}

export const FindGame: React.FC<FindGameProps> = ({ parts, language, onBack }) => {
    const [target, setTarget] = useState<ComputerPart | null>(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [shuffledParts, setShuffledParts] = useState<ComputerPart[]>([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [loadingAudio, setLoadingAudio] = useState(false);

    const t = UI_TEXT[language];
    const isRTL = language === 'ar';
    const BackIcon = isRTL ? ArrowRight : ArrowLeft;

    const handleSpeak = async (partId: string, type: 'name' | 'description' = 'name') => {
        setLoadingAudio(true);
        await playLocalAudio(partId, language, type);
        setLoadingAudio(false);
    };

    const shuffleParts = () => {
        const arr = [...parts];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const pickNewTarget = (previousTargetId?: string) => {
        let options = parts;
        if (previousTargetId) {
            options = parts.filter(p => p.id !== previousTargetId);
        }
        const randomPart = options[Math.floor(Math.random() * options.length)];
        setTarget(randomPart);
        setFeedback(null);

        setTimeout(() => {
            handleSpeak(randomPart.id, 'name');
        }, 500);
    };

    const handleAnswer = (partId: string) => {
        if (!target) return;

        if (partId === target.id) {
            setScore(s => s + 1);
            setFeedback('correct');
            playLocalAudio('good_answer', language);

            setTimeout(() => {
                setIsShuffling(true);
                setTimeout(() => {
                    setShuffledParts(shuffleParts());
                    setIsShuffling(false);
                    pickNewTarget(target.id);
                }, 400);
            }, 1200);
        } else {
            setFeedback('wrong');
            setTimeout(() => {
                setFeedback(null);
            }, 1000);
        }
    };

    useEffect(() => {
        setShuffledParts(shuffleParts());
        pickNewTarget();
    }, []);

    if (!target) return null;

    if (feedback) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center ${feedback === 'correct' ? 'bg-green-100' : 'bg-red-100'} animate-fade-in-up`} dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="text-9xl mb-8 animate-bounce">{feedback === 'correct' ? '🎉' : '🤔'}</div>
                <h2 className="text-5xl font-bold mb-4 text-center font-sans">{feedback === 'correct' ? t.bravo : t.tryAgain}</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 flex flex-col max-w-4xl mx-auto animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="relative flex items-center justify-center mb-8">
                <button
                    onClick={onBack}
                    className={`absolute ${isRTL ? 'right-0' : 'left-0'} p-3 bg-white rounded-full shadow hover:bg-gray-50 z-20`}
                    dir="ltr"
                >
                    <BackIcon size={24} />
                </button>
                <div className="bg-white px-6 py-2 rounded-full shadow font-bold text-2xl text-kid-blue font-sans">{t.score}: {score}</div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center mb-12 border-b-8 border-gray-200 mt-8">
                <p className="text-2xl text-gray-500 mb-2 uppercase tracking-widest font-bold font-sans">{t.question}</p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight font-sans">
                    <span className="text-kid-blue underline decoration-wavy">{target.name[language]}</span>
                </h2>
                <button onClick={() => handleSpeak(target.id, 'name')} className="mt-6 p-4 bg-blue-100 rounded-full hover:bg-blue-200 text-blue-600 transition">
                    {loadingAudio ? (<div className="h-8 w-8 flex items-center justify-center"><span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-blue-600 opacity-75"></span><Volume2 size={32} /></div>) : (<Volume2 size={32} />)}
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {shuffledParts.map((part) => (
                    <button
                        key={part.id}
                        onClick={() => handleAnswer(part.id)}
                        className={`${part.color} p-6 rounded-2xl shadow-md hover:opacity-90 transform transition-all duration-300 active:scale-95 flex justify-center items-center h-32 border-b-4 border-black/10 ${isShuffling ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
                    >
                        {getIcon(part.iconName, 48, "text-white")}
                    </button>
                ))}
            </div>
        </div>
    );
};
