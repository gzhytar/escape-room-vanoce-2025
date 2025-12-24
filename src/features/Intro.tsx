import React from 'react';
import { Scroll, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const Intro: React.FC = () => {
    const { startGame } = useGame();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-black/40">
            <div className="max-w-2xl w-full glass-panel frost-effect p-10 md:p-14 rounded-xl border border-[var(--color-gold-dim)] transform rotate-1 relative animate-fade-in text-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">

                {/* Mystic Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,14,14,0.2),transparent)] pointer-events-none"></div>

                {/* Christmas Decorations */}
                <div className="absolute top-6 left-6 text-3xl opacity-70" style={{ animation: 'twinkle 2s ease-in-out infinite' }}>
                    ❄️
                </div>
                <div className="absolute top-6 right-6 text-3xl opacity-70" style={{ animation: 'twinkle 2s ease-in-out infinite', animationDelay: '0.5s' }}>
                    🔔
                </div>
                <div className="absolute bottom-6 left-6 text-3xl opacity-70" style={{ animation: 'twinkle 2s ease-in-out infinite', animationDelay: '1s' }}>
                    🎄
                </div>
                <div className="absolute bottom-6 right-6 text-3xl opacity-70" style={{ animation: 'twinkle 2s ease-in-out infinite', animationDelay: '1.5s' }}>
                    ☃️
                </div>

                {/* Original Decorations */}
                <div className="absolute top-12 left-12 text-[var(--color-gold-dim)] opacity-30 animate-pulse-glow">
                    <Sparkles size={40} />
                </div>
                <div className="absolute bottom-12 right-12 text-[var(--color-gold-dim)] opacity-30 animate-pulse-glow" style={{ animationDelay: '1s' }}>
                    <Scroll size={40} />
                </div>

                <div className="font-serif relative z-10">
                    <h2 className="text-[var(--color-gold)] text-lg font-bold uppercase tracking-[0.3em] mb-4 font-heading border-b border-[var(--color-gold-dim)] inline-block pb-1">
                        Ministry of Magic Decree
                    </h2>

                    <h1 className="text-5xl md:text-6xl font-bold mb-8 font-magic text-gradient-gold drop-shadow-lg leading-tight mt-4">
                        The Alchemist's London
                    </h1>

                    <div className="text-xl leading-relaxed mb-10 font-body text-gray-300 italic">
                        <p className="mb-6">
                            "A magical fog has descended upon the city, freezing time itself. To break the spell and return to the Muggle world, you must traverse the history and magic of London."
                        </p>
                        <p className="text-[var(--color-text)] font-semibold">
                            Find the 12 hidden letters to form the password for the Golden Snitch.
                        </p>
                        <p className="text-[var(--color-christmas-red)] font-semibold mt-4 text-lg">
                            🎅 A Christmas Adventure Awaits! 🎄
                        </p>
                    </div>

                    <button
                        onClick={startGame}
                        className="btn-primary px-10 py-4 text-xl font-bold tracking-widest
                     hover:scale-105 transform transition-all shadow-xl rounded-sm"
                    >
                        Enter The Leaky Cauldron
                    </button>
                </div>
            </div>
        </div>
    );
};
