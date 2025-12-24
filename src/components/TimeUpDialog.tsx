import React from 'react';
import { Gift, Clock, XCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const TimeUpDialog: React.FC = () => {
    const { isTimerExpired, hasExtended, extendTimer, dismissTimeUp } = useGame();

    if (!isTimerExpired) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="max-w-md w-full glass-panel frost-effect p-8 rounded-xl border-2 border-[var(--color-gold)] transform scale-100 animate-scale-in shadow-[0_0_50px_rgba(0,0,0,0.9)]">

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 text-2xl opacity-70 animate-pulse">🎄</div>
                <div className="absolute top-4 right-4 text-2xl opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}>🎁</div>
                <div className="absolute bottom-4 left-4 text-2xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
                <div className="absolute bottom-4 right-4 text-2xl opacity-70 animate-pulse" style={{ animationDelay: '1.5s' }}>❄️</div>

                <div className="text-center relative z-10">
                    {!hasExtended ? (
                        <>
                            {/* First time - offer extension */}
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 rounded-full bg-[var(--color-christmas-red)]/20 border-2 border-[var(--color-christmas-red)]">
                                    <Clock size={48} className="text-[var(--color-christmas-red)]" />
                                </div>
                            </div>

                            <h2 className="text-3xl font-magic text-[var(--color-gold)] mb-4">
                                Time's Up!
                            </h2>

                            <p className="text-lg text-[var(--color-text-muted)] mb-6 font-serif">
                                The magical fog grows stronger... but wait!
                            </p>

                            <div className="mb-8 p-4 bg-gradient-to-r from-[var(--color-christmas-red)]/20 to-[var(--color-christmas-green)]/20 rounded-lg border border-[var(--color-gold-dim)]">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Gift className="text-[var(--color-christmas-red)]" size={24} />
                                    <h3 className="text-xl font-bold text-[var(--color-gold)]">
                                        Christmas Gift! 🎅
                                    </h3>
                                </div>
                                <p className="text-[var(--color-text)] font-serif italic">
                                    Santa grants you <span className="font-bold text-[var(--color-christmas-red)]">15 more minutes</span> to complete your quest!
                                </p>
                            </div>

                            <button
                                onClick={extendTimer}
                                className="btn-primary px-8 py-4 text-lg font-bold tracking-wider
                                    hover:scale-105 transform transition-all shadow-xl rounded-sm w-full
                                    bg-gradient-to-r from-[var(--color-christmas-red)] to-[var(--color-christmas-green)]"
                            >
                                Accept Christmas Gift 🎁
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Second time - game over */}
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 rounded-full bg-red-900/30 border-2 border-red-500">
                                    <XCircle size={48} className="text-red-400" />
                                </div>
                            </div>

                            <h2 className="text-3xl font-magic text-red-400 mb-4">
                                The Fog Prevails
                            </h2>

                            <p className="text-lg text-[var(--color-text-muted)] mb-6 font-serif">
                                The magical fog has completely frozen time. London remains trapped in the spell...
                            </p>

                            <div className="mb-8 p-4 bg-red-900/20 rounded-lg border border-red-500/50">
                                <p className="text-[var(--color-text)] font-serif">
                                    Perhaps you'll have better luck on your next adventure. The mysteries of The Alchemist's Christmas Quest await another brave soul.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    dismissTimeUp();
                                    window.location.reload();
                                }}
                                className="btn-primary px-8 py-4 text-lg font-bold tracking-wider
                                    hover:scale-105 transform transition-all shadow-xl rounded-sm w-full"
                            >
                                Start New Adventure
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
