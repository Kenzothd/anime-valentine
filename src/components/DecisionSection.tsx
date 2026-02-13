import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { SectionShell } from "./SectionShell";

type DecisionSectionProps = {
  onYes: () => void;
};

function AnimeRose() {
  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
      animate={{
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Outer petals */}
      <motion.path
        d="M32 20C28 20 24 22 22 26C20 30 22 34 26 36C30 38 32 40 32 40C32 40 34 38 38 36C42 34 44 30 42 26C40 22 36 20 32 20Z"
        fill="url(#roseGradient1)"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      />
      {/* Middle petals */}
      <motion.path
        d="M32 24C30 24 28 25 27 27C26 29 27 31 29 32C31 33 32 34 32 34C32 34 33 33 35 32C37 31 38 29 37 27C36 25 34 24 32 24Z"
        fill="url(#roseGradient2)"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      />
      {/* Inner petals */}
      <motion.path
        d="M32 28C31 28 30 29 29.5 30C29 31 29.5 32 30.5 32.5C31.5 33 32 33.5 32 33.5C32 33.5 32.5 33 33.5 32.5C34.5 32 35 31 34.5 30C34 29 33 28 32 28Z"
        fill="url(#roseGradient3)"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      {/* Center */}
      <motion.circle
        cx="32"
        cy="32"
        r="3"
        fill="url(#roseGradient4)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      />
      {/* Stem */}
      <motion.path
        d="M32 40L32 50C32 52 30 54 28 54C26 54 24 52 24 50L24 40"
        stroke="url(#stemGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      {/* Leaf */}
      <motion.path
        d="M24 45C22 44 20 45 19 47C18 49 19 51 21 52C23 53 24 52 24 52C24 52 25 53 27 52C29 51 30 49 29 47C28 45 26 44 24 45Z"
        fill="url(#leafGradient)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      />
      {/* Sparkles */}
      <motion.circle
        cx="20"
        cy="18"
        r="2"
        fill="#FFE5F1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.7,
        }}
      />
      <motion.circle
        cx="44"
        cy="20"
        r="1.5"
        fill="#FFE5F1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
        }}
      />
      <motion.circle
        cx="18"
        cy="28"
        r="1"
        fill="#FFE5F1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1.3,
        }}
      />
      {/* Gradients */}
      <defs>
        <linearGradient id="roseGradient1" x1="32" y1="20" x2="32" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB6D9" />
          <stop offset="100%" stopColor="#FF8CC8" />
        </linearGradient>
        <linearGradient id="roseGradient2" x1="32" y1="24" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF8CC8" />
          <stop offset="100%" stopColor="#FF6BB5" />
        </linearGradient>
        <linearGradient id="roseGradient3" x1="32" y1="28" x2="32" y2="33.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6BB5" />
          <stop offset="100%" stopColor="#FF4DA3" />
        </linearGradient>
        <radialGradient id="roseGradient4" cx="32" cy="32" r="3" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF4DA3" />
          <stop offset="100%" stopColor="#E6399B" />
        </radialGradient>
        <linearGradient id="stemGradient" x1="24" y1="40" x2="24" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7CB342" />
          <stop offset="100%" stopColor="#558B2F" />
        </linearGradient>
        <linearGradient id="leafGradient" x1="24" y1="45" x2="29" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#AED581" />
          <stop offset="100%" stopColor="#7CB342" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

export function DecisionSection({ onYes }: DecisionSectionProps) {
  return (
    <SectionShell>
      <div className="space-y-6 text-center relative min-h-[200px]">
        <motion.p
          className="text-lg md:text-xl text-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          So… here&apos;s my question.
        </motion.p>
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <AnimeRose />
          </motion.div>
          <motion.p
            className="text-2xl md:text-3xl font-semibold text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Will you be my Valentine?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <AnimeRose />
          </motion.div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 relative">
          <motion.button
            type="button"
            onClick={onYes}
            className="px-7 py-3 rounded-full bg-ghibliLeaf-300 text-ghibliInk font-semibold shadow-soft-card text-lg hover:bg-ghibliLeaf-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ghibliCream focus-visible:ring-offset-2 focus-visible:ring-offset-ghibliSky-900 transition z-10 min-w-[140px]"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            animate={{
              rotate: [0, -8, 8, -8, 8, -4, 4, 0],
              x: [0, -5, 5, -5, 5, -3, 3, 0],
              scale: [1, 1.05, 1, 1.05, 1]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
          >
            Yes (๑˃̵ᴗ˂̵)ﻭ
          </motion.button>
          <RunawayNoButton />
        </div>
      </div>
    </SectionShell>
  );
}

function RunawayNoButton() {
  const [isFlying, setIsFlying] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleClick = () => {
    if (isFlying) return;
    setIsFlying(true);

    // Get viewport dimensions
    const maxX = typeof window !== "undefined" ? window.innerWidth / 2 - 60 : 200;
    const maxY = typeof window !== "undefined" ? window.innerHeight / 2 - 30 : 200;

    // Create a sequence of random positions
    const positions = Array.from({ length: 8 }, () => ({
      x: (Math.random() - 0.5) * maxX * 2,
      y: (Math.random() - 0.5) * maxY * 2
    }));

    // Animate through positions
    positions.forEach((pos, index) => {
      setTimeout(() => {
        x.set(pos.x);
        y.set(pos.y);
      }, index * 150);
    });

    // Reset after animation
    setTimeout(() => {
      x.set(0);
      y.set(0);
      setTimeout(() => setIsFlying(false), 500);
    }, positions.length * 150 + 500);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onTouchStart={handleClick}
      className="px-7 py-3 rounded-full bg-ghibliSky-900/90 border border-ghibliLeaf-300/50 text-white text-lg font-semibold cursor-pointer select-none z-20 shadow-soft-card min-w-[140px]"
      style={{
        x: springX,
        y: springY
      }}
      whileHover={!isFlying ? { scale: 1.06 } : {}}
      whileTap={!isFlying ? { scale: 0.96 } : {}}
    >
      No (incorrect)
    </motion.button>
  );
}

