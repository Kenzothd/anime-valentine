import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";

type DateOption = "movie" | "dinner" | "stargazing" | "arcade";
type MoodOption = "soft" | "chaotic" | "sleepy" | "sparkly";

export type Choices = {
  date?: DateOption;
  mood?: MoodOption;
};

type InteractiveSectionProps = {
  value: Choices;
  onChange: (choices: Choices) => void;
  onNext: () => void;
};

const dateOptions: { id: DateOption; label: string; subtitle: string }[] = [
  { id: "movie", label: "Cozy movie night", subtitle: "Blankets, snacks, your head on my shoulder." },
  { id: "dinner", label: "Fancy dinner", subtitle: "We dress up like we’re in a drama." },
  { id: "stargazing", label: "Stargazing", subtitle: "Just us, the sky, and endless what-ifs." },
  { id: "arcade", label: "Arcade chaos", subtitle: "I try to win you the biggest plushie." }
];

const moodOptions: { id: MoodOption; label: string }[] = [
  { id: "soft", label: "Soft and dreamy" },
  { id: "chaotic", label: "Chaotic gremlin" },
  { id: "sleepy", label: "Sleepy and clingy" },
  { id: "sparkly", label: "Sparkly main character" }
];

export function InteractiveSection({
  value,
  onChange,
  onNext
}: InteractiveSectionProps) {
  const handleDateSelect = (id: DateOption) => {
    onChange({ ...value, date: id });
  };

  const handleMoodSelect = (id: MoodOption) => {
    onChange({ ...value, mood: id });
  };

  const canContinue = value.date && value.mood;

  return (
    <SectionShell title="Tonight’s episode">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-white mb-3 font-medium">
            First, choose our perfect Valentine&apos;s date:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dateOptions.map((opt) => {
              const selected = value.date === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  type="button"
                  onClick={() => handleDateSelect(opt.id)}
                  className={`text-left rounded-2xl px-4 py-3 border shadow-soft-card backdrop-blur-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ghibliCream focus-visible:ring-offset-2 focus-visible:ring-offset-ghibliSky-900 ${
                    selected
                      ? "bg-ghibliLeaf-300/90 border-ghibliLeaf-100 text-ghibliInk"
                      : "bg-ghibliSky-900/85 border-ghibliLeaf-300/40 text-white hover:border-ghibliLeaf-200/80"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-medium text-sm">{opt.label}</div>
                  <div className="text-xs mt-1 opacity-80">{opt.subtitle}</div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm text-white mb-3 font-medium">
            And what kind of you do I get tonight?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {moodOptions.map((opt) => {
              const selected = value.mood === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  type="button"
                  onClick={() => handleMoodSelect(opt.id)}
                  className={`text-center rounded-2xl px-3 py-3 border shadow-soft-card backdrop-blur-md text-xs sm:text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ghibliCream focus-visible:ring-offset-2 focus-visible:ring-offset-ghibliSky-900 ${
                    selected
                      ? "bg-ghibliLeaf-300/90 border-ghibliLeaf-100 text-ghibliInk"
                      : "bg-ghibliSky-900/85 border-ghibliLeaf-300/40 text-white hover:border-ghibliLeaf-200/80"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {opt.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <motion.button
            type="button"
            onClick={onNext}
            disabled={!canContinue}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ghibliLeaf-300 text-ghibliInk font-medium shadow-soft-card disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ghibliLeaf-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ghibliCream focus-visible:ring-offset-2 focus-visible:ring-offset-ghibliSky-900 transition"
            whileHover={canContinue ? { scale: 1.03 } : {}}
            whileTap={canContinue ? { scale: 0.98 } : {}}
          >
            Looks perfect
            <span aria-hidden="true">( ˘͈ ᵕ ˘͈ )</span>
          </motion.button>
        </div>
      </div>
    </SectionShell>
  );
}

