import { ComputerPart, Language } from './types';

// English Imports
import enMonitor1 from './audio/English/englishscreen1.mp3';
import enMonitor2 from './audio/English/englishscreen2.mp3';
import enKeyboard1 from './audio/English/EnglishKeyboard1.mp3';
import enKeyboard2 from './audio/English/EnglishKeyboard2.mp3';
import enMouse1 from './audio/English/EnglishMouse1.mp3';
import enMouse2 from './audio/English/EnglishMouse2.mp3';
import enTower1 from './audio/English/EnglishCentralUnit1.mp3';
import enTower2 from './audio/English/EnglishCentralUnit2.mp3';
import enSpeakers1 from './audio/English/EnglishSpeakers1.mp3';
import enSpeakers2 from './audio/English/EnglishSpeakers2.mp3';
import enPrinter1 from './audio/English/Englishprinter1.mp3';
import enPrinter2 from './audio/English/Englishprinter2.mp3';

// French Imports
import frMonitor1 from './audio/french/Lecran1.mp3';
import frMonitor2 from './audio/french/Lecran2.mp3';
import frKeyboard1 from './audio/french/Leclavier1.mp3';
import frKeyboard2 from './audio/french/Leclavier2.mp3';
import frMouse1 from './audio/french/Lasouris1.mp3';
import frMouse2 from './audio/french/Lasouris2.mp3';
import frTower1 from './audio/french/Lunitecentrale1.mp3';
// frTower2 is missing, we will fallback to 1 or null
import frSpeakers1 from './audio/french/hautparleur1.mp3';
import frSpeakers2 from './audio/french/hautparleur2.mp3'; // or Lhautparleur2.mp3 checking dir... using hautparleur2 based on list
import frPrinter1 from './audio/french/imprimante1.mp3';
import frPrinter2 from './audio/french/imprimante2.mp3';

// Arabic Imports
import arMonitor1 from './audio/arabic/arabicecran1.mp3';
import arMonitor2 from './audio/arabic/arabicecran2.mp3';
import arKeyboard1 from './audio/arabic/arabicclavier1.mp3';
import arKeyboard2 from './audio/arabic/arabicclavier2.mp3';
import arMouse1 from './audio/arabic/arabic-souris1.mp3';
import arMouse2 from './audio/arabic/arabic-souris2.mp3';
import arTower1 from './audio/arabic/arabicunitecentrale1.mp3';
import arTower2 from './audio/arabic/arabicunitecentrale2.mp3';
import arSpeakers1 from './audio/arabic/arabichautparleur1.mp3';
import arSpeakers2 from './audio/arabic/arabichautparleur2.mp3';
import arPrinter1 from './audio/arabic/arabicimprimante1.mp3';
import arPrinter2 from './audio/arabic/arabicimprimante2.mp3';

type AudioFiles = {
    name: string;
    description: string;
};

// Map: Part ID -> Language -> AudioFiles
export const AUDIO_MAP: Record<string, Record<Language, AudioFiles>> = {
    monitor: {
        en: { name: enMonitor1, description: enMonitor2 },
        fr: { name: frMonitor1, description: frMonitor2 },
        ar: { name: arMonitor1, description: arMonitor2 },
    },
    keyboard: {
        en: { name: enKeyboard1, description: enKeyboard2 },
        fr: { name: frKeyboard1, description: frKeyboard2 },
        ar: { name: arKeyboard1, description: arKeyboard2 },
    },
    mouse: {
        en: { name: enMouse1, description: enMouse2 },
        fr: { name: frMouse1, description: frMouse2 },
        ar: { name: arMouse1, description: arMouse2 },
    },
    tower: {
        en: { name: enTower1, description: enTower2 },
        fr: { name: frTower1, description: frTower1 }, // Fallback for missing file
        ar: { name: arTower1, description: arTower2 },
    },
    speakers: {
        en: { name: enSpeakers1, description: enSpeakers2 },
        fr: { name: frSpeakers1, description: frSpeakers2 },
        ar: { name: arSpeakers1, description: arSpeakers2 },
    },
    printer: {
        en: { name: enPrinter1, description: enPrinter2 },
        fr: { name: frPrinter1, description: frPrinter2 },
        ar: { name: arPrinter1, description: arPrinter2 },
    },
};
