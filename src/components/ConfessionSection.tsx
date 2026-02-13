import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import type { Choices } from "./InteractiveSection";

type ConfessionSectionProps = {
  choices: Choices;
  onReadyToAsk: () => void;
};

const baseLines = [
  "So, here we are… just us, in our own little story.",
  "You’ve seen me at my best, and absolutely at my silliest.",
  "And somehow, you still choose to stay right next to me."
];

export function ConfessionSection({
  choices,
  onReadyToAsk
}: ConfessionSectionProps) {
  const personalizedLine =
    choices.date || choices.mood
      ? `If tonight was ${describeChoices(choices)}, there’s one more thing I’d ask for.`
      : "If this was an anime episode, this would be the scene where everything slows down.";

  const lines = [...baseLines, personalizedLine, "Because there’s something I’ve been wanting to ask you…"];

  return (
    <SectionShell title="The quiet moment">
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ghibliSky-800/95 via-ghibliSky-900/95 to-ghibliLeaf-700/60 p-5 border border-ghibliLeaf-300/40 shadow-soft-card"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-ghibliBlush-300/35 blur-3xl" />
        <div className="absolute -bottom-16 -left-8 w-48 h-48 rounded-full bg-ghibliLeaf-300/25 blur-3xl" />
        <div className="relative space-y-3">
          {lines.map((line, index) => (
            <motion.p
              key={index}
              className="text-sm md:text-base text-white font-medium"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {line}
            </motion.p>
          ))}
          <div className="pt-4 flex justify-end">
            <motion.button
              type="button"
              onClick={onReadyToAsk}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ghibliLeaf-300 text-ghibliInk text-sm font-medium shadow-soft-card hover:bg-ghibliLeaf-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ghibliCream focus-visible:ring-offset-2 focus-visible:ring-offset-ghibliSky-900 transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              I&apos;m listening…
            </motion.button>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}

function describeChoices(choices: Choices): string {
  const parts: string[] = [];
  if (choices.date) {
    if (choices.date === "movie") parts.push("a cozy movie night");
    if (choices.date === "dinner") parts.push("a little fancy dinner");
    if (choices.date === "stargazing") parts.push("a quiet stargazing date");
    if (choices.date === "arcade") parts.push("a chaotic arcade adventure");
  }
  if (choices.mood) {
    parts.push(`you being your ${choices.mood} self`);
  }
  return parts.join(" with ");
}

