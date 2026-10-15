import React, { useState } from 'react';
import { X, RotateCcw, Shuffle, Delete, Trophy, CheckCircle2 } from 'lucide-react';

interface SpellingBeeModalProps {
  onClose: () => void;
}

const CENTER_LETTER = 'P';
const OUTER_LETTERS = ['A', 'L', 'E', 'N', 'R', 'Y'];

// Valid curated words for this set
const VALID_WORDS = [
  'PLAN', 'PLANE', 'PLANER', 'PLANET', 'PLANETARY', 'PLENARY', 'PEARL', 'PRAY',
  'PRAYER', 'PAYER', 'PALE', 'PANEL', 'PALER', 'PARLEY', 'PEAR', 'PLEA', 'PLEAD',
  'REPLAY', 'APPLY', 'APPLE', 'EARLY', 'LEARN', 'RELAY'
];

export const SpellingBeeModal: React.FC<SpellingBeeModalProps> = ({ onClose }) => {
  const [letters, setLetters] = useState<string[]>(OUTER_LETTERS);
  const [inputWord, setInputWord] = useState<string>('');
  const [foundWords, setFoundWords] = useState<string[]>(['PLAN', 'PEARL']);
  const [points, setPoints] = useState<number>(14);
  const [message, setMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleLetterClick = (char: string) => {
    if (inputWord.length < 15) {
      setInputWord((prev) => prev + char);
    }
  };

  const handleDelete = () => {
    setInputWord((prev) => prev.slice(0, -1));
  };

  const handleShuffle = () => {
    setLetters((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleSubmit = () => {
    const word = inputWord.toUpperCase();
    if (word.length < 4) {
      showToast('Too short (minimum 4 letters)');
      return;
    }
    if (!word.includes(CENTER_LETTER)) {
      showToast(`Missing center letter "${CENTER_LETTER}"`);
      return;
    }
    if (foundWords.includes(word)) {
      showToast('Already found');
      return;
    }
    if (VALID_WORDS.includes(word)) {
      const earned = word.length === 4 ? 1 : word.length;
      setPoints((prev) => prev + earned);
      setFoundWords((prev) => [word, ...prev]);
      setInputWord('');
      showToast(`Awesome! +${earned} points`);
    } else {
      showToast('Not in word list');
    }
  };

  // Rank determination
  const getRank = (score: number) => {
    if (score >= 60) return 'Genius';
    if (score >= 40) return 'Amazing';
    if (score >= 25) return 'Great';
    if (score >= 15) return 'Solid';
    if (score >= 8) return 'Moving Up';
    return 'Beginner';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg bg-white border border-[#121212] shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2e2e2]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#f7da21] text-[#121212] font-bold flex items-center justify-center text-xs">
              🐝
            </div>
            <div>
              <h3 className="font-masthead font-bold text-lg leading-tight text-[#121212]">Spelling Bee</h3>
              <span className="font-caption text-[11px] text-[#5e5e5e]">May 24, 2024 • Edited by Sam Ezersky</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5e5e5e] hover:text-[#121212] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status bar */}
        <div className="px-5 py-3 bg-[#faf0ea] border-b border-[#e2e2e2] flex items-center justify-between">
          <div>
            <span className="font-label-section text-xs uppercase font-bold text-[#121212]">
              Rank: {getRank(points)}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-32 bg-[#e2e2e2] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#f7da21] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (points / 70) * 100)}%` }}
                />
              </div>
              <span className="font-mono text-xs font-semibold">{points} pts</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-caption text-xs text-[#5e5e5e]">Words found: {foundWords.length}</span>
          </div>
        </div>

        {/* Toast message */}
        {message && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 bg-[#121212] text-white px-3 py-1.5 text-xs font-label-section uppercase tracking-wider shadow-md">
            {message}
          </div>
        )}

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Honeycomb Interface */}
          <div className="flex flex-col items-center">
            {/* Word Input Display */}
            <div className="h-10 flex items-center justify-center font-bold text-xl uppercase tracking-wider text-[#121212] border-b-2 border-[#121212] w-48 mb-6">
              {inputWord ? (
                <span>
                  {inputWord.split('').map((ch, idx) => (
                    <span
                      key={idx}
                      className={ch === CENTER_LETTER ? 'text-[#f7da21] font-black' : 'text-[#121212]'}
                    >
                      {ch}
                    </span>
                  ))}
                  <span className="animate-pulse">|</span>
                </span>
              ) : (
                <span className="text-neutral-400 font-normal text-sm font-label-section uppercase">
                  Type or click
                </span>
              )}
            </div>

            {/* Honeycomb arrangement */}
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Center Key */}
              <button
                onClick={() => handleLetterClick(CENTER_LETTER)}
                className="absolute w-14 h-14 bg-[#f7da21] text-[#121212] font-black text-xl rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-xs z-10"
              >
                {CENTER_LETTER}
              </button>

              {/* 6 Outer Keys in hexagonal ring */}
              {letters.map((char, index) => {
                const angle = (index * 60 - 30) * (Math.PI / 180);
                const radius = 64; // px
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                  <button
                    key={index}
                    onClick={() => handleLetterClick(char)}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute w-14 h-14 bg-[#e8e8e8] hover:bg-[#dadada] text-[#121212] font-bold text-lg rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                  >
                    {char}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 border border-[#121212] text-xs font-label-section uppercase tracking-wider font-semibold hover:bg-neutral-100 flex items-center gap-1"
              >
                <Delete className="w-3.5 h-3.5" /> Delete
              </button>
              <button
                onClick={handleShuffle}
                className="p-2 border border-[#121212] text-xs hover:bg-neutral-100 rounded-full"
                title="Shuffle outer letters"
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-1.5 bg-[#121212] text-white text-xs font-label-section uppercase tracking-wider font-bold hover:bg-neutral-800"
              >
                Enter
              </button>
            </div>
          </div>

          {/* Found Words List */}
          <div className="border border-[#e2e2e2] p-3 bg-[#fbfbfb] h-64 overflow-y-auto flex flex-col">
            <h4 className="font-label-section text-[11px] uppercase tracking-wider font-bold text-[#121212] border-b border-[#e2e2e2] pb-1.5 mb-2">
              Words Found ({foundWords.length})
            </h4>
            <div className="flex flex-wrap gap-1.5 overflow-y-auto">
              {foundWords.map((w) => (
                <span
                  key={w}
                  className="px-2 py-0.5 bg-white border border-[#e2e2e2] text-xs font-semibold text-[#121212]"
                >
                  {w}
                </span>
              ))}
            </div>
            {foundWords.length === 0 && (
              <span className="text-xs text-[#5e5e5e] italic my-auto text-center">
                Discover 4+ letter words containing {CENTER_LETTER}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
