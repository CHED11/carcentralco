import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Black first-load screen with wordmark and a thin silver progress line. */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <p className="eyebrow mb-4 text-[0.6rem] sm:text-xs">Automotive Art For Enthusiasts</p>
            <h1 className="silver-text font-display text-4xl tracking-[0.18em] sm:text-6xl">
              CARCENTRALCO
            </h1>
          </motion.div>

          <div className="mt-10 h-px w-48 overflow-hidden bg-white/10 sm:w-64">
            <motion.div
              className="silver-line h-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
