import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowLeft, RefreshCw, Check, Star, Clock } from 'lucide-react';
import { ComputerPart } from '../types';
import { playLocalAudio } from '../services/audioService';

interface WordSearchGameProps {
    parts: ComputerPart[];
    language: 'fr' | 'en' | 'ar';
    onBack: () => void;
}

const GRID_SIZE = 10;

export const WordSearchGame: React.FC<WordSearchGameProps> = ({ parts, language, onBack }) => {
    const [grid, setGrid] = useState<string[][]>([]);
    const [words, setWords] = useState<{ word: string; displayWord: string; found: boolean; partId: string }[]>([]);
    const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
    const [foundCells, setFoundCells] = useState<{ r: number; c: number }[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const startTimeRef = useRef<number>(Date.now());
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Normalize words for the grid (remove accents, spaces, uppercase)
    const normalize = (str: string) => {
        if (language === 'ar') {
            // For Arabic: remove spaces, tashkeel diacritics, and normalize hamza variants
            return str
                .replace(/[\u0610-\u061A\u064B-\u065F\u0670]/g, '') // Remove tashkeel/diacritics
                .replace(/[أإآ]/g, 'ا') // Normalize all hamza-on-alef variants to plain alef
                .replace(/[^\u0600-\u06FF]/g, ''); // Keep only Arabic characters
        } else {
            // For French/English: remove accents and keep only letters
            return str
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z]/g, '')
                .toUpperCase();
        }
    };

    // For Arabic: use only plain alef (no hamza variants) to avoid confusion
    const alphabet = language === 'ar'
        ? 'ابتثجحخدذرزسشصضطظعغفقكلمنهوية'
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    useEffect(() => {
        startNewGame();
    }, [language]);

    const startNewGame = () => {
        // 1. Select words — use wordSearchName if available, otherwise name
        const gameWords = parts.map(p => {
            const rawName = p.wordSearchName?.[language] || p.name[language];
            const normalized = normalize(rawName);
            return {
                word: normalized,
                displayWord: rawName,
                found: false,
                partId: p.id
            };
        }).filter(w => w.word.length > 0 && w.word.length <= GRID_SIZE); // Ensure words fit

        // 2. Initialize empty grid
        const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));

        // 3. Place words
        const placedWords: typeof gameWords = [];

        for (const wordObj of gameWords) {
            let placed = false;
            let attempts = 0;
            while (!placed && attempts < 100) {
                const direction = Math.random() > 0.5 ? 'H' : 'V'; // Horizontal or Vertical
                const r = Math.floor(Math.random() * (GRID_SIZE - (direction === 'V' ? wordObj.word.length : 0)));
                const c = Math.floor(Math.random() * (GRID_SIZE - (direction === 'H' ? wordObj.word.length : 0)));

                let fits = true;
                for (let i = 0; i < wordObj.word.length; i++) {
                    const char = wordObj.word[i];
                    const cellContent = newGrid[direction === 'V' ? r + i : r][direction === 'H' ? c + i : c];
                    if (cellContent !== '' && cellContent !== char) {
                        fits = false;
                        break;
                    }
                }

                if (fits) {
                    for (let i = 0; i < wordObj.word.length; i++) {
                        newGrid[direction === 'V' ? r + i : r][direction === 'H' ? c + i : c] = wordObj.word[i];
                    }
                    placedWords.push(wordObj);
                    placed = true;
                }
                attempts++;
            }
        }

        // 4. Fill empty cells
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (newGrid[r][c] === '') {
                    newGrid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
                }
            }
        }

        setGrid(newGrid);
        setWords(placedWords);
        setScore(0);
        setGameOver(false);
        setFoundCells([]);
        setSelectedCells([]);
        setElapsedTime(0);
        startTimeRef.current = Date.now();
        // Start live timer
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        playLocalAudio('start_game', language);
    };

    const handleCellClick = (r: number, c: number) => {
        if (gameOver) return;

        // Check if cell is already selected
        const isSelected = selectedCells.some(cell => cell.r === r && cell.c === c);

        let newSelection;
        if (isSelected) {
            newSelection = selectedCells.filter(cell => cell.r !== r || cell.c !== c);
        } else {
            newSelection = [...selectedCells, { r, c }];
        }

        setSelectedCells(newSelection);
        checkSelection(newSelection);
    };

    const checkSelection = (selection: { r: number; c: number }[]) => {
        if (selection.length < 2) return;

        // Sort selection by position to allow clicking in any order
        const allSameRow = selection.every(cell => cell.r === selection[0].r);
        const allSameCol = selection.every(cell => cell.c === selection[0].c);

        if (!allSameRow && !allSameCol) {
            return;
        }

        // Sort by column (horizontal) or row (vertical)
        const sortedSelection = [...selection].sort((a, b) => {
            if (allSameRow) return a.c - b.c;
            return a.r - b.r;
        });

        // Check if cells are consecutive
        let isConsecutive = true;
        for (let i = 1; i < sortedSelection.length; i++) {
            const prev = sortedSelection[i - 1];
            const curr = sortedSelection[i];
            if (allSameRow && curr.c - prev.c !== 1) isConsecutive = false;
            if (allSameCol && curr.r - prev.r !== 1) isConsecutive = false;
        }

        if (!isConsecutive) return;

        // Build word from sorted selection
        const selectedString = sortedSelection.map(pos => grid[pos.r][pos.c]).join('');
        const reverseWord = selectedString.split('').reverse().join('');

        const match = words.find(w => !w.found && (w.word === selectedString || w.word === reverseWord));

        if (match) {
            // Word found!
            const newWords = words.map(w => w.word === match.word ? { ...w, found: true } : w);
            setWords(newWords);
            setFoundCells([...foundCells, ...selection]);
            setSelectedCells([]);
            setScore(prev => prev + 1);
            playLocalAudio('good_answer', language);

            // Play part audio
            playLocalAudio(match.partId, language);

            if (newWords.every(w => w.found)) {
                setGameOver(true);
                if (timerRef.current) clearInterval(timerRef.current);
                const finalTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
                setElapsedTime(finalTime);
                playLocalAudio('game_won', language);
            }
        }
    };

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isRtl = language === 'ar';

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white overflow-hidden absolute inset-0 z-50">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-white shadow-md">
                <button
                    onClick={onBack}
                    className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft size={32} className="text-gray-600" />
                </button>

                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-kid-blue flex items-center gap-2">
                        <span>{score}/{words.length}</span>
                        <Star className="text-yellow-400 fill-current" />
                    </div>
                    <div className="text-lg font-bold text-gray-500 flex items-center gap-1">
                        <Clock size={18} />
                        <span>{formatTime(elapsedTime)}</span>
                    </div>
                </div>

                <button
                    onClick={startNewGame}
                    className="p-3 bg-kid-blue text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                    <RefreshCw size={32} />
                </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Grid */}
                <div
                    className="grid gap-1 bg-gray-200 p-2 rounded-xl shadow-lg select-none mx-auto"
                    style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`
                    }}
                >
                    {grid.map((row, r) => (
                        row.map((letter, c) => {
                            const isSelected = selectedCells.some(cell => cell.r === r && cell.c === c);
                            const isFound = foundCells.some(cell => cell.r === r && cell.c === c);

                            return (
                                <div
                                    key={`${r}-${c}`}
                                    onClick={() => handleCellClick(r, c)}
                                    className={`
                    w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-lg md:text-xl font-bold rounded cursor-pointer transition-all
                    ${isFound ? 'bg-green-400 text-white animate-pulse' :
                                            isSelected ? 'bg-kid-orange text-white transform scale-110' :
                                                'bg-white text-gray-700 hover:bg-blue-50'}
                  `}
                                >
                                    {letter}
                                </div>
                            );
                        })
                    ))}
                </div>

                {/* Word List */}
                <div className={`bg-white p-6 rounded-2xl shadow-xl w-full md:w-64 ${isRtl ? 'text-right' : ''}`}
                    dir={isRtl ? 'rtl' : 'ltr'}>
                    <h3 className="text-xl font-bold mb-4 text-center">
                        {language === 'fr' ? 'Mots à trouver' : language === 'en' ? 'Words to find' : 'كلمات للبحث'}
                    </h3>
                    <ul className="space-y-3">
                        {words.map((w, idx) => (
                            <li
                                key={idx}
                                className={`
                  flex items-center justify-between p-2 rounded-lg transition-all
                  ${w.found ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-600'}
                `}
                            >
                                <span className={w.found ? 'line-through opacity-70' : ''}>{w.displayWord}</span>
                                {w.found && <Check size={20} />}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {gameOver && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl text-center transform scale-110">
                        <h2 className="text-4xl font-bold text-kid-blue mb-4">Bravo ! 🎉</h2>
                        <p className="text-xl mb-4">
                            {language === 'fr' ? 'Tu as tout trouvé !' :
                                language === 'en' ? 'You found everything!' :
                                    'لقد وجدت كل شيء!'}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-600 mb-6 bg-gray-100 px-6 py-3 rounded-2xl">
                            <span>⏱️</span>
                            <span>{formatTime(elapsedTime)}</span>
                        </div>
                        <button
                            onClick={startNewGame}
                            className="px-8 py-3 bg-green-500 text-white text-xl font-bold rounded-full hover:bg-green-600 transition-transform hover:scale-105 shadow-lg"
                        >
                            {language === 'fr' ? 'Rejouer' : language === 'en' ? 'Play Again' : 'العب مرة أخرى'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
