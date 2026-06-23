import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroAtmosphere from "@/assets/hero-atmosphere.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Parallax atmospheric background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 scale-110">
        <img
          src={heroAtmosphere}
          alt=""
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 spotlight opacity-70" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="mx-auto max-w-4xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="eyebrow"
        >
          Automotive Art For Enthusiasts
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 font-display text-5xl leading-[0.98] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
        >
          AUTOMOTIVE ART
          <br />
          <span className="silver-text italic">For Enthusiasts</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Premium collector-grade posters inspired by the world's most legendary
          performance cars.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/premium"
            className="silver-line w-full rounded-sm px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground transition-all duration-300 hover:opacity-90 sm:w-auto"
          >
            Premium Collection
          </Link>
          <Link
            to="/performance"
            className="hairline w-full rounded-sm px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-silver transition-all duration-300 hover:border-silver/50 hover:text-foreground sm:w-auto"
          >
            Performance Collection
          </Link>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-12 w-px overflow-hidden bg-white/10">
          <motion.div
            className="silver-line h-1/2 w-full"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
