import React from 'react';
import { Scroll, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const Intro: React.FC = () => {
    const { startGame } = useGame();

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-[#f0e6d2] text-[#2a2a2a] p-8 md:p-12 rounded-lg shadow-2xl transform rotate-1 relative animate-fade-in">
                {/* Decorations */}
                <div className="absolute top-4 left-4 text-[#4a0e0e] opacity-20">
                    <Sparkles size={48} />
                </div>
                <div className="absolute bottom-4 right-4 text-[#4a0e0e] opacity-20">
                    <Scroll size={48} />
                </div>

                <div className="text-center font-serif">
                    <h2 className="text-[#4a0e0e] text-xl font-bold uppercase tracking-widest mb-2 font-heading">
                        Ministry of Magic
                    </h2>
                    <div className="h-px w-32 bg-[#4a0e0e] mx-auto mb-8 opacity-50"></div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#4a0e0e] font-magic">
                        The Alchemist's London
                    </h1>

                    <div className="text-lg leading-relaxed mb-8 font-body font-medium italic">
                        <p className="mb-4">
                            "A magical fog has descended upon the city, freezing time itself. To break the spell and return to the Muggle world, you must traverse the history and magic of London."
                        </p>
                        <p>
                            "Find the 12 hidden letters to form the password for the Golden Snitch."
                        </p>
                    </div>

                    <button
                        onClick={startGame}
                        className="bg-[#4a0e0e] text-[#f0e6d2] px-8 py-3 rounded text-lg font-bold
                     hover:bg-[#681414] hover:scale-105 transform transition-all shadow-lg
                     border-2 border-[#c5a059]"
                    >
                        Enter The Leaky Cauldron
                    </button>
                </div>
            </div>
        </div>
    );
};
