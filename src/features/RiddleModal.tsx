import React, { useState, useEffect } from 'react';
import type { Riddle } from '../data/gameData';
import { useGame } from '../context/GameContext';
import { X, Send } from 'lucide-react';

interface RiddleModalProps {
    riddle: Riddle;
    onClose: () => void;
}

export const RiddleModal: React.FC<RiddleModalProps> = ({ riddle, onClose }) => {
    const { solveRiddle, solvedRiddles } = useGame();
    const isPreviouslySolved = solvedRiddles.includes(riddle.id);

    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);
    const [justSolved, setJustSolved] = useState(false);

    useEffect(() => {
        // Reset state when riddle changes
        setAnswer('');
        setError(false);
        setJustSolved(false);
    }, [riddle]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (solveRiddle(riddle.id, answer)) {
            setJustSolved(true);
            setError(false);
        } else {
            setError(true);
            // Shake animation trigger
            setTimeout(() => setError(false), 500);
        }
    };

    const isSolved = isPreviouslySolved || justSolved;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-lg bg-[var(--color-parchment)] text-[#2a2a2a] rounded-lg shadow-2xl overflow-hidden relative border-4 border-[#333]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#4a0e0e] hover:scale-110"
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div className="p-8">
                    <div className="text-center mb-6">
                        <span className="text-4xl mb-4 block">{riddle.gridLabel}</span>
                        <h3 className="text-2xl font-bold font-heading text-[#4a0e0e] mb-2">
                            {riddle.title}
                        </h3>
                        <div className="h-px w-16 bg-[#c5a059] mx-auto"></div>
                    </div>

                    <p className="text-lg text-center mb-8 font-serif leading-relaxed italic">
                        "{riddle.description}"
                    </p>

                    {!isSolved ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="Tell me the answer..."
                                    className={`
                    w-full px-4 py-3 text-lg border-2 rounded bg-white/50 font-serif
                    focus:outline-none focus:border-[#4a0e0e] transition-all
                    ${error ? 'border-[var(--color-error)] animate-[shake_0.5s_ease-in-out]' : 'border-[#d8c8b0]'}
                  `}
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#4a0e0e] text-[#f0e6d2] font-bold rounded
                         hover:bg-[#681414] flex items-center justify-center gap-2"
                            >
                                <span>Cast Spell</span>
                                <Send size={18} />
                            </button>

                            {error && (
                                <p className="text-[var(--color-error)] text-center text-sm font-bold">
                                    The magic fizzles... try again.
                                </p>
                            )}
                        </form>
                    ) : (
                        <div className="text-center animate-fade-in">
                            <div className="bg-[rgba(197,160,89,0.2)] p-6 rounded-lg border-2 border-[#c5a059] mb-6">
                                <p className="text-[#4a0e0e] font-bold mb-2 uppercase tracking-wider text-xs">
                                    Riddle Solved
                                </p>
                                <p className="text-sm mb-2">You found a letter:</p>
                                <div className="text-6xl font-magic text-[#4a0e0e] drop-shadow-md">
                                    {riddle.rewardLetter}
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 border-2 border-[#4a0e0e] text-[#4a0e0e] font-bold rounded
                         hover:bg-[#4a0e0e] hover:text-[#f0e6d2]"
                            >
                                Return to Map
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Clue */}
                <div className="bg-[#d8c8b0] p-3 text-center text-sm font-mono text-[#4a0e0e] border-t border-[#c5a059]">
                    {riddle.clue}
                </div>
            </div>
        </div>
    );
};
