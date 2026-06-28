import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroAtmosphere from "@/assets/hero-atmosphere.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Parallax atmospheric background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20 scale-110">
        <img
          src={heroAtmosphere}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-background)_92%)]" />
      </motion.div>

      {/* Floating silver light orbs */}
      <motion.div
        style={{ y: orbY }}
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="aurora-silver animate-orb absolute left-1/2 top-[34%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full blur-2xl" />
        <div className="aurora-silver absolute right-[12%] top-[18%] h-[26vh] w-[26vh] rounded-full opacity-60 blur-2xl" />
      </motion.div>

      {/* Fine grain for depth */}
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.04]" aria-hidden />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="mx-auto max-w-4xl px-6 text-center"
      >
        {/* Metallic eyebrow chip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="mx-auto flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-sm"
        >
          <span className="metallic h-1.5 w-1.5 rounded-full" />
          <span className="eyebrow text-[0.6rem]">Automotive Art For Enthusiasts</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
          className="display-fluid mt-8 font-display text-[3.25rem] leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-[7.5rem]"
        >
          AUTOMOTIVE ART
          <span className="silver-text mt-1 block italic">For Enthusiasts</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="mx-auto mt-8 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Premium collector-grade posters inspired by the world's most legendary
          performance cars — engineered for the spaces you live in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              to="/premium"
              className="btn-luxe silver-line block w-full rounded-sm px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] transition-opacity hover:opacity-95 sm:w-auto"
            >
              Premium Collection
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              to="/performance"
              className="block w-full rounded-sm border border-white/15 bg-white/[0.02] px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-silver backdrop-blur-sm transition-all duration-300 hover:border-silver/50 hover:text-foreground sm:w-auto"
            >
              Performance Collection
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-px overflow-hidden bg-white/10">
            <motion.div
              className="silver-line h-1/2 w-full"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[0.5rem] font-semibold uppercase tracking-[0.4em] text-silver-dim">
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
}
