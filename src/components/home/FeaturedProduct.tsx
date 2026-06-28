import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { availableProducts, formatPrice, getStripeLink } from "@/data/products";
import { Reveal } from "@/components/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FeaturedProduct() {
  const product = availableProducts[0];

  const [sizeCode, setSizeCode] = useState(
    product.sizes.find((s) => s.popular)?.code ?? product.sizes[0].code,
  );
  const [frameCode, setFrameCode] = useState(product.frames[0].code);

  const stripeUrl = useMemo(
    () => getStripeLink(product, sizeCode, frameCode),
    [product, sizeCode, frameCode],
  );
  const available = Boolean(stripeUrl);

  const handleBuy = () => {
    if (available) window.open(stripeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative overflow-hidden bg-background py-28 sm:py-36">
      {/* ambient gallery light */}
      <div className="aurora-silver pointer-events-none absolute left-[8%] top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 rounded-full opacity-60 blur-3xl" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Gallery framed artwork */}
          <Reveal x={-40} blur>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 scale-125 spotlight" />
              <motion.div
                className="animate-float-art relative w-full max-w-md"
                whileHover={{ scale: 1.02, rotate: -0.3 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {/* metallic frame edge */}
                <div className="metallic absolute -inset-px rounded-sm opacity-30 blur-[1px]" aria-hidden />
                <img
                  src={product.image}
                  alt={product.title}
                  className="gallery-shadow relative w-full rounded-sm"
                />
                {/* floor reflection */}
                <div
                  className="absolute inset-x-6 top-full h-24 scale-y-[-1] bg-gradient-to-b from-white/10 to-transparent opacity-30 blur-md"
                  aria-hidden
                />
              </motion.div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="metallic h-1.5 w-1.5 rounded-full" />
                <p className="eyebrow">Featured Artwork</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-fluid mt-5 font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Porsche 918 Spyder
                <span className="silver-text block italic">Poster</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="divider-glow my-7 h-px w-24" />
            </Reveal>
            <Reveal delay={0.25}>
              <p className="max-w-md text-balance text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-9 flex items-center gap-6">
                <p className="text-2xl text-silver">From {formatPrice(product.basePrice)}</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-silver-dim">
                  Limited Collector Edition
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-9">
                <p className="eyebrow mb-3 text-[0.6rem]">Size</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s.code}
                      onClick={() => setSizeCode(s.code)}
                      className={`rounded-sm border px-4 py-2.5 text-xs transition-all duration-300 ${
                        sizeCode === s.code
                          ? "border-silver/70 bg-white/5 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                          : "border-white/12 text-silver/70 hover:border-white/30 hover:text-foreground"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="mt-6">
                <p className="eyebrow mb-3 text-[0.6rem]">Frame</p>
                <div className="flex flex-wrap gap-3">
                  {product.frames.map((f) => (
                    <button
                      key={f.code}
                      onClick={() => setFrameCode(f.code)}
                      className={`rounded-sm border px-4 py-2.5 text-xs transition-all duration-300 ${
                        frameCode === f.code
                          ? "border-silver/70 bg-white/5 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                          : "border-white/12 text-silver/70 hover:border-white/30 hover:text-foreground"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.6}>
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
