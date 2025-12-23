import { useGame } from './context/GameContext';
import { Intro } from './features/Intro';
import { MapGrid } from './features/MapGrid';
import { FinalVault } from './features/FinalVault';

function App() {
  const { hasSeenIntro } = useGame();

  if (!hasSeenIntro) {
    return <Intro />;
  }

  return (
    <div className="min-h-screen py-8 md:py-16 selection:bg-[var(--color-gold)] selection:text-black">
      <header className="mb-20 text-center relative z-10">
        <h1 className="text-6xl md:text-7xl font-magic text-center mb-6 tracking-wide drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
          <span className="text-gradient-gold">The Alchemist's London</span>
        </h1>
        <p className="text-center text-[var(--color-text-muted)] opacity-80 font-serif italic text-xl tracking-wider">
          "Find the 12 hidden letters to form the password..."
        </p>
      </header>

      <div className="max-w-[1400px] mx-auto px-4">
        <MapGrid />
        <FinalVault />
      </div>

      <footer className="text-center text-[var(--color-text-muted)] mt-32 text-sm font-sans opacity-40 hover:opacity-100 transition-opacity">
        Built with magic
      </footer>
    </div>
  );
}

export default App;
