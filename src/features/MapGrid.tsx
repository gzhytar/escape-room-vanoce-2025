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
        <div className="container animate-fade-in">
            <header className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl text-[var(--color-gold)] mb-4">
                    London Locations
                </h2>
                <p className="text-[var(--color-parchment)] opacity-80 max-w-xl mx-auto">
                    Explore the city. Solve the riddles to collect the letters.
                    <br />
                    <span className="text-[var(--color-accent)]">
                        Progress: {solvedRiddles.length} / 12
                    </span>
                </p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {RIDDLES.map((riddle) => {
                    const isSolved = solvedRiddles.includes(riddle.id);

                    return (
                        <button
                            key={riddle.id}
                            onClick={() => setSelectedRiddleId(riddle.id)}
                            className={`
                relative p-6 rounded-lg border-2 transition-all duration-300 group
                flex flex-col items-center justify-center aspect-square text-center
                ${isSolved
                                    ? 'bg-[rgba(74,14,14,0.3)] border-[var(--color-gold)] shadow-[0_0_15px_rgba(197,160,89,0.2)]'
                                    : 'bg-[var(--color-card-bg)] border-[#444] hover:border-[var(--color-gold)] hover:translate-y-[-4px]'}
              `}
                        >
                            <div className="text-4xl mb-4 transition-transform group-hover:scale-110">
                                {riddle.gridLabel}
                            </div>

                            <h3 className={`text-sm md:text-base font-bold mb-2 ${isSolved ? 'text-[var(--color-gold)]' : 'text-gray-400'}`}>
                                {isSolved ? riddle.title : `Location #${riddle.id}`}
                            </h3>

                            {isSolved ? (
                                <div className="absolute top-2 right-2 flex items-center gap-1 text-[var(--color-gold)]">
                                    <span className="font-bold text-xs">SOLVED</span>
                                    <Unlock size={14} />
                                </div>
                            ) : (
                                <div className="absolute top-2 right-2 text-gray-600">
                                    <Lock size={14} />
                                </div>
                            )}

                            {isSolved && (
                                <div className="mt-2 text-2xl font-bold text-[var(--color-accent)] animate-pulse">
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
