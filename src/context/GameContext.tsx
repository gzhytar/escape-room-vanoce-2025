import React, { createContext, useContext, useState, useEffect } from 'react';
import { RIDDLES, FINAL_PASSWORD } from '../data/gameData';

const INITIAL_TIME = 30 * 60; // 30 minutes in seconds
const EXTENSION_TIME = 15 * 60; // 15 minutes in seconds

interface GameState {
    solvedRiddles: number[];
    hasSeenIntro: boolean;
    isVaultOpen: boolean;
    isGameWon: boolean;
    timeRemaining: number;
    timerStartTime: number | null;
    hasExtended: boolean;
    isTimerExpired: boolean;
}

interface GameContextType extends GameState {
    startGame: () => void;
    solveRiddle: (id: number, answer: string) => boolean;
    attemptVault: (password: string) => boolean;
    openVault: () => void;
    extendTimer: () => void;
    dismissTimeUp: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [solvedRiddles, setSolvedRiddles] = useState<number[]>([]);
    const [hasSeenIntro, setHasSeenIntro] = useState(false);
    const [isVaultOpen, setIsVaultOpen] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME);
    const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
    const [hasExtended, setHasExtended] = useState(false);
    const [isTimerExpired, setIsTimerExpired] = useState(false);

    // Load progress from local storage
    useEffect(() => {
        const saved = localStorage.getItem('alchemist_save');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSolvedRiddles(parsed.solvedRiddles || []);
                setHasSeenIntro(parsed.hasSeenIntro || false);
                setIsGameWon(parsed.isGameWon || false);
                setHasExtended(parsed.hasExtended || false);
                setIsTimerExpired(parsed.isTimerExpired || false);

                // Restore timer state
                if (parsed.timerStartTime && parsed.hasSeenIntro && !parsed.isGameWon) {
                    const elapsed = Math.floor((Date.now() - parsed.timerStartTime) / 1000);
                    const initialTime = parsed.hasExtended ? INITIAL_TIME + EXTENSION_TIME : INITIAL_TIME;
                    const remaining = Math.max(0, initialTime - elapsed);
                    setTimeRemaining(remaining);
                    setTimerStartTime(parsed.timerStartTime);
                    if (remaining === 0 && !parsed.isTimerExpired) {
                        setIsTimerExpired(true);
                    }
                } else {
                    setTimeRemaining(INITIAL_TIME);
                }
            } catch (e) {
                console.error("Failed to load save", e);
            }
        }
    }, []);

    // Save progress
    useEffect(() => {
        localStorage.setItem('alchemist_save', JSON.stringify({
            solvedRiddles,
            hasSeenIntro,
            isGameWon,
            timerStartTime,
            hasExtended,
            isTimerExpired
        }));
    }, [solvedRiddles, hasSeenIntro, isGameWon, timerStartTime, hasExtended, isTimerExpired]);

    // Timer countdown
    useEffect(() => {
        if (!hasSeenIntro || isGameWon || isTimerExpired) return;

        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    setIsTimerExpired(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [hasSeenIntro, isGameWon, isTimerExpired]);

    const startGame = () => {
        setHasSeenIntro(true);
        setTimerStartTime(Date.now());
    };

    const solveRiddle = (id: number, answer: string): boolean => {
        const riddle = RIDDLES.find(r => r.id === id);
        if (!riddle) return false;

        const normalizedAnswer = answer.trim().toLowerCase();
        if (riddle.validAnswers.includes(normalizedAnswer)) {
            if (!solvedRiddles.includes(id)) {
                setSolvedRiddles([...solvedRiddles, id]);
            }
            return true;
        }
        return false;
    };

    const attemptVault = (password: string): boolean => {
        const normalized = password.trim().toUpperCase();
        if (normalized === FINAL_PASSWORD) {
            setIsGameWon(true);
            return true;
        }
        return false;
    };

    const openVault = () => setIsVaultOpen(true);

    const extendTimer = () => {
        if (!hasExtended) {
            setTimeRemaining(EXTENSION_TIME);
            setTimerStartTime(Date.now());
            setHasExtended(true);
            setIsTimerExpired(false);
        }
    };

    const dismissTimeUp = () => {
        // Allow dismissing the dialog if already extended (game over)
        if (hasExtended) {
            setIsTimerExpired(false);
        }
    };

    return (
        <GameContext.Provider value={{
            solvedRiddles,
            hasSeenIntro,
            isVaultOpen,
            isGameWon,
            timeRemaining,
            timerStartTime,
            hasExtended,
            isTimerExpired,
            startGame,
            solveRiddle,
            attemptVault,
            openVault,
            extendTimer,
            dismissTimeUp
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGame must be used within a GameProvider");
    return context;
};
