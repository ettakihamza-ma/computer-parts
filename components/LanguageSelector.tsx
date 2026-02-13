import React from 'react';
import { Language } from '../types';

// SVG Flag Components
const FlagFR = () => (
    <svg width="28" height="20" viewBox="0 0 30 20" className="rounded-sm shadow-sm">
        <rect width="10" height="20" fill="#002395" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#ED2939" />
    </svg>
);

const FlagUS = () => (
    <svg width="28" height="20" viewBox="0 0 30 20" className="rounded-sm shadow-sm">
        <rect width="30" height="20" fill="#B22234" />
        <rect y="1.54" width="30" height="1.54" fill="white" />
        <rect y="4.62" width="30" height="1.54" fill="white" />
        <rect y="7.69" width="30" height="1.54" fill="white" />
        <rect y="10.77" width="30" height="1.54" fill="white" />
        <rect y="13.85" width="30" height="1.54" fill="white" />
        <rect y="16.92" width="30" height="1.54" fill="white" />
        <rect width="12" height="10.77" fill="#3C3B6E" />
    </svg>
);

const FlagMA = () => (
    <svg width="28" height="20" viewBox="0 0 30 20" className="rounded-sm shadow-sm">
        <rect width="30" height="20" fill="#C1272D" />
        <g transform="translate(-3 -8)">
            <path fill="#006233" d="M15.047 22.165l1.128-3.471l-2.953-2.145h3.649L18 13.074l1.129 3.474h3.649l-2.953 2.145l1.128 3.471L18 20.019l-2.953 2.146zm3.583-2.603l.916.665l-.35-1.077l-.566.412zm-1.826-.412l-.35 1.077l.916-.665l-.566-.412zm.241-.74l.955.694l.955-.694l-.365-1.122h-1.182l-.363 1.122zM15.5 17.288l.915.665l.216-.665H15.5zm3.869 0l.216.665l.915-.665h-1.131zm-1.019-.74L18 15.47l-.35 1.079h.7z" />
        </g>
    </svg>
);

interface LanguageSelectorProps {
    language: Language;
    setLanguage: (l: Language) => void;
    className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage, className = '' }) => (
    <div className={`flex gap-3 bg-white/60 p-2 rounded-2xl backdrop-blur-sm shadow-sm transition-all duration-300 ${className}`}>
        <button onClick={() => setLanguage('fr')} className={`p-2 rounded-xl transition-all transform hover:scale-110 flex flex-col items-center justify-center w-16 gap-1 ${language === 'fr' ? 'bg-white shadow-md ring-2 ring-kid-blue scale-110' : 'opacity-60 hover:opacity-100'}`}>
            <FlagFR />
            <span className="text-xs font-bold text-gray-500">FR</span>
        </button>
        <button onClick={() => setLanguage('en')} className={`p-2 rounded-xl transition-all transform hover:scale-110 flex flex-col items-center justify-center w-16 gap-1 ${language === 'en' ? 'bg-white shadow-md ring-2 ring-kid-blue scale-110' : 'opacity-60 hover:opacity-100'}`}>
            <FlagUS />
            <span className="text-xs font-bold text-gray-500">EN</span>
        </button>
        <button onClick={() => setLanguage('ar')} className={`p-2 rounded-xl transition-all transform hover:scale-110 flex flex-col items-center justify-center w-16 gap-1 ${language === 'ar' ? 'bg-white shadow-md ring-2 ring-kid-blue scale-110' : 'opacity-60 hover:opacity-100'}`}>
            <FlagMA />
            <span className="text-xs font-bold text-gray-500">ع</span>
        </button>
    </div>
);
