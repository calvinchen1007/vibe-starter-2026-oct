import React, { useState, useEffect, useCallback } from 'react';
import { X, RotateCcw, Share2, Trophy, Volume2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface WordleModalProps {
  onClose: () => void;
}

const TARGET_WORDS = ['PRESS', 'TIMES', 'SWISS', 'MEDIA', 'PAPER', 'PRINT', 'STORY', 'WATCH', 'DEALS', 'CHIPS'];
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

export const WordleModal: React.FC<WordleModalProps> = ({ onClose }) => {
  const [targetWord, setTargetWord] = useState<string>('TIMES');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [message, setMessage] = useState<string>('');
  const [shakeRow, setShakeRow] = useState<boolean>(false);

  useEffect(() => {
    const word = TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];
    setTargetWord(word);
  }, []);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2200);
  };

  const handleKey = useCallback(
    (key: string) => {
      if (gameStatus !== 'playing') return;

      if (key === 'ENTER') {
        if (currentGuess.length !== WORD_LENGTH) {
          sounds.playError();
          setShakeRow(true);
          setTimeout(() => setShakeRow(false), 500);
          showToast('Not enough letters');
          return;
        }

        sounds.playFlip();
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess('');

        if (currentGuess === targetWord) {
          setGameStatus('won');
          sounds.playSuccess();
          showToast('Genius! Splendid victory.');
        } else if (newGuesses.length >= MAX_ATTEMPTS) {
          setGameStatus('lost');
          sounds.playError();
          showToast(`The word was ${targetWord}`);
        }
      } else if (key === 'BACKSPACE' || key === 'DEL') {
        sounds.playKeyTap();
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        sounds.playKeyTap();
        setCurrentGuess((prev) => prev + key);
      }
    },
    [currentGuess, gameStatus, guesses, targetWord]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKey('ENTER');
      } else if (e.key === 'Backspace') {
        handleKey('BACKSPACE');
      } else {
        const char = e.key.toUpperCase();
        if (/^[A-Z]$/.test(char)) {
          handleKey(char);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKey]);

  const resetGame = () => {
    sounds.playFlip();
    const newWord = TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];
    setTargetWord(newWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setMessage('');
  };

  const getLetterStatus = (guess: string, index: number): 'correct' | 'present' | 'absent' => {
    const letter = guess[index];
    if (targetWord[index] === letter) return 'correct';
    if (targetWord.includes(letter)) return 'present';
    return 'absent';
  };

  const getKeyStatus = (key: string): 'correct' | 'present' | 'absent' | 'default' => {
    let status: 'correct' | 'present' | 'absent' | 'default' = 'default';
    for (const g of guesses) {
      for (let i = 0; i < g.length; i++) {
        if (g[i] === key) {
          if (targetWord[i] === key) return 'correct';
          if (targetWord.includes(key)) status = 'present';
          else if (status !== 'present') status = 'absent';
        }
      }
    }
    return status;
  };

  const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md bg-white border border-[#121212] shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2e2e2]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#121212] text-white font-bold flex items-center justify-center text-xs">
              W
            </div>
            <div>
              <h3 className="font-masthead font-bold text-lg leading-tight text-[#121212]">Wordle</h3>
              <span className="font-caption text-[11px] text-[#5e5e5e]">No. 1,068 • 5 attempts avg.</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={resetGame}
              title="Reset Wordle"
              className="p-1.5 text-[#5e5e5e] hover:text-[#121212] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
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

        {/* Toast message */}
        {message && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10 bg-[#121212] text-white px-3 py-1.5 text-xs font-label-section uppercase tracking-wider shadow-md">
            {message}
          </div>
        )}

        {/* Board */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="grid grid-rows-6 gap-1.5 w-64 max-w-full my-2">
            {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
              const isCurrentRow = rowIndex === guesses.length;
              const isPastRow = rowIndex < guesses.length;
              const rowWord = isPastRow
                ? guesses[rowIndex]
                : isCurrentRow
                ? currentGuess.padEnd(WORD_LENGTH, ' ')
                : '     ';

              return (
                <div
                  key={rowIndex}
                  className={`grid grid-cols-5 gap-1.5 ${isCurrentRow && shakeRow ? 'animate-shake' : ''}`}
                >
                  {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                    const char = rowWord[colIndex]?.trim() || '';
                    let bgColor = 'bg-white border-[#d3d6da] text-[#121212]';

                    if (isPastRow) {
                      const status = getLetterStatus(guesses[rowIndex], colIndex);
                      if (status === 'correct') {
                        bgColor = 'bg-[#6aaa64] text-white border-[#6aaa64]';
                      } else if (status === 'present') {
                        bgColor = 'bg-[#c9b458] text-white border-[#c9b458]';
                      } else {
                        bgColor = 'bg-[#787c7e] text-white border-[#787c7e]';
                      }
                    } else if (char) {
                      bgColor = 'bg-white border-[#878a8c] text-[#121212]';
                    }

                    return (
                      <div
                        key={colIndex}
                        className={`aspect-square flex items-center justify-center font-bold text-2xl border-2 uppercase select-none transition-all duration-300 ${bgColor}`}
                      >
                        {char}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Game Over Message */}
          {gameStatus !== 'playing' && (
            <div className="my-2 p-3 bg-[#faf0ea] border border-[#121212] w-full max-w-xs text-center space-y-2 animate-fade-in">
              <div className="flex items-center justify-center gap-1 text-[#121212]">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span className="font-label-section text-xs uppercase font-bold">
                  {gameStatus === 'won' ? 'Magnificent!' : 'Better luck tomorrow!'}
                </span>
              </div>
              <p className="font-body-sm text-xs text-[#5e5e5e]">
                {gameStatus === 'won'
                  ? `Solved in ${guesses.length} / ${MAX_ATTEMPTS} tries.`
                  : `Word was "${targetWord}".`}
              </p>
              <div className="flex gap-2 justify-center pt-1">
                <button
                  onClick={resetGame}
                  className="bg-[#121212] text-white text-[11px] font-label-section uppercase px-3 py-1 font-semibold hover:bg-neutral-800"
                >
                  Play Another
                </button>
              </div>
            </div>
          )}

          {/* Keyboard */}
          <div className="w-full space-y-1.5 pt-2 select-none">
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1">
                {row.map((k) => {
                  const status = getKeyStatus(k);
                  let keyBg = 'bg-[#d3d6da] text-[#121212] hover:bg-[#c2c5c9]';
                  if (status === 'correct') keyBg = 'bg-[#6aaa64] text-white';
                  else if (status === 'present') keyBg = 'bg-[#c9b458] text-white';
                  else if (status === 'absent') keyBg = 'bg-[#787c7e] text-white';

                  const isWide = k === 'ENTER' || k === 'DEL';

                  return (
                    <button
                      key={k}
                      onClick={() => handleKey(k)}
                      className={`h-11 rounded-none flex items-center justify-center font-bold text-xs uppercase transition-colors active:scale-95 ${
                        isWide ? 'px-3 font-label-section text-[10px]' : 'w-8 sm:w-9'
                      } ${keyBg}`}
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#e2e2e2] bg-[#f9f9f9] flex justify-between items-center text-xs font-caption text-[#5e5e5e]">
          <span>Edited by Will Shortz</span>
          <span>© The New York Times Games</span>
        </div>
      </div>
    </div>
  );
};
