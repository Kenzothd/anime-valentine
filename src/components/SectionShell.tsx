import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type SectionShellProps = PropsWithChildren<{
  title?: string;
}>;

export function SectionShell({ title, children }: SectionShellProps) {
  return (
    <motion.section
      className="min-h-screen flex items-center justify-center px-4 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-md sm:max-w-xl mx-auto">
        {title && (
          <div className="mb-5 flex justify-center">
            <h1 className="inline-block px-4 py-1 rounded-full bg-ghibliSky-900/85 text-2xl md:text-3xl font-semibold text-ghibliCream shadow-soft-card">
              {title}
            </h1>
          </div>
        )}
        <div className="bg-ghibliSky-900/70 border border-ghibliLeaf-300/40 shadow-soft-card rounded-3xl p-5 md:p-7 backdrop-blur-xl">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

