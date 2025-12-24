import React from 'react';

export const ChristmasDecorations: React.FC = () => {
    return (
        <>
            {/* Top left corner - Holly */}
            <div className="fixed top-4 left-4 z-40 pointer-events-none">
                <div className="text-4xl holly-decoration drop-shadow-lg">
                    🎄
                </div>
            </div>

            {/* Top right corner - Ornament */}
            <div className="fixed top-4 right-4 z-40 pointer-events-none">
                <div className="text-4xl animate-float drop-shadow-lg" style={{ animationDelay: '1s' }}>
                    🎁
                </div>
            </div>

            {/* Bottom left corner - Candy cane */}
            <div className="fixed bottom-4 left-4 z-40 pointer-events-none">
                <div className="text-4xl animate-float drop-shadow-lg" style={{ animationDelay: '2s' }}>
                    🎅
                </div>
            </div>

            {/* Bottom right corner - Star */}
            <div className="fixed bottom-4 right-4 z-40 pointer-events-none">
                <div className="text-4xl holly-decoration drop-shadow-lg" style={{ animationDelay: '1.5s' }}>
                    ⭐
                </div>
            </div>

            {/* Twinkling lights across the top */}
            <div className="fixed top-0 left-0 right-0 h-12 z-30 pointer-events-none flex justify-around items-center px-4">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="text-2xl"
                        style={{
                            animation: 'twinkle 1.5s ease-in-out infinite',
                            animationDelay: `${i * 0.2}s`,
                            color: i % 3 === 0 ? '#c41e3a' : i % 3 === 1 ? '#ffd700' : '#165b33',
                        }}
                    >
                        ●
                    </div>
                ))}
            </div>
        </>
    );
};
