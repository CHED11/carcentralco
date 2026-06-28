import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { getDivision } from "@/data/divisions";
import { getProductsByDivision } from "@/data/products";
import { getComingSoonByDivision } from "@/data/comingSoon";
import { ProductCard } from "@/components/ProductCard";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { Reveal } from "@/components/Reveal";
import { useNotify } from "@/components/NotifyModal";

const division = getDivision("premium");

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: `${division.name} — CarCentralCo` },
      { name: "description", content: division.description },
      { property: "og:title", content: `${division.name} — CarCentralCo` },
      { property: "og:description", content: division.description },
    ],
  }),
  component: PremiumPage,
});

function PremiumPage() {
  const { open } = useNotify();
  const products = getProductsByDivision("premium");
  const upcoming = getComingSoonByDivision("premium");
  const isEmpty = products.length === 0;

  return (
    <div className="bg-background pt-28 sm:pt-36">
      <header className="relative overflow-hidden border-b border-white/10 py-24 sm:py-36">
        <div className="absolute inset-0 spotlight opacity-60" />
        <div className="aurora-silver pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[80vh] -translate-x-1/2 rounded-full opacity-60 blur-3xl" aria-hidden />
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-10">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span className="metallic h-1.5 w-1.5 rounded-full" />
              <p className="eyebrow">{division.tagline}</p>
              <span className="metallic h-1.5 w-1.5 rounded-full" />
            </div>
          </Reveal>
          <Reveal delay={0.1} blur>
            <h1 className="silver-text display-fluid mt-5 font-display text-5xl sm:text-7xl">
              {division.name}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="divider-glow mx-auto my-7 h-px w-24" />
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
              {division.description}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {!isEmpty && (
          <div className="mb-20">
            <Reveal>
              <p className="eyebrow mb-8">Available Now</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <Reveal key={p.id}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {isEmpty && (
          <Reveal>
            <div className="glass mx-auto max-w-2xl rounded-lg px-8 py-20 text-center">
              <p className="eyebrow">Curation In Progress</p>
              <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">
                Gallery pieces arriving soon
              </h2>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                The Premium Collection is being curated with collector-grade
                precision. Reserve early access to the first gallery releases.
              </p>
              <button
                onClick={() => open(division.name)}
                className="silver-line mt-9 inline-flex items-center gap-2 rounded-sm px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Bell className="h-4 w-4" />
                Notify Me
              </button>
            </div>
          </Reveal>
        )}

        {upcoming.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <p className="eyebrow mb-8">Coming Soon</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {upcoming.map((item) => (
                <Reveal key={item.id}>
                  <ComingSoonCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cross to the other division */}
      <section className="relative overflow-hidden border-t border-white/10 bg-charcoal/30 py-20">
        <div className="perf-spotlight absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="eyebrow">The Other Side</p>
          <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
            Enter the Performance Division
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            High-energy original poster designs — horsepower, top speed, and raw numbers.
          </p>
          <Link
            to="/performance"
            className="perf-line mt-9 inline-block rounded-sm px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white transition-opacity hover:opacity-90"
          >
            Enter Performance
          </Link>
        </div>
      </section>
    </div>
  );
}
