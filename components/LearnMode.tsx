import React, { useState } from 'react';
import { ComputerPart, Language, UI_TEXT } from '../types';
import { getIcon } from '../constants';
import { playLocalAudio } from '../services/audioService';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';

interface LearnModeProps {
    parts: ComputerPart[];
    language: Language;
    onBack: () => void;
}

export const LearnMode: React.FC<LearnModeProps> = ({ parts, language, onBack }) => {
    const [selectedPart, setSelectedPart] = useState<ComputerPart | null>(null);
    const [animatingId, setAnimatingId] = useState<string | null>(null);
    const [loadingAudio, setLoadingAudio] = useState(false);

    const t = UI_TEXT[language];
    const isRTL = language === 'ar';
    const BackIcon = isRTL ? ArrowRight : ArrowLeft;

    const handleSpeak = async (partId: string, type: 'name' | 'description' = 'name') => {
        setLoadingAudio(true);
        await playLocalAudio(partId, language, type);
        setLoadingAudio(false);
    };

    const handlePartClick = (part: ComputerPart) => {
        setAnimatingId(part.id);
        handleSpeak(part.id, 'name');
        setTimeout(() => {
            setSelectedPart(part);
            setAnimatingId(null);
        }, 600);
    };

    if (selectedPart) {
        return (
            <div className="min-h-screen p-4 flex flex-col items-center bg-white animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
                <button
                    onClick={() => setSelectedPart(null)}
                    className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors z-20`}
                    dir="ltr"
                >
                    <BackIcon size={32} />
                </button>

                <div className={`mt-16 p-8 rounded-3xl ${selectedPart.color} shadow-2xl max-w-2xl w-full text-white text-center border-b-8 border-black/20`}>
                    <div className="flex justify-center mb-6">{getIcon(selectedPart.iconName, 120, "drop-shadow-lg wiggle")}</div>
                    <div className="flex justify-center items-center mb-6">
                        <button onClick={() => handleSpeak(selectedPart.id, 'name')} className="flex items-center gap-4 hover:scale-105 transition-transform bg-black/10 px-6 py-3 rounded-2xl">
                            <h2 className="text-5xl md:text-6xl font-bold cursor-pointer font-sans">{selectedPart.name[language]}</h2>
                            <div className="bg-white/20 p-2 rounded-full">
                                {loadingAudio ? (<div className="h-8 w-8 flex items-center justify-center"><span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-white opacity-75"></span><Volume2 className="text-white relative" size={40} /></div>) : (<Volume2 className="text-white" size={40} />)}
                            </div>
                        </button>
                    </div>

                    <div className="bg-white/90 text-gray-800 p-6 rounded-2xl mb-6 text-left shadow-inner cursor-pointer hover:bg-white transition" onClick={() => handleSpeak(selectedPart.id, 'description')}>
                        <div className="flex items-start gap-4">
                            <Volume2 className="text-kid-blue shrink-0 mt-1" size={32} />
                            <p className="text-2xl leading-relaxed font-medium font-sans">{selectedPart.description[language]}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-left">
                        {selectedPart.facts[language].slice(0, 2).map((fact, i) => (
                            <div key={i} className="bg-white/20 p-4 rounded-xl backdrop-blur-sm border-2 border-white/30">
                                <p className="font-sans text-lg font-bold">★ {fact}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="relative flex items-center justify-center mb-8">
                <button
                    onClick={onBack}
                    className={`absolute ${isRTL ? 'right-0' : 'left-0'} p-3 bg-white rounded-full shadow hover:bg-gray-50 transition-transform hover:scale-110 z-20`}
                    dir="ltr"
                >
                    <BackIcon size={24} />
                </button>
                <h2 className="text-4xl font-bold text-gray-800 font-sans">{t.touchObj}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pt-8 mb-8">
                {parts.map((part) => (
                    <div key={part.id} onClick={() => handlePartClick(part)} className={`${part.color} p-6 rounded-3xl shadow-lg cursor-pointer border-b-8 border-black/10 flex flex-col items-center justify-center h-64 ${animatingId === part.id ? 'animate-pop-bounce ring-4 ring-white ring-offset-4 ring-offset-blue-50' : 'transform transition hover:scale-105 hover:rotate-1'}`}>
                        <div className="bg-white/20 p-6 rounded-full mb-4">{getIcon(part.iconName, 64, "text-white")}</div>
                        <span className="text-3xl font-bold text-white tracking-wide font-sans">{part.name[language]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
