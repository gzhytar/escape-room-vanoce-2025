import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const Timer: React.FC = () => {
    const { timeRemaining, isGameWon } = useGame();

    if (isGameWon) return null;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const isLowTime = timeRemaining < 5 * 60; // Less than 5 minutes
    const isCritical = timeRemaining < 60; // Less than 1 minute

    return (
        <div className={`
            inline-flex items-center gap-3 px-6 py-3 rounded-lg
            glass-panel border-2 transition-all duration-300
            ${isCritical
                ? 'border-red-500 bg-red-900/30 animate-pulse'
                : isLowTime
                    ? 'border-orange-500 bg-orange-900/20'
                    : 'border-[var(--color-gold-dim)] bg-black/20'
            }
        `}>
            <div className={`
                ${isCritical ? 'text-red-400 animate-pulse' : isLowTime ? 'text-orange-400' : 'text-[var(--color-gold)]'}
            `}>
                {isCritical ? <AlertCircle size={24} /> : <Clock size={24} />}
            </div>
            <div className="font-mono text-2xl font-bold tracking-wider">
                <span className={`
                    ${isCritical ? 'text-red-300' : isLowTime ? 'text-orange-300' : 'text-[var(--color-text)]'}
                `}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
            </div>
            {isLowTime && (
                <div className={`
                    text-xs uppercase tracking-wider font-bold
                    ${isCritical ? 'text-red-400' : 'text-orange-400'}
                `}>
                    {isCritical ? 'Hurry!' : 'Time Low'}
                </div>
            )}
        </div>
    );
};
