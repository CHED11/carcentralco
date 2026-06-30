import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bell, ArrowUpRight } from "lucide-react";
import { products, hasArtwork, formatPrice, type Product } from "@/data/products";
import { getCollection } from "@/data/collections";
import { useNotify } from "@/components/NotifyModal";
import { Reveal } from "@/components/Reveal";

// The homepage grid mirrors the catalogue order. Products with real uploaded
// artwork render as buyable cards; everything else renders as a premium
// "Coming Soon" card in the SAME layout — never another product's image.
const popularProducts = products.slice(0, 6);

const EASE = [0.22, 1, 0.36, 1] as const;

export function PopularProducts() {
  return (
    <section className="relative overflow-hidden bg-background py-28 sm:py-36">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Editorial header */}
        <Reveal blur>
          <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-[0.6rem]">The Collection So Far</p>
              <h2 className="display-fluid mt-3 font-display text-4xl text-foreground sm:text-5xl">
                Popular Picks
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Our most coveted automotive art this week — limited print runs,
              collector-grade, and built to be lived with.
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularProducts.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 0.08} y={40}>
              {hasArtwork(product) ? (
                <PopularProductCard product={product} index={i} />
              ) : (
                <ComingSoonProductCard product={product} index={i} />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Strip the marque + the implied word "Poster" for the large display title. */
function modelName(product: Product, marque: string): string {
  return (
    product.title
      .replace(new RegExp(marque, "i"), "")
      .replace(/\bposter\b/i, "")
      .trim() || product.title
  );
}

const idx = (i: number) => String(i + 1).padStart(2, "0");

const cardShell =
  "group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-charcoal/90 transition-colors duration-500 hover:border-silver/40";

function PopularProductCard({ product, index }: { product: Product; index: number }) {
  const collection = getCollection(product.collection);

  return (
    <Link to="/product/$slug" params={{ slug: product.slug }} className="block h-full">
      <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.5, ease: EASE }} className={cardShell}>
        <span className="metallic absolute inset-x-0 top-0 z-10 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-70" />

        <div className="relative aspect-[3/4] overflow-hidden bg-background">
          <div className="absolute inset-0 spotlight opacity-50" />
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-70" />
          <span className="absolute left-4 top-4 font-display text-sm text-white/40">{idx(index)}</span>
          <span className="absolute right-4 top-4 rounded-full border border-orange-400/40 bg-black/60 px-3 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.25em] text-orange-300 backdrop-blur-sm">
            Best Seller
          </span>
          {/* hover affordance */}
          <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-foreground opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="flex flex-1 items-end justify-between gap-3 p-5">
          <div className="min-w-0">
            <p className="eyebrow text-[0.55rem]">{collection.marque}</p>
            <p className="mt-1.5 truncate font-display text-xl text-foreground">{product.title}</p>
          </div>
          <p className="shrink-0 text-sm text-silver">From {formatPrice(product.basePrice)}</p>
        </div>
      </motion.div>
    </Link>
  );
}

/**
 * Same premium card shell as a product card, but for items without real
 * artwork yet: no image (never a stand-in), Coming Soon badge, no price, and a
 * Notify Me affordance so the grid stays balanced.
 */
function ComingSoonProductCard({ product, index }: { product: Product; index: number }) {
  const { open } = useNotify();
  const collection = getCollection(product.collection);

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.5, ease: EASE }} className={cardShell}>
      <span className="metallic absolute inset-x-0 top-0 z-10 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-60" />

      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-charcoal-light to-background">
        <div className="absolute inset-6 rounded-sm border border-white/10 transition-transform duration-700 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 spotlight opacity-30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <span className="eyebrow text-[0.55rem] text-silver-dim">{collection.marque}</span>
          <span className="display-fluid mt-3 font-display text-2xl leading-tight text-silver/80">
            {modelName(product, collection.marque)}
          </span>
        </div>
        <span className="absolute left-4 top-4 font-display text-sm text-white/30">{idx(index)}</span>
        <span className="absolute right-4 top-4 rounded-full border border-silver/30 bg-black/50 px-3 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.25em] text-silver backdrop-blur-sm">
          Coming Soon
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-[0.55rem]">{collection.marque}</p>
          <p className="mt-1.5 truncate font-display text-xl text-foreground">{product.title}</p>
          <p className="mt-2 text-sm text-silver/60">Future Release</p>
        </div>
        <button
          onClick={() => open(product.title)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm border border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-silver transition-all duration-300 hover:border-silver/50 hover:text-foreground"
        >
          <Bell className="h-3.5 w-3.5" />
          Notify Me
        </button>
      </div>
    </motion.div>
  );
}
