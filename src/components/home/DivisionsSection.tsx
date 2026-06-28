import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { divisions } from "@/data/divisions";
import { Reveal } from "@/components/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function DivisionsSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-28 sm:py-36">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal blur>
          <div className="text-center">
            <p className="eyebrow">Two Divisions. One Obsession.</p>
            <h2 className="display-fluid mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Choose Your Collection
            </h2>
            <div className="divider-glow mx-auto mt-7 h-px w-24" />
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {divisions.map((d, i) => {
            const isPerf = d.id === "performance";
            return (
              <Reveal key={d.id} delay={i * 0.12} y={40}>
                <Link to={d.path} className="group block h-full">
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] p-10 sm:p-14"
                  >
                    {/* atmosphere */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-700 group-hover:opacity-100 ${
                        isPerf ? "perf-spotlight opacity-50" : "spotlight opacity-45"
                      }`}
                    />
                    {isPerf ? (
                      <div className="perf-grid absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-40" />
                    ) : (
                      <div className="aurora-silver absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-2xl transition-opacity duration-700 group-hover:opacity-80" />
                    )}

                    {/* top accent line that draws in on hover */}
                    <span
                      className={`absolute left-0 top-0 h-[2px] w-0 transition-[width] duration-700 ease-out group-hover:w-full ${
                        isPerf ? "perf-line" : "silver-line"
                      }`}
                    />

                    <div className="relative">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-silver-dim">
                        {d.eyebrow}
                      </p>
                      <h3
                        className={`mt-4 font-display text-3xl uppercase sm:text-4xl ${
                          isPerf ? "perf-text" : "silver-text"
                        }`}
                      >
                        {d.name}
                      </h3>
                      <div
                        className={`my-6 h-px w-16 transition-all duration-500 group-hover:w-28 ${
                          isPerf ? "perf-line" : "silver-line"
                        }`}
                      />
                      <p className="max-w-sm text-balance text-sm leading-relaxed text-silver/70">
                        {d.description}
                      </p>
                      <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-foreground">
                        {isPerf ? "Enter Performance" : "Enter Premium"}
                        <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                          →
                        </span>
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
