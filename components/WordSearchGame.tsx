import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, RefreshCw, Check, Star } from 'lucide-react';
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
    const [words, setWords] = useState<{ word: string; found: boolean; partId: string }[]>([]);
    const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
    const [foundCells, setFoundCells] = useState<{ r: number; c: number }[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Normalize words for the grid (remove accents, spaces, uppercase)
    const normalize = (str: string) => {
        return str
            .normalize('NFD') // Decompose accents
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-zA-Z\u0600-\u06FF]/g, '') // Keep letters (including Arabic)
            .toUpperCase();
    };

    const alphabet = language === 'ar'
        ? 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    useEffect(() => {
        startNewGame();
    }, [language]);

    const startNewGame = () => {
        // 1. Select words
        const gameWords = parts.map(p => ({
            word: normalize(p.name[language]),
            found: false,
            partId: p.id
        })).filter(w => w.word.length <= GRID_SIZE); // Ensure words fit

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
        playLocalAudio('start_game', language); // Assuming this audio exists or will be generic
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

        // Sort selection to check for words
        // Allow simplified selection: just clicking letters. For CP, drag-select is hard.
        // Let's verify if the current selection forms a word.
        setSelectedCells(newSelection);
        checkSelection(newSelection);
    };

    const checkSelection = (selection: { r: number; c: number }[]) => {
        // Construct word from selection
        // This is a naive check: we check if the selected letters form any of the words
        // regardless of order, which might be too loose, but good for kids.
        // BETTER: Check if the *sequence* matches.

        // Let's implement a "start and end" click logic or just "click letters in order".
        // For simplicity: If the selected letters match a word exactly composed of those cells.

        const selectedString = selection.map(pos => grid[pos.r][pos.c]).join('');
        // Try to find if this string matches any word

        // Actually, for CP, let's make it robust:
        // They click sequential cells. We check if the formed string matches.
        // We need to sort selected cells by position? 
        // Let's assume they click in order.

        const potentialWord = selectedString;
        const reverseWord = selectedString.split('').reverse().join('');

        const match = words.find(w => !w.found && (w.word === potentialWord || w.word === reverseWord));

        if (match) {
            // Word found!
            const newWords = words.map(w => w.word === match.word ? { ...w, found: true } : w);
            setWords(newWords);
            setFoundCells([...foundCells, ...selection]);
            setSelectedCells([]); // Clear selection
            setScore(prev => prev + 1);
            playLocalAudio('good_answer', language); // Or part name

            // Play part audio
            playLocalAudio(match.partId, language);

            if (newWords.every(w => w.found)) {
                setGameOver(true);
                playLocalAudio('game_won', language);
            }
        }
    };

    // Improved selection logic: clear if it's getting too long/wrong?
    // Let's add a "Reset Selection" button or auto-clear after delay? 
    // No, manual toggle is fine for now.

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

                <div className="text-2xl font-bold text-kid-blue flex items-center gap-2">
                    <span>{score}/{words.length}</span>
                    <Star className="text-yellow-400 fill-current" />
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
                <div className="bg-white p-6 rounded-2xl shadow-xl w-full md:w-64">
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
                                <span className={w.found ? 'line-through opacity-70' : ''}>{w.word}</span>
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
                        <p className="text-xl mb-8">
                            {language === 'fr' ? 'Tu as tout trouvé !' :
                                language === 'en' ? 'You found everything!' :
                                    'لقد وجدت كل شيء!'}
                        </p>
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
