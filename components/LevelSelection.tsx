import React from 'react';
import { ComputerLevel, Language, UI_TEXT } from '../types';
import { Monitor, CircuitBoard } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface LevelSelectionProps {
    language: Language;
    setLanguage: (l: Language) => void;
    onSelectLevel: (level: ComputerLevel) => void;
}

export const LevelSelection: React.FC<LevelSelectionProps> = ({ language, setLanguage, onSelectLevel }) => {
    const t = UI_TEXT[language];
    const isRTL = language === 'ar';

    return (
        <div className="flex flex-col items-center min-h-screen p-4 text-center animate-fade-in-up bg-gradient-to-br from-indigo-50 to-blue-100" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Language Selector */}
            <LanguageSelector language={language} setLanguage={setLanguage} className="mt-4 mb-6" />

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-kid-blue mb-4 drop-shadow-md tracking-wider font-sans">{t.title}</h1>
            <p className="text-2xl text-gray-600 max-w-lg font-sans leading-relaxed bg-white/50 p-4 rounded-xl mb-8">
                {language === 'fr' ? "Choisis ton niveau !" : language === 'en' ? "Choose your level!" : "اختر مستواك!"}
            </p>

            <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
                {/* Level 1: External */}
                <button
                    onClick={() => onSelectLevel('external')}
                    className="group relative flex-1 bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-8 border-blue-200"
                >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full font-bold shadow-lg">
                        {language === 'fr' ? "Débutant" : language === 'en' ? "Beginner" : "مبتدئ"}
                    </div>
                    <div className="bg-blue-50 rounded-full p-8 mb-6 inline-block group-hover:bg-blue-100 transition-colors">
                        <Monitor size={80} className="text-blue-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 font-sans">
                        {t.desk}
                    </h2>
                    <p className="text-gray-500 font-sans">
                        {language === 'fr' ? "Découvre l'ordinateur et ses amis (Clavier, Souris...)" :
                            language === 'en' ? "Discover the computer and friends (Keyboard, Mouse...)" :
                                "اكتشف الحاسوب وأصدقائه (لوحة المفاتيح، الفأرة...)"}
                    </p>
                </button>

                {/* Level 2: Internal */}
                <button
                    onClick={() => onSelectLevel('internal')}
                    className="group relative flex-1 bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-8 border-purple-200"
                >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-6 py-2 rounded-full font-bold shadow-lg">
                        {language === 'fr' ? "Expert" : language === 'en' ? "Expert" : "خبير"}
                    </div>
                    <div className="bg-purple-50 rounded-full p-8 mb-6 inline-block group-hover:bg-purple-100 transition-colors">
                        <CircuitBoard size={80} className="text-purple-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 font-sans">
                        {language === 'fr' ? "Dans la machine" : language === 'en' ? "Inside the Machine" : "داخل الآلة"}
                    </h2>
                    <p className="text-gray-500 font-sans">
                        {language === 'fr' ? "Explore l'unité centrale (Processeur, Carte Mère...)" :
                            language === 'en' ? "Explore inside the case (CPU, Motherboard...)" :
                                "اكتشف ما بداخل الوحدة المركزية (المعالج، اللوحة الأم...)"}
                    </p>
                </button>
            </div>
        </div>
    );
};
