import React from 'react';
import { AppView, Language, UI_TEXT } from '../types';
import { ArrowLeft, ArrowRight, Search, Brain, Gamepad2 } from 'lucide-react';

interface PlayMenuProps {
    language: Language;
    onNavigate: (view: AppView) => void;
    onBack: () => void;
}

export const PlayMenu: React.FC<PlayMenuProps> = ({ language, onNavigate, onBack }) => {
    const t = UI_TEXT[language];
    const isRTL = language === 'ar';
    const BackIcon = isRTL ? ArrowRight : ArrowLeft;

    return (
        <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[#f0f9ff] animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
            <button
                onClick={onBack}
                className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} p-3 bg-white rounded-full shadow hover:bg-gray-50 z-20`}
                dir="ltr"
            >
                <BackIcon size={32} />
            </button>

            <h2 className="text-4xl md:text-5xl font-bold text-kid-blue mb-12 font-sans">{t.play}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl">
                {/* Game 1: Find It */}
                <button
                    onClick={() => onNavigate(AppView.GAME_FIND)}
                    className="bg-blue-400 hover:bg-blue-300 text-white p-6 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-full border-b-8 border-blue-600 group"
                >
                    <Search size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-bold font-sans">{t.gameFindTitle}</span>
                </button>

                {/* Game 2: Memory */}
                <button
                    onClick={() => onNavigate(AppView.GAME_MEMORY)}
                    className="bg-purple-400 hover:bg-purple-300 text-white p-6 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-full border-b-8 border-purple-600 group"
                >
                    <Brain size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-bold font-sans">{t.gameMemoryTitle}</span>
                </button>

                {/* Game 3: Word Search */}
                <button
                    onClick={() => onNavigate(AppView.GAME_WORDSEARCH)}
                    className="bg-green-400 hover:bg-green-300 text-white p-6 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-full border-b-8 border-green-600 group"
                >
                    <ArrowRight size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-bold font-sans">
                        {language === 'fr' ? 'Mots Mêlés' : language === 'en' ? 'Word Search' : 'كلمات متقاطعة'}
                    </span>
                </button>

                {/* Game 4: Save the Robot */}
                <button
                    onClick={() => onNavigate(AppView.GAME_ROBOT)}
                    className="bg-red-400 hover:bg-red-300 text-white p-6 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-full border-b-8 border-red-600 group"
                >
                    <Gamepad2 size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-bold font-sans">
                        {language === 'fr' ? 'Sauve le Robot' : language === 'en' ? 'Save the Robot' : 'انقذ الروبوت'}
                    </span>
                </button>
            </div>
        </div>
    );
};
