import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { divisions } from "@/data/divisions";
import { Reveal } from "@/components/Reveal";

export function DivisionsSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-charcoal/30 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Two Divisions. One Obsession.</p>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Choose Your Collection
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {divisions.map((d, i) => {
            const isPerf = d.id === "performance";
            return (
              <Reveal key={d.id} delay={i * 0.1}>
                <Link to={d.path} className="group block">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c] p-10 sm:p-14"
                  >
                    <div
                      className={`absolute inset-0 transition-opacity duration-700 group-hover:opacity-100 ${
                        isPerf ? "perf-spotlight opacity-60" : "spotlight opacity-50"
                      }`}
                    />
                    {isPerf && <div className="perf-grid absolute inset-0 opacity-25" />}
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
                        className={`my-6 h-px w-16 ${isPerf ? "perf-line" : "silver-line"}`}
                      />
                      <p className="max-w-sm text-sm leading-relaxed text-silver/70">
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
