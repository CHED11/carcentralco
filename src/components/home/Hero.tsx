import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import heroAtmosphere from "@/assets/hero-atmosphere.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;
const MARQUES = ["Porsche", "Lamborghini", "Ferrari", "McLaren", "Aston Martin"];

/** One line of the headline, revealed from behind a mask. */
function Line({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="line-mask">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "46%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Pointer-driven volumetric light.
  const mx = useMotionValue(50);
  const my = useMotionValue(38);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const light = useMotionTemplate`radial-gradient(38vw 38vw at ${sx}% ${sy}%, rgba(255,255,255,0.14), rgba(255,255,255,0.03) 38%, transparent 68%)`;

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Parallax atmospheric background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-30 scale-110">
        <img
          src={heroAtmosphere}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/45 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,var(--color-background)_94%)]" />
      </motion.div>

      {/* Dynamic pointer light */}
      <motion.div style={{ backgroundImage: light }} className="pointer-events-none absolute inset-0 -z-20" aria-hidden />

      {/* Drifting silver orb + grain */}
      <div className="aurora-silver animate-orb pointer-events-none absolute left-1/2 top-[32%] -z-20 h-[64vh] w-[64vh] -translate-x-1/2 rounded-full blur-2xl" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" aria-hidden />

      <motion.div style={{ y: contentY, opacity: fade }} className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="mx-auto flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-sm"
        >
          <span className="metallic h-1.5 w-1.5 rounded-full" />
          <span className="eyebrow text-[0.6rem]">CarCentralCo — Automotive Art</span>
        </motion.div>

        <h1 className="display-fluid mt-8 font-display text-[3.5rem] font-medium leading-[0.92] tracking-tight text-foreground sm:text-8xl lg:text-[9rem]">
          <Line delay={0.35}>ICONS,</Line>
          <Line delay={0.48}>
            <span className="silver-text italic">immortalised.</span>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease: EASE }}
          className="mx-auto mt-8 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Collector-grade automotive art for the people who feel it. Two worlds —
          one obsession with the machine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: EASE }}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              to="/premium"
              className="btn-luxe silver-line block w-full rounded-sm px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] transition-opacity hover:opacity-95 sm:w-auto"
            >
              Enter The Gallery
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              to="/performance"
              className="block w-full rounded-sm border border-white/15 bg-white/[0.02] px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-silver backdrop-blur-sm transition-all duration-300 hover:border-silver/50 hover:text-foreground sm:w-auto"
            >
              Enter The Division
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Marque ticker */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-20 left-0 right-0"
      >
        <div className="edge-fade-x flex overflow-hidden opacity-50">
          <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
            {[...MARQUES, ...MARQUES].map((m, i) => (
              <span key={i} className="flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.4em] text-silver-dim">
                {m}
                <span className="h-1 w-1 rounded-full bg-silver-dim/50" />
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2.5">
          <div className="h-10 w-px overflow-hidden bg-white/10">
            <motion.div
              className="silver-line h-1/2 w-full"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
