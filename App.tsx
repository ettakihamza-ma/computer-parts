import React, { useState, useEffect, useRef } from 'react';
import { AppView, ComputerPart, Language, UI_TEXT, ComputerLevel } from './types';
import { EXTERNAL_PARTS, INTERNAL_PARTS, getPartsForLevel, getIcon } from './constants';
import { playLocalAudio } from './services/audioService';
import { ArrowLeft, ArrowRight, Monitor, Gamepad2, Volume2, Search, Brain, HelpCircle, CircuitBoard, HardDrive, Clock } from 'lucide-react';
import { DeskMonitor, DeskKeyboard, DeskMouse, DeskTower, DeskSpeaker, DeskPrinter } from './components/DeskParts';
import { InternalMotherboard, InternalCPU, InternalRAM, InternalGPU, InternalPSU, InternalHDD, InternalFan } from './components/InternalParts';
import { WordSearchGame } from './components/WordSearchGame';
import { SaveTheRobotGame } from './components/SaveTheRobotGame';

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

const LanguageSelector = ({ language, setLanguage, className = '' }: { language: Language; setLanguage: (l: Language) => void; className?: string }) => (
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

// Interface for Memory Card
interface MemoryCard {
  id: string; // unique instance id
  partId: string; // reference to computer part
  isFlipped: boolean;
  isMatched: boolean;
}

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<ComputerLevel | null>(null);
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [language, setLanguage] = useState<Language>('fr');

  const currentParts = currentLevel ? getPartsForLevel(currentLevel) : EXTERNAL_PARTS;

  // Learn Mode State
  const [selectedPart, setSelectedPart] = useState<ComputerPart | null>(null);

  // Audio State
  const [loadingAudio, setLoadingAudio] = useState(false);

  // Animation State
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  // --- GAME STATES ---

  // Game 1: Find It (Randomized)
  const [findGameTarget, setFindGameTarget] = useState<ComputerPart | null>(null);
  const [findGameScore, setFindGameScore] = useState(0);
  const [findGameFeedback, setFindGameFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [shuffledFindParts, setShuffledFindParts] = useState<ComputerPart[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  // Game 2: Memory
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]); // Store indices
  const [memorySolved, setMemorySolved] = useState(false);
  const [isProcessingMatch, setIsProcessingMatch] = useState(false);
  const [memoryElapsedTime, setMemoryElapsedTime] = useState(0);
  const memoryStartTimeRef = useRef<number>(Date.now());
  const memoryTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = UI_TEXT[language];
  const isRTL = language === 'ar';
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  // --- LEVEL SELECTION ---
  const handleLevelSelect = (level: ComputerLevel) => {
    setCurrentLevel(level);
    setView(AppView.HOME);
  };

  const goLevelSelection = () => {
    setCurrentLevel(null);
    setView(AppView.HOME);
    setMemorySolved(false); // Reset game states too
    setFindGameScore(0);
  };

  // --- AUDIO HELPER ---
  const handleSpeak = async (partId: string, type: 'name' | 'description' = 'name') => {
    setLoadingAudio(true);
    await playLocalAudio(partId, language, type);
    setLoadingAudio(false);
  };

  // --- VIEW NAVIGATION ---
  const goHome = () => {
    setView(AppView.HOME);
    setSelectedPart(null);
  };

  const goPlayMenu = () => {
    setView(AppView.PLAY_MENU);
  };

  // --- FIND GAME LOGIC (RANDOMIZED) ---
  const shuffleFindParts = () => {
    const arr = [...currentParts];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const startFindGame = () => {
    setFindGameScore(0);
    setShuffledFindParts(shuffleFindParts());
    pickNewFindTarget();
    setView(AppView.GAME_FIND);
  };

  const pickNewFindTarget = (previousTargetId?: string) => {
    let options = currentParts;
    // Try to pick a different one than before if possible
    if (previousTargetId) {
      options = currentParts.filter(p => p.id !== previousTargetId);
    }
    const randomPart = options[Math.floor(Math.random() * options.length)];
    setFindGameTarget(randomPart);
    setFindGameFeedback(null);

    // Announce the new target
    // Small delay to allow render transition
    setTimeout(() => {
      handleSpeak(randomPart.id, 'name');
    }, 500);
  };

  const handleFindAnswer = (partId: string) => {
    if (!findGameTarget) return;

    if (partId === findGameTarget.id) {
      setFindGameScore(s => s + 1);
      setFindGameFeedback('correct');
      playLocalAudio('good_answer', language);

      setTimeout(() => {
        // Trigger shuffle animation
        setIsShuffling(true);
        setTimeout(() => {
          setShuffledFindParts(shuffleFindParts());
          setIsShuffling(false);
          pickNewFindTarget(findGameTarget.id);
        }, 400);
      }, 1200);
    } else {
      setFindGameFeedback('wrong');
      setTimeout(() => {
        setFindGameFeedback(null);
      }, 1000);
    }
  };

  // --- MEMORY GAME LOGIC ---
  const startMemoryGame = () => {
    // 1. Duplicate parts to make pairs
    const deck = [...currentParts, ...currentParts];

    // 2. Shuffle (Fisher-Yates)
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // 3. Create Card Objects
    const cards: MemoryCard[] = deck.map((part, index) => ({
      id: `card-${index}`,
      partId: part.id,
      isFlipped: false,
      isMatched: false
    }));

    setMemoryCards(cards);
    setFlippedCards([]);
    setMemorySolved(false);
    setIsProcessingMatch(false);
    setMemoryElapsedTime(0);
    memoryStartTimeRef.current = Date.now();
    if (memoryTimerRef.current) clearInterval(memoryTimerRef.current);
    memoryTimerRef.current = setInterval(() => {
      setMemoryElapsedTime(Math.floor((Date.now() - memoryStartTimeRef.current) / 1000));
    }, 1000);
    setView(AppView.GAME_MEMORY);
  };

  const handleCardClick = (index: number) => {
    // Block interaction if processing a match check or if card invalid
    if (isProcessingMatch || memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    // 1. Play Sound of the object immediately on click
    const part = currentParts.find(p => p.id === memoryCards[index].partId);
    if (part) {
      handleSpeak(part.id, 'name');
    }

    // 2. Flip the card visually
    const newCards = [...memoryCards];
    newCards[index].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    // 3. Check for Match if 2 cards selected
    if (newFlipped.length === 2) {
      setIsProcessingMatch(true);
      const card1 = newCards[newFlipped[0]];
      const card2 = newCards[newFlipped[1]];

      if (card1.partId === card2.partId) {
        // MATCH!
        setTimeout(() => {
          // No 'Bravo' audio
          setMemoryCards(prev => prev.map(c =>
            (c.id === card1.id || c.id === card2.id)
              ? { ...c, isMatched: true }
              : c
          ));
          setFlippedCards([]);
          setIsProcessingMatch(false);

          // Check win condition
          const remaining = newCards.filter(c => !c.isMatched && c.id !== card1.id && c.id !== card2.id);
          if (remaining.length === 0) {
            setMemorySolved(true);
            if (memoryTimerRef.current) clearInterval(memoryTimerRef.current);
            const finalTime = Math.floor((Date.now() - memoryStartTimeRef.current) / 1000);
            setMemoryElapsedTime(finalTime);
            // No 'Congrats' audio
          }
        }, 800);
      } else {
        // NO MATCH - Flip back
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c =>
            (c.id === card1.id || c.id === card2.id)
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
          setIsProcessingMatch(false);
        }, 1500);
      }
    }
  };

  // --- LEARN ACTIONS ---
  const handlePartClick = (part: ComputerPart) => {
    // Trigger animation
    setAnimatingId(part.id);
    handleSpeak(part.id, 'name');

    // Wait for animation then navigate
    setTimeout(() => {
      setSelectedPart(part);
      setAnimatingId(null);
    }, 600);
  };

  // Cleanup memory timer on unmount
  useEffect(() => {
    return () => {
      if (memoryTimerRef.current) clearInterval(memoryTimerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- RENDERERS ---

  const renderLevelSelection = () => (
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
          onClick={() => handleLevelSelect('external')}
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
          onClick={() => handleLevelSelect('internal')}
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

  const renderHome = () => (
    <div className="flex flex-col items-center min-h-screen p-4 text-center animate-fade-in-up bg-gradient-to-b from-blue-50 to-blue-100" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Top Bar: Back + Flags */}
      <div className="flex items-center justify-between w-full mt-2 mb-4">
        <button
          onClick={goLevelSelection}
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
          onClick={() => setView(AppView.LEARN)}
          className="bg-kid-green hover:bg-green-400 text-white p-8 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-64 border-b-8 border-green-600 group"
        >
          <Monitor size={64} className="mb-4 group-hover:rotate-6 transition-transform" />
          <span className="text-3xl font-bold font-sans">{t.learn}</span>
        </button>

        <button
          onClick={() => setView(AppView.DESK)}
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
          onClick={goPlayMenu}
          className="bg-kid-orange hover:bg-pink-400 text-white p-8 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-64 border-b-8 border-pink-600 group"
        >
          <Gamepad2 size={64} className="mb-4 group-hover:rotate-12 transition-transform" />
          <span className="text-3xl font-bold font-sans">{t.play}</span>
        </button>
      </div>
    </div>
  );

  const renderPlayMenu = () => (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[#f0f9ff] animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
      <button
        onClick={goHome}
        className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} p-3 bg-white rounded-full shadow hover:bg-gray-50 z-20`}
        dir="ltr"
      >
        <BackIcon size={32} />
      </button>

      <h2 className="text-4xl md:text-5xl font-bold text-kid-blue mb-12 font-sans">{t.play}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl">
        {/* Game 1: Find It */}
        <button
          onClick={startFindGame}
          className="bg-blue-400 hover:bg-blue-300 text-white p-6 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-full border-b-8 border-blue-600 group"
        >
          <Search size={48} className="mb-4 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold font-sans">{t.gameFindTitle}</span>
        </button>

        {/* Game 2: Memory */}
        <button
          onClick={startMemoryGame}
          className="bg-purple-400 hover:bg-purple-300 text-white p-6 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-full border-b-8 border-purple-600 group"
        >
          <Brain size={48} className="mb-4 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold font-sans">{t.gameMemoryTitle}</span>
        </button>

        {/* Game 3: Word Search */}
        <button
          onClick={() => setView(AppView.GAME_WORDSEARCH)}
          className="bg-green-400 hover:bg-green-300 text-white p-6 rounded-3xl shadow-xl transform transition hover:scale-105 flex flex-col items-center w-full border-b-8 border-green-600 group"
        >
          <ArrowRight size={48} className="mb-4 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold font-sans">
            {language === 'fr' ? 'Mots Mêlés' : language === 'en' ? 'Word Search' : 'كلمات متقاطعة'}
          </span>
        </button>

        {/* Game 4: Save the Robot */}
        <button
          onClick={() => setView(AppView.GAME_ROBOT)}
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

  const renderLearn = () => {
    // Note: Inline Learn implementation inside App function to access state
    if (selectedPart) {
      return (
        <div className="min-h-screen p-4 flex flex-col items-center bg-white animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Detailed Learn View Back Button */}
          <button
            onClick={() => setSelectedPart(null)}
            className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors z-20`}
            dir="ltr"
          >
            <BackIcon size={32} />
          </button>

          <div className={`mt-16 p-8 rounded-3xl ${selectedPart.color} shadow-2xl max-w-2xl w-full text-white text-center border-b-8 border-black/20`}>
            <div className="flex justify-center mb-6">{getIcon(selectedPart.iconName, 120, "drop-shadow-lg wiggle")}</div>
            <div className="flex justify-center items-center mb-6">
              <button onClick={() => handleSpeak(selectedPart.id, 'name')} className="flex items-center gap-4 hover:scale-105 transition-transform bg-black/10 px-6 py-3 rounded-2xl">
                <h2 className="text-5xl md:text-6xl font-bold cursor-pointer font-sans">{selectedPart.name[language]}</h2>
                <div className="bg-white/20 p-2 rounded-full">
                  {loadingAudio ? (<div className="h-8 w-8 flex items-center justify-center"><span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-white opacity-75"></span><Volume2 className="text-white relative" size={40} /></div>) : (<Volume2 className="text-white" size={40} />)}
                </div>
              </button>
            </div>

            <div className="bg-white/90 text-gray-800 p-6 rounded-2xl mb-6 text-left shadow-inner cursor-pointer hover:bg-white transition" onClick={() => handleSpeak(selectedPart.id, 'description')}>
              <div className="flex items-start gap-4">
                <Volume2 className="text-kid-blue shrink-0 mt-1" size={32} />
                <p className="text-2xl leading-relaxed font-medium font-sans">{selectedPart.description[language]}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 text-left">
              {selectedPart.facts[language].slice(0, 2).map((fact, i) => (
                <div key={i} className="bg-white/20 p-4 rounded-xl backdrop-blur-sm border-2 border-white/30">
                  <p className="font-sans text-lg font-bold">★ {fact}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen p-6 animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="relative flex items-center justify-center mb-8">
          {/* Learn Grid Back Button */}
          <button
            onClick={goHome}
            className={`absolute ${isRTL ? 'right-0' : 'left-0'} p-3 bg-white rounded-full shadow hover:bg-gray-50 transition-transform hover:scale-110 z-20`}
            dir="ltr"
          >
            <BackIcon size={24} />
          </button>
          <h2 className="text-4xl font-bold text-gray-800 font-sans">{t.touchObj}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pt-8 mb-8">
          {currentParts.map((part) => (
            <div key={part.id} onClick={() => handlePartClick(part)} className={`${part.color} p-6 rounded-3xl shadow-lg cursor-pointer border-b-8 border-black/10 flex flex-col items-center justify-center h-64 ${animatingId === part.id ? 'animate-pop-bounce ring-4 ring-white ring-offset-4 ring-offset-blue-50' : 'transform transition hover:scale-105 hover:rotate-1'}`}>
              <div className="bg-white/20 p-6 rounded-full mb-4">{getIcon(part.iconName, 64, "text-white")}</div>
              <span className="text-3xl font-bold text-white tracking-wide font-sans">{part.name[language]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFindGame = () => {
    // Fallback if target is null (shouldn't happen)
    if (!findGameTarget) return null;

    if (findGameFeedback) {
      return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${findGameFeedback === 'correct' ? 'bg-green-100' : 'bg-red-100'} animate-fade-in-up`} dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="text-9xl mb-8 animate-bounce">{findGameFeedback === 'correct' ? '🎉' : '🤔'}</div>
          <h2 className="text-5xl font-bold mb-4 text-center font-sans">{findGameFeedback === 'correct' ? t.bravo : t.tryAgain}</h2>
        </div>
      );
    }

    return (
      <div className="min-h-screen p-6 flex flex-col max-w-4xl mx-auto animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="relative flex items-center justify-center mb-8">
          {/* Find Game Back Button */}
          <button
            onClick={goPlayMenu}
            className={`absolute ${isRTL ? 'right-0' : 'left-0'} p-3 bg-white rounded-full shadow hover:bg-gray-50 z-20`}
            dir="ltr"
          >
            <BackIcon size={24} />
          </button>
          <div className="bg-white px-6 py-2 rounded-full shadow font-bold text-2xl text-kid-blue font-sans">{t.score}: {findGameScore}</div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl text-center mb-12 border-b-8 border-gray-200 mt-8">
          <p className="text-2xl text-gray-500 mb-2 uppercase tracking-widest font-bold font-sans">{t.question}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight font-sans">
            <span className="text-kid-blue underline decoration-wavy">{findGameTarget.name[language]}</span>
          </h2>
          <button onClick={() => handleSpeak(findGameTarget.id, 'name')} className="mt-6 p-4 bg-blue-100 rounded-full hover:bg-blue-200 text-blue-600 transition">
            {loadingAudio ? (<div className="h-8 w-8 flex items-center justify-center"><span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-blue-600 opacity-75"></span><Volume2 size={32} /></div>) : (<Volume2 size={32} />)}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {shuffledFindParts.map((part) => (
            <button
              key={part.id}
              onClick={() => handleFindAnswer(part.id)}
              className={`${part.color} p-6 rounded-2xl shadow-md hover:opacity-90 transform transition-all duration-300 active:scale-95 flex justify-center items-center h-32 border-b-4 border-black/10 ${isShuffling ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
            >
              {getIcon(part.iconName, 48, "text-white")}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderMemoryGame = () => {
    if (memorySolved) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="text-9xl mb-8 animate-bounce">🏆</div>
          <h2 className="text-5xl font-bold mb-4 text-center font-sans text-purple-600">{t.congrats}</h2>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-600 mb-6 bg-white/80 px-6 py-3 rounded-2xl">
            <span>⏱️</span>
            <span>{formatTime(memoryElapsedTime)}</span>
          </div>
          <button
            onClick={startMemoryGame}
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-3xl shadow-xl text-2xl font-bold"
          >
            {t.play}
          </button>
          <button
            onClick={goPlayMenu}
            className="mt-4 text-purple-400 hover:text-purple-600 font-bold"
          >
            {t.gameFindTitle}
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-screen p-4 flex flex-col items-center bg-[#f0f9ff] animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="relative w-full max-w-4xl flex items-center justify-center mb-6">
          {/* Memory Game Back Button */}
          <button
            onClick={goPlayMenu}
            className={`absolute ${isRTL ? 'right-0' : 'left-0'} p-3 bg-white rounded-full shadow hover:bg-gray-50 z-20`}
            dir="ltr"
          >
            <BackIcon size={24} />
          </button>
          <h2 className="text-3xl font-bold text-gray-700 font-sans">{t.gameMemoryTitle}</h2>
          <div className="text-lg font-bold text-gray-500 flex items-center gap-1">
            <Clock size={18} />
            <span>{formatTime(memoryElapsedTime)}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl w-full mb-8">
          {memoryCards.map((card, index) => {
            const part = currentParts.find(p => p.id === card.partId);
            if (!part) return null;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`
                  relative h-32 md:h-40 rounded-2xl cursor-pointer transition-all duration-300 transform preserve-3d
                  ${card.isFlipped || card.isMatched ? 'rotate-y-180' : 'hover:scale-105'}
                `}
                style={{ perspective: '1000px' }}
              >
                {/* Back of Card (Face Down) */}
                <div className={`
                   absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl border-4 border-white shadow-md flex items-center justify-center
                   ${(card.isFlipped || card.isMatched) ? 'hidden' : 'block'}
                `}>
                  <HelpCircle className="text-white/30" size={48} />
                </div>

                {/* Front of Card (Face Up) */}
                <div className={`
                   absolute inset-0 ${part.color} rounded-2xl border-4 border-white shadow-md flex flex-col items-center justify-center
                   ${(card.isFlipped || card.isMatched) ? 'block' : 'hidden'}
                `}>
                  {getIcon(part.iconName, 48, "text-white")}
                  {/* Optional: Show text on card if matched to reinforce learning */}
                  {card.isMatched && (
                    <span className="text-white font-bold text-sm mt-2">{part.name[language]}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDesk = () => {
    // Percentage-based click zones for responsiveness
    // These need to be fine-tuned based on the actual image layout
    // Component-based approach - no click zones needed


    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[#f0f9ff] animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Back Button */}
        <button
          onClick={goHome}
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
            onClick={() => {
              const part = currentParts.find(p => p.id === 'monitor');
              if (part) { setSelectedPart(part); handleSpeak(part.id, 'name'); }
            }}
            style={{ top: '15%', left: '35%', width: '30%', height: '45%' }}
          />

          {/* Tower (Central Unit) */}
          <DeskTower
            onClick={() => {
              const part = currentParts.find(p => p.id === 'tower');
              if (part) { setSelectedPart(part); handleSpeak(part.id, 'name'); }
            }}
            style={{ top: '35%', left: '4%', width: '15%', height: '50%' }}
          />

          {/* Keyboard */}
          <DeskKeyboard
            onClick={() => {
              const part = currentParts.find(p => p.id === 'keyboard');
              if (part) { setSelectedPart(part); handleSpeak(part.id, 'name'); }
            }}
            style={{ top: '65%', left: '35%', width: '30%', height: '15%' }}
          />

          {/* Mouse */}
          <DeskMouse
            onClick={() => {
              const part = currentParts.find(p => p.id === 'mouse');
              if (part) { setSelectedPart(part); handleSpeak(part.id, 'name'); }
            }}
            style={{ top: '68%', left: '68%', width: '5%', height: '10%' }}
          />

          {/* Speakers */}
          <DeskSpeaker
            onClick={() => {
              const part = currentParts.find(p => p.id === 'speakers');
              if (part) { setSelectedPart(part); handleSpeak(part.id, 'name'); }
            }}
            style={{ top: '40%', left: '25%', width: '8%', height: '20%' }}
          />
          <DeskSpeaker
            onClick={() => {
              const part = currentParts.find(p => p.id === 'speakers');
              if (part) { setSelectedPart(part); handleSpeak(part.id, 'name'); }
            }}
            style={{ top: '40%', left: '67%', width: '8%', height: '20%' }}
          />

          {/* Printer */}
          <DeskPrinter
            onClick={() => {
              const part = currentParts.find(p => p.id === 'printer');
              if (part) { setSelectedPart(part); handleSpeak(part.id, 'name'); }
            }}
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

  const renderInternalView = () => (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-gray-900 animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Back Button */}
      <button
        onClick={goHome}
        className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} p-3 bg-white/20 text-white rounded-full shadow hover:bg-white/30 z-20`}
        dir="ltr"
      >
        <BackIcon size={32} />
      </button>

      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">
        {language === 'fr' ? "L'Unité Centrale" : language === 'en' ? "Central Unit" : "الوحدة المركزية"}
      </h2>

      <div className="relative w-full max-w-5xl aspect-video bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-700">
        {/* Case Background */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        {/* --- Components --- */}

        {/* Motherboard (Background for components) */}
        <InternalMotherboard
          onClick={() => { const p = currentParts.find(x => x.id === 'motherboard'); if (p) { setSelectedPart(p); handleSpeak(p.id, 'name'); } }}
          style={{ top: '5%', left: '5%', width: '90%', height: '90%' }}
        />

        {/* CPU */}
        <InternalCPU
          onClick={() => { const p = currentParts.find(x => x.id === 'cpu'); if (p) { setSelectedPart(p); handleSpeak(p.id, 'name'); } }}
          style={{ top: '40%', left: '42%', width: '16%', height: '22%' }}
        />

        {/* Fan (Offset to show CPU partly) */}
        <InternalFan
          onClick={() => { const p = currentParts.find(x => x.id === 'fan'); if (p) { setSelectedPart(p); handleSpeak(p.id, 'name'); } }}
          style={{ top: '36%', left: '44%', width: '16%', height: '22%', zIndex: 30 }}
        />

        {/* RAM */}
        <InternalRAM
          onClick={() => { const p = currentParts.find(x => x.id === 'ram'); if (p) { setSelectedPart(p); handleSpeak(p.id, 'name'); } }}
          style={{ top: '15%', left: '65%', width: '10%', height: '40%' }}
        />

        {/* GPU */}
        <InternalGPU
          onClick={() => { const p = currentParts.find(x => x.id === 'gpu'); if (p) { setSelectedPart(p); handleSpeak(p.id, 'name'); } }}
          style={{ top: '65%', left: '15%', width: '60%', height: '25%' }}
        />

        {/* PSU */}
        <InternalPSU
          onClick={() => { const p = currentParts.find(x => x.id === 'psu'); if (p) { setSelectedPart(p); handleSpeak(p.id, 'name'); } }}
          style={{ top: '70%', left: '80%', width: '15%', height: '25%' }}
        />

        {/* HDD */}
        <InternalHDD
          onClick={() => { const p = currentParts.find(x => x.id === 'hdd'); if (p) { setSelectedPart(p); handleSpeak(p.id, 'name'); } }}
          style={{ top: '10%', left: '80%', width: '15%', height: '25%' }}
        />

        {/* Label Display (Overlay) */}
        {selectedPart && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl animate-bounce-in border-4 border-emerald-500 z-50">
            <span className={`text-4xl font-bold text-white`}>
              {selectedPart.name[language]}
            </span>
          </div>
        )}
      </div>
      <p className="mt-8 text-xl text-gray-400 font-sans animate-pulse">{t.touchObj}</p>
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-[#f0f9ff]">
      {!currentLevel ? renderLevelSelection() : (
        <>
          {view === AppView.HOME && renderHome()}
          {view === AppView.LEARN && renderLearn()}
          {view === AppView.DESK && (currentLevel === 'internal' ? renderInternalView() : renderDesk())}
          {view === AppView.PLAY_MENU && renderPlayMenu()}
          {view === AppView.GAME_FIND && renderFindGame()}
          {view === AppView.GAME_MEMORY && renderMemoryGame()}
          {view === AppView.GAME_WORDSEARCH && (
            <WordSearchGame
              parts={currentParts}
              language={language}
              onBack={goPlayMenu}
            />
          )}
          {view === AppView.GAME_ROBOT && (
            <SaveTheRobotGame
              parts={currentParts}
              language={language}
              onBack={goPlayMenu}
            />
          )}
        </>
      )}

      {/* Footer */}
      <div className="fixed bottom-2 w-full text-center text-gray-400 text-sm font-bold pointer-events-none z-50 mix-blend-multiply opacity-70">
        With ❤️ By <a href="https://www.linkedin.com/in/ettaki/" target="_blank" rel="noopener noreferrer" className="hover:text-kid-blue pointer-events-auto">Hamza Ettaki</a>
      </div>
    </div>
  );
}