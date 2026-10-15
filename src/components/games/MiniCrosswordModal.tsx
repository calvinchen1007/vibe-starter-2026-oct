import React, { useState, useEffect } from 'react';
import { X, RotateCcw, CheckCircle2, HelpCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface MiniCrosswordModalProps {
  onClose: () => void;
}

const SOLUTION: string[][] = [
  ['T', 'I', 'M', 'E', 'S'],
  ['H', 'O', 'U', 'S', 'E'],
  ['E', 'A', 'R', 'T', 'H'],
  ['S', 'W', 'I', 'S', 'S'],
  ['S', 'E', 'E', 'D', 'S'],
];

const CLUES_ACROSS = [
  { num: 1, clue: 'New York publication celebrating 173 years of broadsheets', answer: 'TIMES' },
  { num: 6, clue: 'Residential structure, or congressional chamber', answer: 'HOUSE' },
  { num: 7, clue: 'The blue planet', answer: 'EARTH' },
  { num: 8, clue: 'Like watchmakers of the Jura Valley', answer: 'SWISS' },
  { num: 9, clue: 'What gardeners plant in spring', answer: 'SEEDS' },
];

const CLUES_DOWN = [
  { num: 1, clue: 'Definite article repeated in paper mastheads', answer: 'THESS' },
  { num: 2, clue: 'Iowa state bird or agricultural crop', answer: 'IOWEE' },
  { num: 3, clue: 'Sound made by a contemplative thinker', answer: 'MURIE' },
  { num: 4, clue: 'Eastern standard or summer period', answer: 'ESTSD' },
  { num: 5, clue: 'Plural of letters after R', answer: 'SEHSS' },
];

export const MiniCrosswordModal: React.FC<MiniCrosswordModalProps> = ({ onClose }) => {
  const [grid, setGrid] = useState<string[][]>(() =>
    Array(5)
      .fill('')
      .map(() => Array(5).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [seconds, setSeconds] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  useEffect(() => {
    if (isSolved) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isSolved]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCellClick = (r: number, c: number) => {
    sounds.playKeyTap();
    if (selectedCell.r === r && selectedCell.c === c) {
      setDirection((d) => (d === 'across' ? 'down' : 'across'));
    } else {
      setSelectedCell({ r, c });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isSolved) return;
    const { r, c } = selectedCell;

    if (e.key === 'Backspace') {
      sounds.playKeyTap();
      const newGrid = grid.map((row) => [...row]);
      newGrid[r][c] = '';
      setGrid(newGrid);

      if (direction === 'across' && c > 0) {
        setSelectedCell({ r, c: c - 1 });
      } else if (direction === 'down' && r > 0) {
        setSelectedCell({ r: r - 1, c });
      }
      e.preventDefault();
      return;
    }

    if (e.key === 'ArrowRight' && c < 4) setSelectedCell({ r, c: c + 1 });
    if (e.key === 'ArrowLeft' && c > 0) setSelectedCell({ r, c: c - 1 });
    if (e.key === 'ArrowDown' && r < 4) setSelectedCell({ r: r + 1, c });
    if (e.key === 'ArrowUp' && r > 0) setSelectedCell({ r: r - 1, c });

    const char = e.key.toUpperCase();
    if (/^[A-Z]$/.test(char)) {
      sounds.playKeyTap();
      const newGrid = grid.map((row) => [...row]);
      newGrid[r][c] = char;
      setGrid(newGrid);

      checkCompletion(newGrid);

      if (direction === 'across' && c < 4) {
        setSelectedCell({ r, c: c + 1 });
      } else if (direction === 'down' && r < 4) {
        setSelectedCell({ r: r + 1, c });
      }
    }
  };

  const checkCompletion = (currentGrid: string[][]) => {
    let allFilled = true;
    let allCorrect = true;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (!currentGrid[i][j]) allFilled = false;
        if (currentGrid[i][j] !== SOLUTION[i][j]) allCorrect = false;
      }
    }
    if (allFilled && allCorrect) {
      setIsSolved(true);
      sounds.playSuccess();
    }
  };

  const revealPuzzle = () => {
    sounds.playFlip();
    setGrid(SOLUTION);
    setIsSolved(true);
  };

  const resetPuzzle = () => {
    sounds.playFlip();
    setGrid(
      Array(5)
        .fill('')
        .map(() => Array(5).fill(''))
    );
    setSelectedCell({ r: 0, c: 0 });
    setIsSolved(false);
    setSeconds(0);
  };

  const currentClue =
    direction === 'across'
      ? CLUES_ACROSS[selectedCell.r]
      : CLUES_DOWN[selectedCell.c] || CLUES_DOWN[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4">
      <div
        className="relative w-full max-w-lg bg-white border border-[#121212] shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto focus:outline-hidden"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2e2e2]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#e8e8e8] border border-[#121212] text-[#121212] font-bold flex items-center justify-center text-[10px]">
              5×5
            </div>
            <div>
              <h3 className="font-masthead font-bold text-lg leading-tight text-[#121212]">The Mini Crossword</h3>
              <span className="font-caption text-[11px] text-[#5e5e5e]">May 24, 2024 • Edited by Joel Fagliano</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#f4f3f3] border border-[#e2e2e2]">
              ⏱ {formatTime(seconds)}
            </span>
            <button
              onClick={() => {
                sounds.playFlip();
                onClose();
              }}
              className="p-1.5 text-[#5e5e5e] hover:text-[#121212] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Active Clue Ribbon */}
        <div className="bg-[#faf0ea] px-4 py-2 border-b border-[#e2e2e2] flex items-center justify-between">
          <div className="text-xs font-serif font-medium text-[#121212]">
            <span className="font-bold mr-1">
              {direction === 'across' ? `${selectedCell.r + 1}A` : `${selectedCell.c + 1}D`}:
            </span>
            <span>{currentClue?.clue}</span>
          </div>
          <button
            onClick={() => {
              sounds.playFlip();
              setDirection((d) => (d === 'across' ? 'down' : 'across'));
            }}
            className="text-[10px] font-label-section uppercase font-bold text-[#5e5e5e] hover:text-[#121212]"
          >
            Switch to {direction === 'across' ? 'Down' : 'Across'}
          </button>
        </div>

        {/* Puzzle Board & Clues */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-5 gap-0 border-2 border-[#121212] bg-[#121212] shadow-sm">
              {grid.map((row, r) =>
                row.map((cell, c) => {
                  const isSelected = selectedCell.r === r && selectedCell.c === c;
                  const isInWord =
                    direction === 'across'
                      ? selectedCell.r === r
                      : selectedCell.c === c;

                  let cellBg = 'bg-white';
                  if (isSelected) {
                    cellBg = 'bg-[#ffda00]';
                  } else if (isInWord) {
                    cellBg = 'bg-[#a7d8ff]/30';
                  }

                  const cellNumber = r === 0 ? c + 1 : c === 0 ? r + 5 : null;

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`relative w-12 h-12 flex items-center justify-center font-bold text-xl uppercase cursor-pointer select-none border border-[#121212] transition-colors ${cellBg}`}
                    >
                      {cellNumber && (
                        <span className="absolute top-0.5 left-1 text-[9px] font-mono leading-none text-[#5e5e5e]">
                          {cellNumber}
                        </span>
                      )}
                      <span className="text-[#121212] mt-1">{cell}</span>
                    </div>
                  );
                })
              )}
            </div>

            {isSolved && (
              <div className="mt-3 p-2 bg-emerald-50 border border-emerald-600 text-center w-full animate-fade-in">
                <div className="flex items-center justify-center gap-1 text-emerald-800 font-bold text-xs uppercase font-label-section">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Congratulations! Solved in {formatTime(seconds)}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={resetPuzzle}
                className="px-2.5 py-1 text-xs border border-[#121212] font-label-section uppercase font-semibold hover:bg-neutral-100 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
              <button
                onClick={revealPuzzle}
                className="px-2.5 py-1 text-xs border border-[#121212] font-label-section uppercase font-semibold hover:bg-neutral-100"
              >
                Reveal
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            <div>
              <h4 className="font-label-section text-[11px] uppercase tracking-wider font-bold text-[#121212] border-b border-[#121212] pb-0.5 mb-1.5">
                Across
              </h4>
              <ul className="space-y-1 text-xs font-serif">
                {CLUES_ACROSS.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedCell({ r: idx, c: 0 });
                      setDirection('across');
                      sounds.playKeyTap();
                    }}
                    className={`cursor-pointer p-1 rounded-none hover:bg-neutral-100 ${
                      direction === 'across' && selectedCell.r === idx
                        ? 'bg-[#faf0ea] font-bold'
                        : ''
                    }`}
                  >
                    <span className="font-bold mr-1.5">{idx + 1}</span>
                    {item.clue}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-label-section text-[11px] uppercase tracking-wider font-bold text-[#121212] border-b border-[#121212] pb-0.5 mb-1.5">
                Down
              </h4>
              <ul className="space-y-1 text-xs font-serif">
                {CLUES_DOWN.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedCell({ r: 0, c: idx });
                      setDirection('down');
                      sounds.playKeyTap();
                    }}
                    className={`cursor-pointer p-1 rounded-none hover:bg-neutral-100 ${
                      direction === 'down' && selectedCell.c === idx
                        ? 'bg-[#faf0ea] font-bold'
                        : ''
                    }`}
                  >
                    <span className="font-bold mr-1.5">{idx + 1}</span>
                    {item.clue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
