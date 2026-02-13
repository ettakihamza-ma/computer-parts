import React, { useState } from 'react';
import { ComputerPart, Language, UI_TEXT } from '../types';
import { playLocalAudio } from '../services/audioService';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { DeskMonitor, DeskKeyboard, DeskMouse, DeskTower, DeskSpeaker, DeskPrinter } from './DeskParts';

interface DeskViewProps {
    parts: ComputerPart[];
    language: Language;
    onBack: () => void;
}

export const DeskView: React.FC<DeskViewProps> = ({ parts, language, onBack }) => {
    const [selectedPart, setSelectedPart] = useState<ComputerPart | null>(null);

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
            handleSpeak(part.id, 'name');
        }
    };

    return (
        <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[#f0f9ff] animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
            <button
                onClick={onBack}
                className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} p-3 bg-white rounded-full shadow hover:bg-gray-50 z-20`}
                dir="ltr"
            >
                <BackIcon size={32} />
            </button>

            <h2 className="text-4xl md:text-5xl font-bold text-kid-blue mb-6 font-sans">{t.desk}</h2>

            <div className="relative w-full max-w-5xl aspect-video bg-amber-100 rounded-3xl shadow-2xl overflow-hidden border-8 border-white">
                {/* Wallpaper/Room Background */}
                <div className="absolute inset-0 bg-blue-50 opacity-50"></div>

                {/* Desk Surface */}
                <div className="absolute bottom-0 w-full h-1/3 bg-amber-800 shadow-inner border-t-4 border-amber-900/50"></div>

                {/* --- Components --- */}

                {/* Monitor */}
                <DeskMonitor
                    onClick={() => handlePartClick('monitor')}
                    style={{ top: '15%', left: '35%', width: '30%', height: '45%' }}
                />

                {/* Tower (Central Unit) */}
                <DeskTower
                    onClick={() => handlePartClick('tower')}
                    style={{ top: '35%', left: '4%', width: '15%', height: '50%' }}
                />

                {/* Keyboard */}
                <DeskKeyboard
                    onClick={() => handlePartClick('keyboard')}
                    style={{ top: '65%', left: '35%', width: '30%', height: '15%' }}
                />

                {/* Mouse */}
                <DeskMouse
                    onClick={() => handlePartClick('mouse')}
                    style={{ top: '68%', left: '68%', width: '5%', height: '10%' }}
                />

                {/* Speakers */}
                <DeskSpeaker
                    onClick={() => handlePartClick('speakers')}
                    style={{ top: '40%', left: '25%', width: '8%', height: '20%' }}
                />
                <DeskSpeaker
                    onClick={() => handlePartClick('speakers')}
                    style={{ top: '40%', left: '67%', width: '8%', height: '20%' }}
                />

                {/* Printer */}
                <DeskPrinter
                    onClick={() => handlePartClick('printer')}
                    style={{ top: '45%', left: '80%', width: '15%', height: '25%' }}
                />

                {/* Label Display (Overlay) */}
                {selectedPart && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl animate-bounce-in border-4 border-kid-blue z-50">
                        <span className={`text-4xl font-bold ${selectedPart.color.replace('bg-', 'text-').replace('-400', '-600')}`}>
                            {selectedPart.name[language]}
                        </span>
                    </div>
                )}
            </div>

            <p className="mt-8 text-xl text-gray-500 font-sans animate-pulse">{t.touchObj}</p>
        </div>
    );
};
