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
    <div className="min-h-screen py-8 md:py-16">
      <h1 className="text-center text-5xl font-magic text-[#c5a059] mb-4">
        The Alchemist's London
      </h1>
      <p className="text-center text-[#f0e6d2] opacity-60 mb-12 font-serif italic text-lg">
        "Find the 12 hidden letters to form the password..."
      </p>

      <MapGrid />
      <FinalVault />

      <footer className="text-center text-gray-600 mt-24 text-sm font-sans">
        Built with magic (and Vite)
      </footer>
    </div>
  );
}

export default App;
