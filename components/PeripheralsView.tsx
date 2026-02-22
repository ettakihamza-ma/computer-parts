import React, { useState } from 'react';
import { ComputerPart, Language, UI_TEXT, COMPONENT_TYPE_TRANSLATIONS } from '../types';
import { playLocalAudio } from '../services/audioService';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getIcon } from '../constants';

interface PeripheralsViewProps {
    parts: ComputerPart[];
    language: Language;
    onBack: () => void;
}

export const PeripheralsView: React.FC<PeripheralsViewProps> = ({ parts, language, onBack }) => {
    const [selectedPart, setSelectedPart] = useState<ComputerPart | null>(null);
    const [animatingPart, setAnimatingPart] = useState<string | null>(null);

    const t = UI_TEXT[language];
    const isRTL = language === 'ar';
    const BackIcon = isRTL ? ArrowRight : ArrowLeft;

    const handleSpeak = async (partId: string, type: 'name' | 'description' = 'name') => {
        await playLocalAudio(partId, language, type);
    };

    const handlePartClick = (partId: string) => {
        const part = parts.find(p => p.id === partId);
        if (part) {
            setSelectedPart(part);
            setAnimatingPart(partId);
            handleSpeak(part.id, 'name');

            // Speak description shortly after name
            setTimeout(() => {
                if (selectedPart?.id === partId) { // Check if still selected
                    handleSpeak(part.id, 'description');
                }
            }, 1000);

            // Stop ping animation after a few seconds
            setTimeout(() => setAnimatingPart(null), 2000);
        }
    };

    const closePopup = () => {
        setSelectedPart(null);
    };

    // Helper to get specific styles/animations per part
    const getPartStyle = (partId: string) => {
        switch (partId) {
            case 'webcam': return { animation: 'animate-bounce-gentle' };
            case 'microphone': return { animation: 'animate-wiggle' };
            case 'headphones': return { animation: 'animate-bounce-gentle' };
            case 'gamepad': return { animation: 'animate-wiggle' };
            case 'scanner': return { animation: 'animate-pulse' };
            case 'usb': return { animation: 'animate-spin-slow' };
            default: return { animation: '' };
        }
    };

    return (
        <div className="min-h-screen p-4 flex flex-col items-center bg-gradient-to-br from-indigo-50 to-purple-100 animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="w-full max-w-6xl relative flex flex-col items-center pt-16">
                <button
                    onClick={onBack}
                    className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} p-3 bg-white/80 rounded-full shadow-md hover:bg-white z-20 transition-all`}
                    dir="ltr"
                >
                    <BackIcon size={32} className="text-gray-600" />
                </button>

                <h2 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-8 font-sans drop-shadow-sm text-center">
                    {language === 'fr' ? "Les Périphériques" : language === 'en' ? "Peripherals" : "الأجهزة الطرفية"}
                </h2>

                <p className="text-xl text-gray-600 mb-10 font-sans text-center bg-white/50 px-6 py-2 rounded-full shadow-sm">
                    {t.touchObj}
                </p>

                {/* Peripherals Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full px-4 md:px-8 pb-32">
                    {parts.map(part => {
                        const isSelected = selectedPart?.id === part.id;
                        const isAnimating = animatingPart === part.id;
                        return (
                            <div
                                key={part.id}
                                onClick={() => handlePartClick(part.id)}
                                className={`relative cursor-pointer group flex flex-col items-center p-6 rounded-3xl transition-all duration-300 transform 
                                    ${isSelected ? 'bg-white shadow-xl scale-105 ring-4 ring-indigo-300' : 'bg-white/60 shadow-md hover:bg-white/90 hover:shadow-lg hover:-translate-y-2'}
                                `}
                            >
                                {/* Icon Container */}
                                <div className={`p-6 rounded-full mb-4 transition-colors duration-300
                                    ${part.color.replace('bg-', 'bg-').replace('-400', '-100')}
                                    ${isSelected ? 'bg-indigo-100' : ''}
                                `}>
                                    {getIcon(
                                        part.iconName,
                                        72,
                                        `${part.color.replace('bg-', 'text-').replace('-400', '-600')} drop-shadow-md transition-transform duration-300 group-hover:scale-110 ${isAnimating ? getPartStyle(part.id).animation : ''}`
                                    )}
                                </div>

                                <span className={`text-2xl font-bold text-center font-sans tracking-wide
                                    ${isSelected ? part.color.replace('bg-', 'text-').replace('-400', '-700') : 'text-gray-700'}
                                `}>
                                    {part.name[language]}
                                </span>

                                {/* Info Card removed from here, moving to central popup */}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Central Popup Modal */}
            {selectedPart && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-900/60 backdrop-blur-sm animate-fade-in"
                    onClick={closePopup}
                >
                    <div
                        className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden border-4 border-indigo-200 animate-bounce-in relative"
                        onClick={(e) => e.stopPropagation()}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        {/* Close button */}
                        <button
                            onClick={closePopup}
                            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors z-10`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div className="p-8 md:p-12 flex flex-col items-center">
                            {/* Icon Showcase */}
                            <div className={`p-8 rounded-full mb-6 ${selectedPart.color.replace('bg-', 'bg-').replace('-400', '-100')}`}>
                                {getIcon(
                                    selectedPart.iconName,
                                    100,
                                    `${selectedPart.color.replace('bg-', 'text-').replace('-400', '-600')} drop-shadow-lg`
                                )}
                            </div>

                            {/* Title */}
                            <h3 className={`text-4xl md:text-5xl font-bold font-sans mb-4 text-center ${selectedPart.color.replace('bg-', 'text-').replace('-400', '-700')}`}>
                                {selectedPart.name[language]}
                            </h3>

                            {/* Action Badge */}
                            <div className="flex flex-wrap gap-3 justify-center mb-6">
                                <div className="bg-indigo-100 text-indigo-800 px-6 py-2 rounded-full text-xl font-bold inline-flex items-center gap-2">
                                    <span>💡</span>
                                    <span>{selectedPart.action[language]}</span>
                                </div>
                                <div className={`px-6 py-2 rounded-full text-lg font-bold inline-flex items-center gap-2 border-2
                                    ${selectedPart.type === 'ENTRÉE' ? 'bg-green-50 text-green-700 border-green-200' :
                                        selectedPart.type === 'SORTIE' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                            'bg-blue-50 text-blue-700 border-blue-200'}
                                `}>
                                    <span>{selectedPart.type === 'ENTRÉE' ? '📥' : selectedPart.type === 'SORTIE' ? '📤' : '⚙️'}</span>
                                    <span>{COMPONENT_TYPE_TRANSLATIONS[selectedPart.type][language]}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-2xl text-gray-700 text-center font-sans leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100 w-full">
                                {selectedPart.description[language]}
                            </p>

                            {/* Re-play audio button */}
                            <button
                                onClick={() => handleSpeak(selectedPart.id, 'description')}
                                className="mt-8 bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-full shadow-md transition-transform hover:scale-105"
                                title="Réécouter"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-10deg); }
                    50% { transform: rotate(10deg); }
                }
                @keyframes bounce-gentle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-wiggle { animation: wiggle 0.5s ease-in-out infinite; }
                .animate-bounce-gentle { animation: bounce-gentle 1s ease-in-out infinite; }
                .animate-spin-slow { animation: spin-slow 3s linear infinite; }
            `}</style>
        </div>
    );
};
