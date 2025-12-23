import React, { useState, useEffect } from 'react';
import type { Riddle } from '../data/gameData';
import { useGame } from '../context/GameContext';
import { X, Send, Sparkles } from 'lucide-react';

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

    // Close on backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const isSolved = isPreviouslySolved || justSolved;

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
        >
            <div className="w-full max-w-lg glass-panel relative overflow-hidden animate-fade-in border border-[var(--color-gold-dim)] transform transition-all shadow-[0_0_50px_rgba(0,0,0,0.8)]">

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-60"></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-[var(--color-gold)] hover:rotate-90 transition-transform duration-300 z-10"
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div className="p-8 md:p-10">
                    <div className="text-center mb-8">
                        <span className="text-5xl mb-4 block animate-float">{riddle.gridLabel}</span>
                        <h3 className="text-3xl font-bold font-heading text-gradient-gold mb-4">
                            {riddle.title}
                        </h3>
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--color-gold-dim)] to-transparent mx-auto opacity-50"></div>
                    </div>

                    <p className="text-xl text-center mb-8 font-serif leading-relaxed text-gray-300 italic">
                        "{riddle.description}"
                    </p>

                    {!isSolved ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="Tell me the answer..."
                                    className={`
                                        w-full px-6 py-4 text-lg border rounded bg-black/50 font-serif
                                        focus:outline-none transition-all placeholder:text-gray-600
                                        ${error
                                            ? 'border-[var(--color-error)] animate-[shake_0.5s_ease-in-out]'
                                            : 'border-[var(--color-gold-dim)] focus:border-[var(--color-gold)] focus:shadow-[0_0_15px_rgba(197,160,89,0.2)]'}
                                    `}
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 btn-primary text-lg font-bold
                                     flex items-center justify-center gap-2 group"
                            >
                                <span>Cast Spell</span>
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>

                            {error && (
                                <p className="text-[var(--color-error)] text-center text-sm font-bold animate-pulse">
                                    The magic fizzles... try again.
                                </p>
                            )}
                        </form>
                    ) : (
                        <div className="text-center animate-fade-in">
                            <div className="bg-gradient-to-b from-[var(--color-gold-dim)]/10 to-transparent p-6 rounded-xl border border-[var(--color-gold-dim)]/30 mb-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,theme(colors.yellow.500/0.1),transparent)] pointer-events-none"></div>
                                <Sparkles className="absolute top-2 right-2 text-[var(--color-gold)] animate-spin-slow opacity-50" size={16} />
                                <Sparkles className="absolute bottom-2 left-2 text-[var(--color-gold)] animate-spin-slow opacity-50" size={12} />

                                <p className="text-[var(--color-gold)] font-bold mb-4 uppercase tracking-widest text-xs">
                                    Riddle Solved
                                </p>
                                <p className="text-sm mb-3 text-gray-400">You found a letter:</p>
                                <div className="text-7xl font-magic text-gradient-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] animate-pulse-glow">
                                    {riddle.rewardLetter}
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="px-8 py-3 border border-[var(--color-gold-dim)] text-[var(--color-gold)] font-bold rounded
                                     hover:bg-[var(--color-gold-dim)] hover:text-black transition-all uppercase tracking-wider text-sm"
                            >
                                Return to Map
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
