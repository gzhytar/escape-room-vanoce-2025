import React, { useEffect, useState } from 'react';

interface Snowflake {
    id: number;
    left: number;
    animationDuration: number;
    animationDelay: number;
    fontSize: number;
}

export const Snowfall: React.FC = () => {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        // Generate snowflakes
        const flakes: Snowflake[] = [];
        const numberOfFlakes = 50;

        for (let i = 0; i < numberOfFlakes; i++) {
            flakes.push({
                id: i,
                left: Math.random() * 100, // Random position from 0-100%
                animationDuration: 10 + Math.random() * 20, // 10-30 seconds
                animationDelay: Math.random() * 10, // 0-10 seconds delay
                fontSize: 0.5 + Math.random() * 1.5, // 0.5-2em
            });
        }

        setSnowflakes(flakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: `${flake.left}%`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.animationDelay}s`,
                        fontSize: `${flake.fontSize}em`,
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
};
