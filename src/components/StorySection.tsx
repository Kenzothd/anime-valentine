import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { useTypewriter } from "../hooks";

type StorySectionProps = {
  onNext: () => void;
};

const memories = [
  "From the very first time we met, something quietly clicked into place.",
  "You laugh at my terrible jokes, and somehow make them feel like masterpieces.",
  "Even the most ordinary days feel like anime filler episodes I actually enjoy.",
  "You are my favorite notification, my safest person, and my softest home.",
];

function TypewriterCard({ text, index, speed = 50 }: { text: string; index: number; speed?: number }) {
  // Calculate delay: wait for all previous lines to finish typing
  // Each character takes 'speed' ms, plus 300ms pause between cards
  const delay = memories.slice(0, index).reduce((acc, prevText) => acc + prevText.length * speed + 300, 300);
  const { displayedText } = useTypewriter(text, speed, delay);

  return (
    <motion.article
      className="bg-ghibliSky-900/85 border border-ghibliLeaf-300/40 rounded-2xl px-4 py-3 shadow-soft-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-sm md:text-base text-white font-medium">
        {displayedText}
        {displayedText.length < text.length && (
          <span className="animate-pulse">|</span>
        )}
      </p>
    </motion.article>
  );
}

export function StorySection({ onNext }: StorySectionProps) {
  return (
    <SectionShell title="Previously… in our story">
      <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
        {memories.map((text, index) => (
          <TypewriterCard key={index} text={text} index={index} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <motion.button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ghibliLeaf-300 text-ghibliInk font-medium shadow-soft-card hover:bg-ghibliLeaf-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ghibliCream focus-visible:ring-offset-2 focus-visible:ring-offset-ghibliSky-900 transition"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
          <span aria-hidden="true">(☆ω☆)</span>
        </motion.button>
      </div>
    </SectionShell>
  );
}
