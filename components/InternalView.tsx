import React, { useState } from 'react';
import { ComputerPart, Language, UI_TEXT } from '../types';
import { playLocalAudio } from '../services/audioService';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { InternalMotherboard, InternalCPU, InternalRAM, InternalGPU, InternalPSU, InternalHDD, InternalFan } from './InternalParts';

interface InternalViewProps {
    parts: ComputerPart[];
    language: Language;
    onBack: () => void;
}

export const InternalView: React.FC<InternalViewProps> = ({ parts, language, onBack }) => {
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
        <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-gray-900 animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
            <button
                onClick={onBack}
                className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} p-3 bg-white rounded-full shadow hover:bg-gray-50 z-20`}
                dir="ltr"
            >
                <BackIcon size={32} />
            </button>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">
                {language === 'fr' ? "L'Intérieur" : language === 'en' ? "Inside" : "الداخل"}
            </h2>

            <div className="relative w-full max-w-4xl aspect-video bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-700">

                {/* Motherboard Base */}
                <InternalMotherboard
                    style={{ top: '10%', left: '10%', width: '80%', height: '80%' }}
                    onClick={() => handlePartClick('motherboard')}
                />

                {/* CPU + Fan (Fan on top) */}
                <InternalCPU
                    style={{ top: '35%', left: '42%', width: '16%', height: '25%' }}
                    onClick={() => handlePartClick('cpu')}
                />
                <InternalFan
                    style={{ top: '35%', left: '42%', width: '16%', height: '25%', opacity: 0.9 }}
                    onClick={() => handlePartClick('fan')}
                />

                {/* RAM Slots */}
                <InternalRAM
                    style={{ top: '30%', left: '65%', width: '8%', height: '40%' }}
                    onClick={() => handlePartClick('ram')}
                />

                {/* GPU Slot */}
                <InternalGPU
                    style={{ top: '60%', left: '15%', width: '40%', height: '15%' }}
                    onClick={() => handlePartClick('gpu')}
                />

                {/* PSU */}
                <InternalPSU
                    style={{ top: '75%', left: '75%', width: '20%', height: '20%' }}
                    onClick={() => handlePartClick('psu')}
                />

                {/* HDD */}
                <InternalHDD
                    style={{ top: '15%', left: '75%', width: '15%', height: '20%' }}
                    onClick={() => handlePartClick('hdd')}
                />

                {/* Label Display */}
                {selectedPart && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl animate-bounce-in border-2 border-white/50 z-50">
                        <span className={`text-4xl font-bold text-white`}>
                            {selectedPart.name[language]}
                        </span>
                    </div>
                )}
            </div>

            <p className="mt-8 text-xl text-gray-400 font-sans animate-pulse">{t.touchObj}</p>
        </div>
    );
};
