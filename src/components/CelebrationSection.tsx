import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";

type CelebrationSectionProps = {
  onRevealSecret: () => void;
};

const hearts = Array.from({ length: 14 });

export function CelebrationSection({
  onRevealSecret,
}: CelebrationSectionProps) {
  return (
    <SectionShell title="Correct answer">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ghibliBlush-300/80 via-ghibliCream to-ghibliLeaf-200/80 p-6 md:p-8 shadow-soft-card">
        <div className="absolute inset-0 pointer-events-none">
          {hearts.map((_, index) => (
            <motion.span
              key={index}
              className="absolute text-ghibliBlush-50/80"
              initial={{
                opacity: 0,
                y: 60,
                x: Math.random() * 260 - 130,
                scale: 0.5 + Math.random() * 0.6,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [-20, -80 - Math.random() * 40],
                x: "+=10",
              }}
              transition={{
                duration: 3.2 + Math.random(),
                delay: index * 0.1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              ♥
            </motion.span>
          ))}
        </div>
        <div className="relative text-center space-y-3">
          <p className="text-xl md:text-2xl font-semibold text-ghibliInk">
            You said yes. Obviously. ✧
          </p>
          <p className="text-sm md:text-base text-ghibliInk/90 max-w-md mx-auto">
            I&apos;m officially the luckiest person in this entire silly little
            universe. Thank you for choosing me, again and again.
          </p>
          <p className="text-xs text-ghibliInk/80">
            (There may or may not be a secret post-credit scene.)
          </p>
          <motion.button
            type="button"
            onClick={onRevealSecret}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ghibliInk text-ghibliCream text-sm font-medium shadow-soft-card hover:bg-ghibliSky-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-ghibliCream focus-visible:ring-offset-2 focus-visible:ring-offset-ghibliLeaf-200 transition"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Tap here to continue
            <span aria-hidden="true">(つ≧▽≦)つ</span>
          </motion.button>
        </div>
      </div>
    </SectionShell>
  );
}
