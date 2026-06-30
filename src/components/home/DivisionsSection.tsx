import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getDivision } from "@/data/divisions";
import { getProductsByDivision } from "@/data/products";

const premium = getDivision("premium");
const performance = getDivision("performance");
const premiumProduct = getProductsByDivision("premium")[0];
const perfProduct = getProductsByDivision("performance")[0];

const premiumArt = premiumProduct?.framedImage ?? premiumProduct?.image;
const perfArt = perfProduct?.image;

/**
 * The signature moment: a scroll-pinned cinematic cross-over. The silver
 * Premium gallery dissolves into the red Performance division as you scroll
 * through the section.
 */
export function DivisionsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Cross-fade the two full-stage scenes.
  const premiumOpacity = useTransform(scrollYProgress, [0, 0.32, 0.5], [1, 1, 0]);
  const premiumScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const premiumPE = useTransform(scrollYProgress, (v) => (v < 0.5 ? "auto" : "none"));

  const perfOpacity = useTransform(scrollYProgress, [0.5, 0.68, 1], [0, 1, 1]);
  const perfScale = useTransform(scrollYProgress, [0.5, 1], [1.08, 1]);
  const perfPE = useTransform(scrollYProgress, (v) => (v >= 0.5 ? "auto" : "none"));

  // Center seam light intensifies through the hand-off.
  const seam = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

  // Progress rail fill.
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[260vh] bg-background">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* ---- Premium scene ---- */}
        <motion.div
          style={{ opacity: premiumOpacity, scale: premiumScale, pointerEvents: premiumPE }}
          className="absolute inset-0"
        >
          {premiumArt && (
            <img src={premiumArt} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" aria-hidden />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
          <div className="aurora-silver absolute left-1/2 top-1/3 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full opacity-70 blur-3xl" aria-hidden />
          <div className="grain absolute inset-0 opacity-[0.04]" aria-hidden />

          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="eyebrow">{premium.eyebrow} — Premium Collection</p>
            <h2 className="silver-text display-fluid mt-6 font-display text-6xl italic sm:text-8xl lg:text-9xl">
              The Gallery
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-silver/70">
              {premium.description}
            </p>
            <DivisionCta to="/premium" label="Enter The Gallery" variant="silver" />
          </div>
        </motion.div>

        {/* ---- Performance scene ---- */}
        <motion.div
          style={{ opacity: perfOpacity, scale: perfScale, pointerEvents: perfPE }}
          className="absolute inset-0 bg-[#070707]"
        >
          {perfArt && (
            <img src={perfArt} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" aria-hidden />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/80 via-[#070707]/70 to-[#070707]" />
          <div className="perf-grid absolute inset-0 opacity-30" aria-hidden />
          <div className="perf-spotlight absolute inset-x-0 top-0 h-[80vh]" aria-hidden />
          <div className="aurora-perf absolute left-1/2 top-1/3 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full opacity-80 blur-3xl" aria-hidden />

          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-silver-dim">
              {performance.eyebrow} — Performance Collection
            </p>
            <h2 className="perf-text display-fluid mt-6 font-display text-6xl uppercase sm:text-8xl lg:text-9xl">
              The Division
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-silver/70">
              {performance.description}
            </p>
            <DivisionCta to="/performance" label="Enter The Division" variant="perf" />
          </div>
        </motion.div>

        {/* ---- Center seam light ---- */}
        <motion.div
          style={{ opacity: seam }}
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/70 to-transparent blur-[1px]"
          aria-hidden
        />

        {/* ---- Cross-over progress rail ---- */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-4">
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-silver-dim">Gallery</span>
            <div className="relative h-px w-32 overflow-hidden bg-white/15 sm:w-48">
              <motion.div style={{ width: railFill }} className="silver-line absolute inset-y-0 left-0" />
            </div>
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-silver-dim">Division</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DivisionCta({
  to,
  label,
  variant,
}: {
  to: "/premium" | "/performance";
  label: string;
  variant: "silver" | "perf";
}) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="mt-10">
      <Link
        to={to}
        className={`btn-luxe inline-block rounded-sm px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-90 ${
          variant === "silver"
            ? "silver-line text-primary-foreground"
            : "perf-line text-white"
        }`}
      >
        {label}
      </Link>
    </motion.div>
  );
}
