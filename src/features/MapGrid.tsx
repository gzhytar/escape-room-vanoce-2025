import React, { useState } from 'react';
import { RIDDLES } from '../data/gameData';
import { useGame } from '../context/GameContext';
import { Lock, Unlock } from 'lucide-react';
import { RiddleModal } from './RiddleModal';

export const MapGrid: React.FC = () => {
    const { solvedRiddles } = useGame();
    const [selectedRiddleId, setSelectedRiddleId] = useState<number | null>(null);

    const selectedRiddle = RIDDLES.find(r => r.id === selectedRiddleId);

    return (
        <div className="container animate-fade-in relative z-10">
            <header className="mb-14 text-center">
                <h2 className="text-4xl md:text-5xl mb-4 font-bold tracking-wider">
                    <span className="text-gradient-gold drop-shadow-sm">London Locations</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[var(--color-gold-dim)] to-transparent mx-auto mb-6 opacity-60"></div>
                <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto font-serif">
                    Explore the city. Solve the riddles to collect the letters.
                </p>
                <p className="text-[var(--color-christmas-red)] text-base max-w-xl mx-auto font-serif mt-2 opacity-80">
                    ❄️ Winter magic fills the streets of London ❄️
                </p>
                <div className="mt-4 inline-flex items-center px-4 py-1 rounded-full border border-[var(--color-gold-dim)] bg-black/40 text-[var(--color-gold)] font-mono text-sm">
                    Progress: {solvedRiddles.length} / 12
                </div>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
                {RIDDLES.map((riddle) => {
                    const isSolved = solvedRiddles.includes(riddle.id);

                    return (
                        <button
                            key={riddle.id}
                            onClick={() => setSelectedRiddleId(riddle.id)}
                            className={`
                                relative p-6 rounded-xl border transition-all duration-300 group
                                flex flex-col items-center justify-center aspect-square text-center
                                backdrop-blur-md overflow-hidden
                                ${isSolved
                                    ? 'bg-[rgba(74,14,14,0.4)] border-[var(--color-gold)] shadow-[0_0_20px_rgba(197,160,89,0.15)]'
                                    : 'bg-[rgba(255,255,255,0.03)] border-white/10 hover:border-[var(--color-gold-dim)] hover:bg-[rgba(255,255,255,0.05)] hover:translate-y-[-4px] hover:shadow-xl'}
                            `}
                        >
                            {/* Background decoration for solved items */}
                            {isSolved && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent)] pointer-events-none" />}

                            <div className={`text-5xl mb-5 transition-transform duration-500 ${isSolved ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]' : 'group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100'}`}>
                                {riddle.gridLabel}
                            </div>

                            <h3 className={`text-sm md:text-base font-bold mb-1 tracking-wide ${isSolved ? 'text-[var(--color-gold)]' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                {isSolved ? riddle.title : `Location #${riddle.id}`}
                            </h3>

                            {isSolved ? (
                                <div className="absolute top-3 right-3 flex items-center gap-1 text-[var(--color-gold)] animate-pulse-glow">
                                    <Unlock size={14} />
                                </div>
                            ) : (
                                <div className="absolute top-3 right-3 text-gray-600 group-hover:text-gray-400 transition-colors">
                                    <Lock size={14} />
                                </div>
                            )}

                            {isSolved && (
                                <div className="absolute bottom-2 text-3xl font-magic text-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    {riddle.rewardLetter}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {selectedRiddle && (
                <RiddleModal
                    riddle={selectedRiddle}
                    onClose={() => setSelectedRiddleId(null)}
                />
            )}
        </div>
    );
};
