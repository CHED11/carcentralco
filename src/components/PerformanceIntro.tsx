import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cinematic full-screen transition played when a customer enters the
 * Performance Collection. Premium and restrained — a dark curtain, a
 * heat-line sweep, and a division reveal — never gimmicky.
 */
export function PerformanceIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#080808]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* heat atmosphere */}
          <motion.div
            className="perf-spotlight absolute inset-0"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="perf-grid absolute inset-0 opacity-40" />

          {/* sweeping heat line */}
          <motion.div
            className="perf-line absolute left-0 top-1/2 h-[2px] w-full opacity-80"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          />

          <div className="relative px-6 text-center">
            <motion.p
              className="text-[0.7rem] font-semibold uppercase tracking-[0.5em] text-silver-dim"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Entering
            </motion.p>
            <motion.h2
              className="perf-text mt-4 font-display text-5xl uppercase tracking-wide sm:text-7xl"
              initial={{ opacity: 0, y: 24, letterSpacing: "0.4em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.04em" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Performance
            </motion.h2>
            <motion.p
              className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-silver/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Division
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
