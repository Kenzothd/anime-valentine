import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { IntroSection } from "./components/IntroSection";
import { StorySection } from "./components/StorySection";
import {
  InteractiveSection,
  type Choices
} from "./components/InteractiveSection";
import { ConfessionSection } from "./components/ConfessionSection";
import { DecisionSection } from "./components/DecisionSection";
import { CelebrationSection } from "./components/CelebrationSection";
import { HiddenMessageSection } from "./components/HiddenMessageSection";
import { useBackgroundMusic, usePrefersReducedMotion } from "./hooks";
import { MusicToggle } from "./components/MusicToggle";

type Step =
  | "intro"
  | "story"
  | "interactive"
  | "confession"
  | "decision"
  | "celebration"
  | "secret";

function App() {
  const [step, setStep] = useState<Step>("intro");
  const [choices, setChoices] = useState<Choices>({});
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const mainMusic = useBackgroundMusic("/always-with-me.mp3", true);
  const endingMusic = useBackgroundMusic("/akaza-love-theme.mp3", false);

  // Force stop Always With Me when in secret scene
  useEffect(() => {
    if (step === "secret") {
      mainMusic.pause();
    }
  }, [step, mainMusic]);

  const backgroundImage =
    step === "secret" && secretUnlocked
      ? "url('/ending.gif')"
      : "url('/valentine-scenery.png')";

  return (
    <div
      className="min-h-screen bg-ghibliSky-700 text-slate-50 bg-cover bg-center"
      style={{ backgroundImage }}
    >
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-50">
        <div className="absolute inset-x-0 top-6 h-40 bg-[radial-gradient(circle_at_top,rgba(190,227,248,0.6),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(circle_at_bottom,rgba(225,239,199,0.7),transparent_60%)]" />
      </div>
      <MusicToggle
        isPlaying={step === "secret" ? endingMusic.isPlaying : mainMusic.isPlaying}
        onToggle={() => {
          if (step === "secret") {
            // ensure main track is off whenever we toggle the ending theme
            if (mainMusic.isPlaying) {
              mainMusic.pause();
            }
            endingMusic.toggle();
          } else {
            mainMusic.toggle();
          }
        }}
      />
      <main
        className="relative max-w-md mx-auto sm:max-w-xl"
        onClick={() => {
          // First user interaction should attempt to start the correct track.
          // iOS Safari requires synchronous calls - don't use async/await
          // Try to play even if not ready - iOS may need user interaction to initialize
          if (step === "secret" && secretUnlocked) {
            if (!endingMusic.isPlaying) {
              endingMusic.playFrom(17);
            }
          } else if (!mainMusic.isPlaying) {
            mainMusic.play();
          }
        }}
      >
        <AnimatePresence mode={prefersReducedMotion ? "sync" : "wait"}>
          {step === "intro" && (
            <IntroSection
              key="intro"
              onStart={() => setStep("story")}
              onMusicStart={() => {
                // iOS Safari requires synchronous call from user interaction
                // Try to play even if not ready - iOS may need user interaction to initialize
                if (!mainMusic.isPlaying) {
                  mainMusic.play();
                }
              }}
            />
          )}
          {step === "story" && (
            <StorySection key="story" onNext={() => setStep("interactive")} />
          )}
          {step === "interactive" && (
            <InteractiveSection
              key="interactive"
              value={choices}
              onChange={setChoices}
              onNext={() => setStep("confession")}
            />
          )}
          {step === "confession" && (
            <ConfessionSection
              key="confession"
              choices={choices}
              onReadyToAsk={() => setStep("decision")}
            />
          )}
          {step === "decision" && (
            <DecisionSection
              key="decision"
              onYes={() => setStep("celebration")}
            />
          )}
          {step === "celebration" && (
            <CelebrationSection
              key="celebration"
              onRevealSecret={() => {
                // when entering secret, switch from main music to ending theme
                if (mainMusic.isPlaying) {
                  mainMusic.pause();
                }
                setSecretUnlocked(false);
                setStep("secret");
              }}
            />
          )}
          {step === "secret" && (
            <HiddenMessageSection
              key="secret"
              unlocked={secretUnlocked}
              onUnlock={() => {
                // FORCE STOP Always With Me before unlocking
                mainMusic.pause();
                setSecretUnlocked(true);
                // iOS Safari requires synchronous call from user interaction
                // Try to play even if not ready - iOS may need user interaction to initialize
                if (!endingMusic.isPlaying) {
                  endingMusic.playFrom(17);
                }
              }}
            />
          )}
        </AnimatePresence>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-10 bg-ghibliSky-900/95 backdrop-blur-sm border-t border-ghibliLeaf-300/30 px-4 py-2">
        <div className="flex flex-col items-center gap-2 max-w-2xl mx-auto">
          <p className="text-xs text-white/90 text-center">
            Disclaimer: All artwork and music used in this app are not mine. This
            whole app is just for fun and personal use. ♡
          </p>
          <a
            href="https://github.com/Kenzothd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
            aria-label="Visit Kenzo's GitHub profile"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-xs">GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;

