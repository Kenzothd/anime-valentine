import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { SectionShell } from "./SectionShell";

type DecisionSectionProps = {
  onYes: () => void;
};

export function DecisionSection({ onYes }: DecisionSectionProps) {
  return (
    <SectionShell>
      <div className="space-y-6 text-center relative min-h-[200px]">
        <motion.p
          className="text-lg md:text-xl text-ghibliCream/95"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          So… here&apos;s my question.
        </motion.p>
        <motion.p
          className="text-2xl md:text-3xl font-semibold text-ghibliCream"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Will you be my Valentine?
        </motion.p>
        <div className="flex items-center justify-center gap-4 mt-4 relative">
          <motion.button
            type="button"
            onClick={onYes}
            className="px-7 py-3 rounded-full bg-ghibliLeaf-300 text-ghibliInk font-semibold shadow-soft-card text-lg hover:bg-ghibliLeaf-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ghibliCream focus-visible:ring-offset-2 focus-visible:ring-offset-ghibliSky-900 transition z-10"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
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
      className="px-4 py-2 rounded-full bg-ghibliSky-900/80 border border-ghibliLeaf-300/50 text-ghibliCream text-xs cursor-pointer select-none z-20"
      style={{
        x: springX,
        y: springY
      }}
      whileHover={!isFlying ? { scale: 1.1 } : {}}
      animate={!isFlying ? { rotate: [0, -5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
    >
      No (incorrect)
    </motion.button>
  );
}

