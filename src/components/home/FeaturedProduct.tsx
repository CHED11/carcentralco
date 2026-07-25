import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { availableProducts, formatPrice, getStripeLink, type Product } from "@/data/products";
import { Reveal } from "@/components/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FeaturedProduct() {
  const product = availableProducts[0];
  // Data-driven: the first live product is the Featured Artifact. With no live
  // products the section is hidden entirely (no placeholder, no broken layout).
  if (!product) return null;
  return <FeaturedArtifact product={product} />;
}

function FeaturedArtifact({ product }: { product: Product }) {
  const featureTitle = product.title.replace(/\s*poster\s*$/i, "").trim();

  const [sizeCode, setSizeCode] = useState(
    product.sizes.find((s) => s.popular)?.code ?? product.sizes[0].code,
  );
  // Framed posters only — the single frame is fixed, not a customer choice.
  const frameCode = product.frames[0].code;

  const stripeUrl = useMemo(
    () => getStripeLink(product, sizeCode, frameCode),
    [product, sizeCode, frameCode],
  );
  const available = Boolean(stripeUrl);

  const handleBuy = () => {
    if (available) window.open(stripeUrl, "_blank", "noopener,noreferrer");
  };

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const specs = product.specs ?? [];

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-28 sm:py-40">
      <div className="aurora-silver pointer-events-none absolute left-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full opacity-50 blur-3xl" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section index header */}
        <Reveal>
          <div className="flex items-end justify-between border-b border-white/10 pb-8">
            <div>
              <p className="eyebrow text-[0.6rem]">The Featured Artifact</p>
              <h2 className="display-fluid mt-3 font-display text-3xl text-foreground sm:text-4xl">
                A study in collector-grade detail
              </h2>
            </div>
            <span className="hidden font-display text-5xl text-white/10 sm:block">01</span>
          </div>
        </Reveal>

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          {/* Gallery framed artwork */}
          <Reveal x={-40} blur>
            <motion.div style={{ y: artY }} className="relative flex items-center justify-center">
              <div className="absolute inset-0 scale-125 spotlight" />
              <motion.div
                className="relative w-full max-w-md"
                whileHover={{ scale: 1.015, rotate: -0.3 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="metallic absolute -inset-px rounded-sm opacity-30 blur-[1px]" aria-hidden />
                <img
                  src={product.image}
                  alt={product.title}
                  className="gallery-shadow relative w-full rounded-sm"
                />
                <div
                  className="absolute inset-x-6 top-full h-24 scale-y-[-1] bg-gradient-to-b from-white/10 to-transparent opacity-30 blur-md"
                  aria-hidden
                />
              </motion.div>
            </motion.div>
          </Reveal>

          {/* Configurator */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="metallic h-1.5 w-1.5 rounded-full" />
                <p className="eyebrow text-[0.6rem]">Limited Collector Edition</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="display-fluid mt-5 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                {featureTitle}
                <span className="silver-text block italic">Poster</span>
              </h3>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </Reveal>

            {/* Spec ribbon */}
            {specs.length > 0 && (
              <Reveal delay={0.24}>
                <div className="mt-9 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  {specs.slice(0, 3).map((s) => (
                    <div key={s.label} className="bg-[#0c0c0c] p-4 text-center">
                      <p className="text-[0.5rem] uppercase tracking-[0.18em] text-silver-dim">{s.label}</p>
                      <p className="mt-2 font-display text-2xl text-foreground">
                        {s.value}
                        {s.unit && <span className="ml-1 text-sm text-silver/60">{s.unit}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.3}>
              <div className="mt-9 flex items-center gap-5">
                <p className="text-2xl text-silver">From {formatPrice(product.basePrice)}</p>
                <div className="divider-glow h-px flex-1" />
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-8">
                <p className="eyebrow mb-3 text-[0.6rem]">Size</p>
                <div className="grid max-w-sm grid-cols-2 gap-3">
                  {product.sizes.map((s) => {
                    const selected = sizeCode === s.code;
                    return (
                      <button
                        key={s.code}
                        onClick={() => setSizeCode(s.code)}
                        aria-pressed={selected}
                        className={`relative rounded-sm border px-4 py-3 text-left transition-all duration-300 ${
                          selected
                            ? "border-silver/70 bg-white/5 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                            : "border-white/12 text-silver/70 hover:border-white/30 hover:text-foreground"
                        }`}
                      >
                        {s.popular && (
                          <span className="absolute -top-2.5 left-3 whitespace-nowrap rounded-full border border-silver/30 bg-background px-2 py-0.5 text-[0.45rem] font-semibold uppercase tracking-[0.18em] text-silver">
                            Most Popular
                          </span>
                        )}
                        <span className="block text-xs font-semibold">{s.label}</span>
                        {s.dimensions && (
                          <span className="mt-0.5 block text-[0.65rem] text-silver/60">{s.dimensions}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.42}>
              <div className="mt-6">
                <p className="eyebrow mb-3 text-[0.6rem]">Frame</p>
                <div className="inline-flex items-center gap-2.5 rounded-sm border border-silver/70 bg-white/5 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <span className="h-3 w-3 rounded-[3px] border border-white/40 bg-[#0c0c0c]" aria-hidden />
                  <span className="text-xs font-semibold text-foreground">{product.frames[0].label}</span>
                  <Check className="h-3.5 w-3.5 text-silver" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.48}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <motion.button
                  onClick={handleBuy}
                  disabled={!available}
                  whileHover={available ? { y: -2 } : undefined}
                  whileTap={available ? { scale: 0.98 } : undefined}
                  className={`btn-luxe silver-line rounded-sm px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground transition-opacity ${
                    available ? "hover:opacity-90" : "cursor-not-allowed opacity-50"
                  }`}
                >
                  {available ? "Buy Now" : "Available Soon"}
                </motion.button>
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="rounded-sm border border-white/15 px-9 py-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-silver transition-all duration-300 hover:border-silver/50 hover:text-foreground"
                >
                  View The Artwork
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
