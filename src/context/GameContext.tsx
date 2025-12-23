import React, { createContext, useContext, useState, useEffect } from 'react';
import { RIDDLES, FINAL_PASSWORD } from '../data/gameData';

interface GameState {
    solvedRiddles: number[];
    hasSeenIntro: boolean;
    isVaultOpen: boolean;
    isGameWon: boolean;
}

interface GameContextType extends GameState {
    startGame: () => void;
    solveRiddle: (id: number, answer: string) => boolean;
    attemptVault: (password: string) => boolean;
    openVault: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [solvedRiddles, setSolvedRiddles] = useState<number[]>([]);
    const [hasSeenIntro, setHasSeenIntro] = useState(false);
    const [isVaultOpen, setIsVaultOpen] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);

    // Load progress from local storage
    useEffect(() => {
        const saved = localStorage.getItem('alchemist_save');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSolvedRiddles(parsed.solvedRiddles || []);
                setHasSeenIntro(parsed.hasSeenIntro || false);
                setIsGameWon(parsed.isGameWon || false);
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
            isGameWon
        }));
    }, [solvedRiddles, hasSeenIntro, isGameWon]);

    const startGame = () => setHasSeenIntro(true);

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

    return (
        <GameContext.Provider value={{
            solvedRiddles,
            hasSeenIntro,
            isVaultOpen,
            isGameWon,
            startGame,
            solveRiddle,
            attemptVault,
            openVault
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
