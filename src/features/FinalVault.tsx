import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Key, Sparkles } from 'lucide-react';

export const FinalVault: React.FC = () => {
    const { solvedRiddles, attemptVault, isGameWon } = useGame();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    // If game is won, show victory
    if (isGameWon) {
        return (
            <div className="mt-12 p-12 glass-panel frost-effect relative overflow-hidden text-center animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold-dim)]/20 to-transparent pointer-events-none" />

                {/* Christmas Victory Decorations */}
                <div className="absolute top-4 left-4 text-4xl opacity-70" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }}>
                    🎄
                </div>
                <div className="absolute top-4 right-4 text-4xl opacity-70" style={{ animation: 'twinkle 1.5s ease-in-out infinite', animationDelay: '0.5s' }}>
                    🎁
                </div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-70" style={{ animation: 'twinkle 1.5s ease-in-out infinite', animationDelay: '1s' }}>
                    ⭐
                </div>
                <div className="absolute bottom-4 right-4 text-4xl opacity-70" style={{ animation: 'twinkle 1.5s ease-in-out infinite', animationDelay: '1.5s' }}>
                    🎅
                </div>

                <h2 className="text-5xl font-magic mb-6 text-gradient-gold drop-shadow-lg relative z-10">
                    London Calling!
                </h2>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent mx-auto mb-8"></div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <img
                        src="/LondonsCallingJaroLeto2026.jpg"
                        alt="London's Calling - Jaro Leto 2026"
                        className="w-full h-auto rounded-lg shadow-2xl animate-float filter drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                    />
                </div>

                <p className="text-xl mb-4 font-serif text-[var(--color-text)] leading-relaxed relative z-10">
                    You have successfully navigated the history of London.
                    <br />
                    Platform 9 ¾ awaits you at King's Cross.
                </p>
                <p className="text-2xl font-serif text-[var(--color-christmas-red)] leading-relaxed relative z-10">
                    🎄 Merry Christmas! 🎅
                </p>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!attemptVault(password)) {
            setError(true);
            setTimeout(() => setError(false), 800);
        }
    };

    return (
        <div className="mt-20 glass-panel frost-effect p-10 text-center relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50"></div>

            {/* Christmas Decorations on Vault */}
            <div className="absolute top-4 left-1/4 text-2xl opacity-50" style={{ animation: 'twinkle 2s ease-in-out infinite' }}>
                ❄️
            </div>
            <div className="absolute top-4 right-1/4 text-2xl opacity-50" style={{ animation: 'twinkle 2s ease-in-out infinite', animationDelay: '1s' }}>
                ❄️
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">
                <Key size={28} className="text-[var(--color-gold)] animate-pulse-glow" />
                <h2 className="text-3xl font-heading m-0 text-gradient-gold tracking-widest uppercase">The Final Vault</h2>
                <Key size={28} className="transform scale-x-[-1] text-[var(--color-gold)] animate-pulse-glow" />
            </div>

            <p className="mb-10 text-[var(--color-text-muted)] font-serif italic text-lg">
                Combine the 12 hidden letters to reveal the password.
            </p>

            {/* Progress Slots */}
            <div className="flex justify-center gap-2 md:gap-3 mb-10 flex-wrap">
                {Array.from({ length: 12 }).map((_, i) => {
                    const isUnlocked = solvedRiddles.includes(i + 1);
                    return (
                        <div
                            key={i}
                            className={`
                                w-10 h-14 md:w-12 md:h-16 border rounded-md flex items-center justify-center font-bold text-lg
                                transition-all duration-500 relative overflow-hidden
                                ${isUnlocked
                                    ? 'bg-[var(--color-gold)] text-[#2a0808] border-[var(--color-gold)] shadow-[0_0_15px_var(--color-gold)] scale-105'
                                    : 'bg-black/40 border-white/10 text-gray-700'}
                            `}
                        >
                            {isUnlocked && <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />}
                            {isUnlocked ? '?' : i + 1}
                        </div>
                    );
                })}
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto relative z-10">
                <div className="relative mb-8 group">
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="ENTER THE PASSWORD"
                        className={`
                            w-full input-magic px-8 py-5 text-center text-2xl tracking-[0.3em] font-bold rounded-lg
                            uppercase placeholder:text-white/10 placeholder:tracking-normal placeholder:font-normal
                            ${error ? 'border-[var(--color-error)] text-[var(--color-error)] animate-[shake_0.4s_ease-in-out]' : ''}
                        `}
                    />
                    <div className="absolute inset-0 rounded-lg bg-[var(--color-gold)] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                </div>

                <button
                    type="submit"
                    className="btn-primary px-16 py-4 text-lg font-bold tracking-widest flex items-center justify-center gap-3 mx-auto group"
                >
                    <span>Unlock the Time Spell</span>
                    <Sparkles className="text-[var(--color-gold)] group-hover:animate-spin" size={20} />
                </button>
            </form>
        </div>
    );
};
