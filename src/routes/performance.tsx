import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getDivision } from "@/data/divisions";
import { getProductsByDivision, formatPrice } from "@/data/products";
import { getComingSoonByDivision } from "@/data/comingSoon";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { Reveal } from "@/components/Reveal";
import { PerformanceIntro } from "@/components/PerformanceIntro";

const division = getDivision("performance");

export const Route = createFileRoute("/performance")({
  head: () => ({
    meta: [
      { title: `${division.name} — CarCentralCo` },
      { name: "description", content: division.description },
      { property: "og:title", content: `${division.name} — CarCentralCo` },
      { property: "og:description", content: division.description },
    ],
  }),
  component: PerformancePage,
});

function PerformancePage() {
  const products = getProductsByDivision("performance");
  const featured = products[0];
  const upcoming = getComingSoonByDivision("performance");

  return (
    <div className="relative overflow-hidden bg-[#080808]">
      <PerformanceIntro />

      {/* Performance atmosphere layers */}
      <div className="perf-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="perf-spotlight pointer-events-none absolute inset-x-0 top-0 h-[80vh]" />

      <div className="relative pt-28 sm:pt-36">
        {/* Division header */}
        <header className="relative border-b border-white/10 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
            <motion.p
              className="text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-silver-dim"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              {division.tagline}
            </motion.p>
            <motion.h1
              className="perf-text mt-5 font-display text-5xl uppercase sm:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {division.name}
            </motion.h1>
            <motion.div
              className="perf-line mx-auto my-7 h-px w-24"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 2.5 }}
            />
            <motion.p
              className="mx-auto max-w-2xl text-base leading-relaxed text-silver/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.6 }}
            >
              {division.description}
            </motion.p>
          </div>
        </header>

        {/* Featured performance product */}
        {featured && (
          <section className="relative py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
              <motion.div
                className="relative flex items-center justify-center"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="perf-spotlight absolute inset-0 scale-125" />
                <motion.img
                  src={featured.image}
                  alt={featured.title}
                  className="gallery-shadow relative w-full max-w-md rounded-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>

              <div>
                <Reveal>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-silver-dim">
                    Featured · Live Now
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="mt-4 font-display text-4xl uppercase leading-tight text-foreground sm:text-5xl">
                    {featured.title.replace(" Poster", "")}
                    <span className="perf-text block">Poster</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-silver/70">
                    {featured.description}
                  </p>
                </Reveal>

                {/* Specs */}
                {featured.specs && (
                  <Reveal delay={0.3}>
                    <div className="mt-9 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/5">
                      {featured.specs.map((s) => (
                        <div key={s.label} className="bg-[#0c0c0c] p-4 text-center">
                          <p className="text-[0.55rem] uppercase tracking-[0.18em] text-silver-dim">
                            {s.label}
                          </p>
                          <p className="mt-2 font-display text-2xl text-foreground">
                            {s.value}
                            {s.unit && (
                              <span className="ml-1 text-sm text-silver/60">{s.unit}</span>
                            )}
                          </p>
                          {s.sub && (
                            <p className="mt-0.5 text-[0.55rem] text-silver-dim">{s.sub}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )}

                <Reveal delay={0.4}>
                  <div className="mt-9 flex items-center gap-6">
                    <p className="text-2xl text-silver">From {formatPrice(featured.basePrice)}</p>
                    <Link
                      to="/product/$slug"
                      params={{ slug: featured.slug }}
                      className="perf-line inline-block rounded-sm px-9 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90"
                    >
                      View The Poster
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* Coming soon in performance */}
        {upcoming.length > 0 && (
          <section className="relative border-t border-white/10 py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <Reveal>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-silver-dim">
                  More Horsepower Incoming
                </p>
                <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                  Coming Soon
                </h2>
              </Reveal>
              <div className="mt-12 grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {upcoming.map((item) => (
                  <Reveal key={item.id}>
                    <ComingSoonCard item={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cross to premium */}
        <section className="relative border-t border-white/10 bg-charcoal/30 py-20">
          <div className="absolute inset-0 spotlight opacity-50" />
          <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
            <p className="eyebrow">The Other Side</p>
            <h2 className="silver-text mt-4 font-display text-3xl sm:text-4xl">
              Return to the Premium Gallery
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Sophisticated, collector-grade luxury automotive artwork.
            </p>
            <Link
              to="/premium"
              className="silver-line mt-9 inline-block rounded-sm px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Enter Premium
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
