import React, { useState, useEffect, useRef } from 'react';
import { ComputerPart, Language, UI_TEXT } from '../types';
import { getIcon } from '../constants';
import { playLocalAudio } from '../services/audioService';
import { ArrowLeft, ArrowRight, Clock, HelpCircle } from 'lucide-react';

interface MemoryCard {
    id: string;
    partId: string;
    isFlipped: boolean;
    isMatched: boolean;
}

interface MemoryGameProps {
    parts: ComputerPart[];
    language: Language;
    onBack: () => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ parts, language, onBack }) => {
    const [cards, setCards] = useState<MemoryCard[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [solved, setSolved] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef<number>(Date.now());

    const t = UI_TEXT[language];
    const isRTL = language === 'ar';
    const BackIcon = isRTL ? ArrowRight : ArrowLeft;

    const startNewGame = () => {
        // 1. Duplicate parts to make pairs
        const deck = [...parts, ...parts];

        // 2. Shuffle
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        // 3. Create Cards
        const newCards: MemoryCard[] = deck.map((part, index) => ({
            id: `card-${index}`,
            partId: part.id,
            isFlipped: false,
            isMatched: false
        }));

        setCards(newCards);
        setFlippedIndices([]);
        setSolved(false);
        setIsProcessing(false);
        setElapsedTime(0);
        startTimeRef.current = Date.now();

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
    };

    useEffect(() => {
        startNewGame();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleCardClick = (index: number) => {
        if (isProcessing || cards[index].isFlipped || cards[index].isMatched) return;

        // Play Sound
        const part = parts.find(p => p.id === cards[index].partId);
        if (part) {
            playLocalAudio(part.id, language, 'name');
        }

        // Flip
        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);

        // Check Match
        if (newFlipped.length === 2) {
            setIsProcessing(true);
            const card1 = newCards[newFlipped[0]];
            const card2 = newCards[newFlipped[1]];

            if (card1.partId === card2.partId) {
                // MATCH
                setTimeout(() => {
                    setCards(prev => prev.map(c =>
                        (c.id === card1.id || c.id === card2.id) ? { ...c, isMatched: true } : c
                    ));
                    setFlippedIndices([]);
                    setIsProcessing(false);

                    // Check Win
                    const remaining = newCards.filter(c => !c.isMatched && c.id !== card1.id && c.id !== card2.id);
                    if (remaining.length === 0) {
                        setSolved(true);
                        if (timerRef.current) clearInterval(timerRef.current);
                    }
                }, 800);
            } else {
                // NO MATCH
                setTimeout(() => {
                    setCards(prev => prev.map(c =>
                        (c.id === card1.id || c.id === card2.id) ? { ...c, isFlipped: false } : c
                    ));
                    setFlippedIndices([]);
                    setIsProcessing(false);
                }, 1500);
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (solved) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="text-9xl mb-8 animate-bounce">🏆</div>
                <h2 className="text-5xl font-bold mb-4 text-center font-sans text-purple-600">{t.congrats}</h2>
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-600 mb-6 bg-white/80 px-6 py-3 rounded-2xl">
                    <span>⏱️</span>
                    <span>{formatTime(elapsedTime)}</span>
                </div>
                <button
                    onClick={startNewGame}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-3xl shadow-xl text-2xl font-bold"
                >
                    {t.play}
                </button>
                <button
                    onClick={onBack}
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
                <button
                    onClick={onBack}
                    className={`absolute ${isRTL ? 'right-0' : 'left-0'} p-3 bg-white rounded-full shadow hover:bg-gray-50 z-20`}
                    dir="ltr"
                >
                    <BackIcon size={24} />
                </button>
                <h2 className="text-3xl font-bold text-gray-700 font-sans">{t.gameMemoryTitle}</h2>
                <div className="text-lg font-bold text-gray-500 flex items-center gap-1">
                    <Clock size={18} />
                    <span>{formatTime(elapsedTime)}</span>
                </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl w-full mb-8">
                {cards.map((card, index) => {
                    const part = parts.find(p => p.id === card.partId);
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
                            {/* Back */}
                            <div className={`
                   absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl border-4 border-white shadow-md flex items-center justify-center
                   ${(card.isFlipped || card.isMatched) ? 'hidden' : 'block'}
                `}>
                                <HelpCircle className="text-white/30" size={48} />
                            </div>

                            {/* Front */}
                            <div className={`
                   absolute inset-0 ${part.color} rounded-2xl border-4 border-white shadow-md flex flex-col items-center justify-center
                   ${(card.isFlipped || card.isMatched) ? 'block' : 'hidden'}
                `}>
                                {getIcon(part.iconName, 48, "text-white")}
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
