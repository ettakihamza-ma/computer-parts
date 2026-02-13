import React from 'react';
import { AppView, ComputerLevel, Language, UI_TEXT } from '../types';
import { ArrowLeft, ArrowRight, Monitor, CircuitBoard, Gamepad2 } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface HomeViewProps {
    language: Language;
    setLanguage: (l: Language) => void;
    currentLevel: ComputerLevel;
    onNavigate: (view: AppView) => void;
    onBack: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ language, setLanguage, currentLevel, onNavigate, onBack }) => {
    const t = UI_TEXT[language];
    const isRTL = language === 'ar';
    const BackIcon = isRTL ? ArrowRight : ArrowLeft;

    return (
        <div className="flex flex-col items-center min-h-screen p-4 text-center animate-fade-in-up bg-gradient-to-b from-blue-50 to-blue-100" dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Top Bar: Back + Flags */}
            <div className="flex items-center justify-between w-full mt-2 mb-4">
                <button
                    onClick={onBack}
                    className="p-3 bg-white/80 rounded-full shadow hover:bg-white flex items-center gap-2"
                    dir="ltr"
                >
                    <BackIcon size={24} className="text-gray-600" />
                    <span className="font-bold text-gray-600 hidden sm:block">
                        {language === 'fr' ? "Changer de niveau" : language === 'en' ? "Change Level" : "تغيير المستوى"}
                    </span>
                </button>

                <LanguageSelector language={language} setLanguage={setLanguage} />
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-kid-blue mb-2 drop-shadow-md tracking-wider font-sans">{t.title}</h1>
            <div className="bg-white/60 px-6 py-2 rounded-full mb-4">
                <span className="text-xl font-bold text-kid-blue/80 uppercase tracking-widest">
                    {currentLevel === 'internal' ? (language === 'fr' ? 'Niveau Expert' : 'Expert Level') : (language === 'fr' ? 'Niveau Débutant' : 'Beginner Level')}
                </span>
            </div>
            <p className="text-2xl text-gray-600 max-w-lg font-sans leading-relaxed bg-white/50 p-4 rounded-xl">{t.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-6 mt-8 mb-8">
                <button
                    onClick={() => onNavigate(AppView.LEARN)}
                    className="bg-kid-green hover:bg-green-400 text-white p-8 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-64 border-b-8 border-green-600 group"
                >
                    <Monitor size={64} className="mb-4 group-hover:rotate-6 transition-transform" />
                    <span className="text-3xl font-bold font-sans">{t.learn}</span>
                </button>

                <button
                    onClick={() => onNavigate(AppView.DESK)}
                    className="bg-yellow-400 hover:bg-yellow-300 text-white p-8 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-64 border-b-8 border-yellow-600 group"
                >
                    {currentLevel === 'internal' ? (
                        <CircuitBoard size={64} className="mb-4 group-hover:scale-110 transition-transform text-white" />
                    ) : (
                        <Monitor size={64} className="mb-4 group-hover:scale-110 transition-transform text-white" />
                    )}
                    <span className="text-3xl font-bold font-sans">
                        {currentLevel === 'internal' ? (language === 'fr' ? "Intérieur" : language === 'en' ? "Inside" : "الداخل") : t.desk}
                    </span>
                </button>

                <button
                    onClick={() => onNavigate(AppView.PLAY_MENU)}
                    className="bg-kid-orange hover:bg-pink-400 text-white p-8 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-64 border-b-8 border-pink-600 group"
                >
                    <Gamepad2 size={64} className="mb-4 group-hover:rotate-12 transition-transform" />
                    <span className="text-3xl font-bold font-sans">{t.play}</span>
                </button>
            </div>
        </div>
    );
};
