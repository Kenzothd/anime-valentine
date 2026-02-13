import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";

type IntroSectionProps = {
  onStart: () => void;
};

export function IntroSection({ onStart }: IntroSectionProps) {
  return (
    <SectionShell>
      <div className="flex flex-col items-center text-center gap-6">
        <motion.img
          src="/valentine-couple.png"
          alt="A cute anime-style couple standing together"
          className="w-40 h-40 md:w-52 md:h-52 object-contain drop-shadow-lg rounded-3xl bg-ghibliCream/60"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.p
          className="text-lg md:text-xl text-ghibliCream leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Hey love… I made a tiny anime story just for you.
        </motion.p>
        <motion.p
          className="text-sm text-ghibliCream/80 max-w-xs sm:max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          It&apos;s our own little Valentine episode. Take your time, scroll
          gently, and tap when you&apos;re ready.
        </motion.p>
        <motion.button
          type="button"
          onClick={onStart}
          className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ghibliLeaf-300 text-ghibliInk font-medium shadow-soft-card hover:bg-ghibliLeaf-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ghibliCream focus-visible:ring-offset-2 focus-visible:ring-offset-ghibliSky-900 transition"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Start our little story
          <span aria-hidden="true">(＾▽＾)</span>
        </motion.button>
      </div>
    </SectionShell>
  );
}

