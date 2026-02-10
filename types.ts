import { LucideIcon } from 'lucide-react';

export type Language = 'fr' | 'en' | 'ar';

export type ComputerLevel = 'external' | 'internal';

export enum AppView {
  HOME = 'HOME',
  LEARN = 'LEARN',
  PLAY_MENU = 'play_menu',
  GAME_FIND = 'game_find',
  GAME_MEMORY = 'game_memory',
  GAME_WORDSEARCH = 'game_wordsearch',
  GAME_ROBOT = 'game_robot',
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
  // Short single-word name for word search grid (when full name is too long)
  wordSearchName?: {
    fr: string;
    en: string;
    ar: string;
  };
}

export interface QuizQuestion {
  question: string;
  correctPartId: string;
}

export const UI_TEXT = {
  fr: {
    title: "Explorateur Numérique",
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
    title: "Digital Explorer",
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
    title: "المستكشف الرقمي",
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