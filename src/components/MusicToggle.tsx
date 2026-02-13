type MusicToggleProps = {
  isPlaying: boolean;
  onToggle: () => void;
};

export function MusicToggle({ isPlaying, onToggle }: MusicToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed top-4 right-4 z-20 rounded-full w-10 h-10 flex items-center justify-center bg-ghibliSky-900/80 border border-ghibliLeaf-300/60 text-ghibliCream text-sm shadow-soft-card backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ghibliCream focus-visible:ring-offset-2 focus-visible:ring-offset-ghibliSky-800"
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
    >
      {isPlaying ? "♪" : "♫"}
    </button>
  );
}

