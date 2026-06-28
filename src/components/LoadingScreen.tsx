import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Black first-load screen with wordmark and a thin silver progress line. */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* ambient light + grain */}
          <div className="aurora-silver pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl" aria-hidden />
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center"
          >
            <p className="eyebrow mb-4 text-[0.6rem] sm:text-xs">Automotive Art For Enthusiasts</p>
            <h1 className="silver-text font-display text-4xl tracking-[0.18em] sm:text-6xl">
              CARCENTRALCO
            </h1>
          </motion.div>

          <div className="relative mt-10 h-px w-48 overflow-hidden bg-white/10 sm:w-64">
            <motion.div
              className="silver-line h-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
