import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { useTypewriter } from "../hooks";

type HiddenMessageSectionProps = {
  unlocked: boolean;
  onUnlock: () => void;
};

const messageLines = [
  "Thank you for being my favorite person, my safe place, and my accidental main character. I don't know what the future looks like, but I know I want you in all of it.",
  "On the loud days, on the soft days, on the days where we're both just tired little blobs—thank you for letting me love you.",
  "P.S. Future us, if you're rereading this on some random night: I still pick you. Every time.",
  "— from me, to my Valentine ♡"
];

function TypewriterMessage({ text, index, allLines, speed = 25 }: { text: string; index: number; allLines: string[]; speed?: number }) {
  // Calculate delay: wait for all previous lines to finish typing
  // Each character takes 'speed' ms, plus 300ms pause between lines
  const delay = allLines.slice(0, index).reduce((acc, prevText) => acc + prevText.length * speed + 300, 500);
  const { displayedText } = useTypewriter(text, speed, delay);

  if (index === 3) {
    // Last line (signature) - right aligned
    return (
      <motion.span
        className="block mt-4 text-right font-handwriting text-white text-lg md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {displayedText}
        {displayedText.length < text.length && (
          <span className="animate-pulse">|</span>
        )}
      </motion.span>
    );
  }

  if (index === 2) {
    // P.S. line
    return (
      <motion.span
        className="block mt-4 text-sm md:text-base text-white/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {displayedText}
        {displayedText.length < text.length && (
          <span className="animate-pulse">|</span>
        )}
      </motion.span>
    );
  }

  return (
    <motion.span
      className="block mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayedText}
      {displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </motion.span>
  );
}

export function HiddenMessageSection({
  unlocked,
  onUnlock,
}: HiddenMessageSectionProps) {
  if (!unlocked) {
    return (
      <SectionShell>
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-white max-w-xs sm:max-w-sm">
            There&apos;s a tiny secret epilogue hidden here. Tap the glowing
            heart three times to unlock it.
          </p>
          <TripleTapHeart onUnlock={onUnlock} />
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell>
      <motion.div
        className="relative rounded-3xl border border-ghibliLeaf-300/40 shadow-soft-card overflow-hidden"
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="absolute inset-0">
          <img
            src="/ending.gif"
            alt="Animated gif showing a soft romantic ending scene"
            className="w-full h-full object-cover blur-sm"
          />
        </div>
        <div className="relative bg-ghibliSky-900/98 p-6 md:p-8">
          <p className="text-base md:text-lg text-white font-medium leading-relaxed space-y-3 tracking-wide">
            {messageLines.map((line, index) => (
              <TypewriterMessage key={index} text={line} index={index} allLines={messageLines} />
            ))}
          </p>
        </div>
      </motion.div>
    </SectionShell>
  );
}

function TripleTapHeart({ onUnlock }: { onUnlock: () => void }) {
  const handleClick = () => {
    taps += 1;
    if (taps >= 3) {
      taps = 0;
      onUnlock();
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="w-16 h-16 rounded-full bg-gradient-to-br from-ghibliBlush-300 to-ghibliLeaf-200 shadow-soft-card flex items-center justify-center text-3xl text-ghibliInk focus:outline-none focus-visible:ring-2 focus-visible:ring-ghibliCream focus-visible:ring-offset-2 focus-visible:ring-offset-ghibliSky-900"
      animate={{
        scale: [1, 1.1, 1],
        boxShadow: [
          "0 0 0 0 rgba(248, 113, 113, 0.6)",
          "0 0 0 12px rgba(248, 113, 113, 0)",
          "0 0 0 0 rgba(248, 113, 113, 0)",
        ],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      <span aria-hidden="true">♡</span>
      <span className="sr-only">
        Tap three times to unlock the secret message
      </span>
    </motion.button>
  );
}

let taps = 0;
