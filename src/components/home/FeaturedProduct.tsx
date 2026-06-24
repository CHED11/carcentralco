import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { products, formatPrice, getStripeLink } from "@/data/products";
import { Reveal } from "@/components/Reveal";

export function FeaturedProduct() {
  const product = products[0];

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
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Gallery framed artwork */}
          <Reveal y={40}>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 scale-125 spotlight" />
              <motion.div
                className="animate-float-art relative w-full max-w-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="gallery-shadow w-full rounded-sm"
                />
              </motion.div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <p className="eyebrow">Featured Artwork</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Porsche 918 Spyder
                <span className="silver-text block italic">Poster</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="silver-line my-7 h-px w-20 opacity-60" />
            </Reveal>
            <Reveal delay={0.25}>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-9 flex items-center gap-6">
                <p className="text-2xl text-silver">From {formatPrice(product.basePrice)}</p>
                <span className="eyebrow text-[0.6rem]">Limited Collector Edition</span>
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
                          ? "border-silver/70 bg-white/5 text-foreground"
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
                          ? "border-silver/70 bg-white/5 text-foreground"
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
                <button
                  onClick={handleBuy}
                  disabled={!available}
                  className={`silver-line rounded-sm px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground transition-opacity ${
                    available ? "hover:opacity-90" : "cursor-not-allowed opacity-50"
                  }`}
                >
                  {available ? "Buy Now" : "Available Soon"}
                </button>
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="hairline rounded-sm px-9 py-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-silver transition-all duration-300 hover:border-silver/50 hover:text-foreground"
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
