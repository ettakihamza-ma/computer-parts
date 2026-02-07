import { LucideIcon } from 'lucide-react';

export type Language = 'fr' | 'en' | 'ar';

export enum AppView {
  HOME = 'HOME',
  LEARN = 'LEARN',
  PLAY_MENU = 'PLAY_MENU',
  GAME_FIND = 'GAME_FIND',
  GAME_MEMORY = 'GAME_MEMORY',
  DESK = 'DESK'
}

export enum ComponentType {
  INPUT = 'ENTRÉE',
  OUTPUT = 'SORTIE',
  PROCESSING = 'TRAITEMENT'
}

export interface ComputerPart {
  id: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  action: string;
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  // Local list of educational facts to rotate through
  facts: {
    fr: string[];
    en: string[];
    ar: string[];
  };
  type: ComponentType;
  iconName: string;
  color: string;
}

export interface QuizQuestion {
  question: string;
  correctPartId: string;
}

export const UI_TEXT = {
  fr: {
    title: "L'Ordi des Petits",
    subtitle: "Découvre les secrets de l'ordinateur !",
    learn: "Apprendre",
    play: "Jouer",
    touchObj: "Touche un objet !",
    score: "Score",
    question: "Montre-moi :",
    bravo: "Bravo !",
    tryAgain: "Essaie encore !",
    loading: "...",
    funFactBtn: "À quoi ça sert ?",
    error: "Oups !",
    gameFindTitle: "Cherche et Trouve",
    gameMemoryTitle: "Jeu de Mémoire",
    congrats: "Gagné !",
    desk: "Mon Bureau"
  },
  en: {
    title: "Little Computer",
    subtitle: "Discover computer secrets!",
    learn: "Learn",
    play: "Play",
    touchObj: "Touch an object!",
    score: "Score",
    question: "Show me:",
    bravo: "Great job!",
    tryAgain: "Try again!",
    loading: "...",
    funFactBtn: "What is it for?",
    error: "Oops!",
    gameFindTitle: "Find It!",
    gameMemoryTitle: "Memory Game",
    congrats: "You Won!",
    desk: "My Desk"
  },
  ar: {
    title: "حاسوب الصغار",
    subtitle: "اكتشف أسرار الحاسوب!",
    learn: "تَعلَّم",
    play: "الْعَب",
    touchObj: "المس شيئاً !",
    score: "النقاط",
    question: "أرني :",
    bravo: "أحسنت !",
    tryAgain: "حاول مرة أخرى !",
    loading: "...",
    funFactBtn: "ما فائدته ؟",
    error: "عفواً !",
    gameFindTitle: "ابحث وجد",
    gameMemoryTitle: "لعبة الذاكرة",
    congrats: "فزت !",
    desk: "مكتبي"
  }
};