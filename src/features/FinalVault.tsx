import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Key } from 'lucide-react';

export const FinalVault: React.FC = () => {
    const { solvedRiddles, attemptVault, isGameWon } = useGame();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    // If game is won, show victory
    if (isGameWon) {
        return (
            <div className="mt-12 p-8 bg-gradient-to-r from-[var(--color-gold)] to-[#f0e6d2] rounded-lg shadow-glow text-center animate-fade-in text-[#2a2a2a]">
                <h2 className="text-4xl font-magic mb-4 text-[#4a0e0e]">
                    The Golden Snitch Opens!
                </h2>
                <p className="text-xl mb-6 font-serif">
                    You have successfully navigated the history of London.
                    <br />
                    Platform 9 ¾ awaits you at King's Cross.
                </p>
                <div className="text-6xl animate-bounce">
                    ⚡🚂🦉
                </div>
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
        <div className="mt-16 glass-panel p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50"></div>

            <div className="flex items-center justify-center gap-2 mb-6 text-[var(--color-gold)]">
                <Key size={24} />
                <h2 className="text-2xl font-heading m-0 text-white">The Final Vault</h2>
                <Key size={24} className="transform scale-x-[-1]" />
            </div>

            <p className="mb-8 text-gray-300">
                Combine the 12 letters in order to reveal the password.
            </p>

            {/* Progress Slots */}
            <div className="flex justify-center gap-1 md:gap-2 mb-8 flex-wrap">
                {Array.from({ length: 12 }).map((_, i) => {
                    const isUnlocked = solvedRiddles.includes(i + 1);
                    return (
                        <div
                            key={i}
                            className={`
                w-8 h-10 md:w-10 md:h-12 border rounded flex items-center justify-center font-bold
                transition-all duration-500
                ${isUnlocked
                                    ? 'bg-[var(--color-gold)] text-[#2a2a2a] border-[var(--color-gold)] shadow-[0_0_10px_var(--color-gold)]'
                                    : 'bg-black/30 border-[#444] text-gray-600'}
              `}
                        >
                            {isUnlocked ? '?' : i + 1}
                        </div>
                    );
                })}
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="ENTER THE PASSWORD"
                        className={`
              w-full bg-[#111] border-2 px-6 py-4 text-center text-xl tracking-[0.2em] font-bold text-[var(--color-gold)]
              rounded focus:outline-none focus:border-[var(--color-gold)] uppercase placeholder:text-gray-700
              transition-all
              ${error ? 'border-[var(--color-error)] text-[var(--color-error)] animate-[shake_0.4s_ease-in-out]' : 'border-[#444]'}
            `}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 px-12 py-3 bg-gradient-to-r from-[#4a0e0e] to-[#681414] 
                   text-[#f0e6d2] font-heading font-bold rounded shadow-lg
                   hover:scale-105 active:scale-95 transition-all
                   border border-[#c5a059]"
                >
                    Unlock the Time Spell
                </button>
            </form>
        </div>
    );
};
