import React, { useState, useEffect } from 'react';
import { ComputerPart, Language, UI_TEXT, ComponentType } from '../types';
import { getIcon } from '../constants';
import { playLocalAudio } from '../services/audioService';
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';

interface InputOutputGameProps {
    parts: ComputerPart[];
    language: Language;
    onBack: () => void;
}

export const InputOutputGame: React.FC<InputOutputGameProps> = ({ parts, language, onBack }) => {
    const [currentItem, setCurrentItem] = useState<ComputerPart | null>(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [animatingDir, setAnimatingDir] = useState<'left' | 'right' | null>(null);
    const [shuffledQueue, setShuffledQueue] = useState<ComputerPart[]>([]);

    const t = UI_TEXT[language];
    const isRTL = language === 'ar';
    const BackIcon = isRTL ? ArrowRight : ArrowLeft;

    // Filter only Input/Output devices (ignore Processing/Storage like USB/HDD/RAM/CPU/Motherboard)
    const gameParts = parts.filter(p => p.type === ComponentType.INPUT || p.type === ComponentType.OUTPUT);

    const pickNextItem = (currentQueue: ComputerPart[]) => {
        if (currentQueue.length === 0) {
            // Reshuffle
            const newQueue = [...gameParts].sort(() => Math.random() - 0.5);
            setShuffledQueue(newQueue.slice(1));
            setCurrentItem(newQueue[0]);
        } else {
            setCurrentItem(currentQueue[0]);
            setShuffledQueue(currentQueue.slice(1));
        }
        setFeedback(null);
        setAnimatingDir(null);
    };

    useEffect(() => {
        pickNextItem([]);
    }, []);

    const handleChoice = (type: ComponentType.INPUT | ComponentType.OUTPUT) => {
        if (!currentItem || feedback) return;

        if (currentItem.type === type) {
            // Correct
            setScore(s => s + 1);
            setFeedback('correct');
            playLocalAudio('good_answer', language);
            setAnimatingDir(type === ComponentType.INPUT ? 'left' : 'right');

            setTimeout(() => {
                pickNextItem(shuffledQueue);
            }, 1000);
        } else {
            // Wrong
            setFeedback('wrong');
            setTimeout(() => setFeedback(null), 800);
        }
    };

    if (!currentItem) return <div>{t.loading}</div>;

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="w-full flex justify-between items-center p-4 bg-white shadow-sm z-10">
                <button onClick={onBack} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <BackIcon size={24} />
                </button>
                <h2 className="text-xl md:text-3xl font-bold font-sans text-gray-800">
                    {language === 'fr' ? "Le Trieur" : language === 'en' ? "The Sorter" : "المصنف"}
                </h2>
                <div className="bg-blue-100 px-4 py-2 rounded-full font-bold text-blue-600">
                    {t.score}: {score}
                </div>
            </div>

            <div className="flex-1 w-full flex relative">
                {/* Left Zone: INPUT */}
                <div
                    onClick={() => handleChoice(ComponentType.INPUT)}
                    className={`flex-1 flex flex-col items-center justify-center transition-colors cursor-pointer border-r-4 border-white
            ${feedback === 'correct' && currentItem.type === ComponentType.INPUT ? 'bg-green-200' : 'bg-green-50 hover:bg-green-100'}
          `}
                >
                    <div className={`p-6 rounded-full bg-green-200 mb-4 ${isRTL ? 'ml-0' : 'mr-0'}`}>
                        <ArrowDown className="text-green-600 animate-bounce" size={48} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-green-700 font-sans mb-2">
                        {language === 'fr' ? "ENTRÉE" : language === 'en' ? "INPUT" : "إدخال"}
                    </h3>
                    <p className="text-green-600 text-center px-4 font-sans">
                        {language === 'fr' ? "Ça rentre dans l'ordi" : language === 'en' ? "Goes into PC" : "يدخل للحاسوب"}
                    </p>
                </div>

                {/* Right Zone: OUTPUT */}
                <div
                    onClick={() => handleChoice(ComponentType.OUTPUT)}
                    className={`flex-1 flex flex-col items-center justify-center transition-colors cursor-pointer border-l-4 border-white
            ${feedback === 'correct' && currentItem.type === ComponentType.OUTPUT ? 'bg-red-200' : 'bg-red-50 hover:bg-red-100'}
          `}
                >
                    <div className={`p-6 rounded-full bg-red-200 mb-4`}>
                        <ArrowDown className="text-red-600 animate-bounce" size={48} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-red-700 font-sans mb-2">
                        {language === 'fr' ? "SORTIE" : language === 'en' ? "OUTPUT" : "إخراج"}
                    </h3>
                    <p className="text-red-600 text-center px-4 font-sans">
                        {language === 'fr' ? "Ça sort de l'ordi" : language === 'en' ? "Comes out of PC" : "يخرج من الحاسوب"}
                    </p>
                </div>

                {/* Central Item */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700
            ${animatingDir === 'left' ? '-translate-x-[150%] opacity-0 rotate-[-45deg]' : ''}
            ${animatingDir === 'right' ? 'translate-x-[150%] opacity-0 rotate-[45deg]' : ''}
            ${feedback === 'wrong' ? 'animate-shake' : ''}
        `}>
                    <div className={`p-8 rounded-3xl shadow-2xl ${currentItem.color} border-4 border-white w-48 h-48 flex items-center justify-center`}>
                        {getIcon(currentItem.iconName, 80, "text-white drop-shadow-md")}
                    </div>
                    <div className="mt-4 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg text-center">
                        <span className="text-xl font-bold text-gray-800">{currentItem.name[language]}</span>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-50 p-4 text-center border-t border-yellow-200 w-full">
                <p className="text-yellow-800 font-medium font-sans">
                    {language === 'fr' ? "Clique sur la zone VERTE (Entrée) ou ROUGE (Sortie) !" :
                        language === 'en' ? "Click GREEN (Input) or RED (Output) zone!" :
                            "اضغط على المنطقة الخضراء (إدخال) أو الحمراء (إخراج)!"}
                </p>
            </div>
        </div>
    );
};
