import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame, Star, Heart, Bell, ArrowRight } from "lucide-react";
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
    <section className="relative overflow-hidden border-y border-white/10 bg-charcoal/30 py-24 sm:py-32">
      {/* ambient light */}
      <div className="aurora-silver pointer-events-none absolute -top-32 left-1/2 h-[55vh] w-[80vh] -translate-x-1/2 rounded-full opacity-70 blur-2xl" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <Reveal blur>
          <div className="text-center">
            <p className="eyebrow">Trending This Week</p>
            <h2 className="display-fluid mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Popular Picks Right Now
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground">
              Our most coveted automotive wall art this week. Premium-quality prints designed for enthusiasts, collectors, offices, garages, and showrooms.
            </p>
          </div>
        </Reveal>

        {/* Social Proof */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            <Stat icon={<Flame className="h-4 w-4 text-orange-400" />} label="327+ Posters Sold" />
            <Stat icon={<Star className="h-4 w-4 text-yellow-400" fill="currentColor" />} label="Rated 4.9 / 5" />
            <Stat icon={<Heart className="h-4 w-4 text-rose-400" fill="currentColor" />} label="Enthusiast Favourite" />
          </div>
        </Reveal>

        {/* Urgency */}
        <Reveal delay={0.15}>
          <p className="mt-6 text-center text-xs italic text-muted-foreground">
            Popular products regularly sell out due to limited print availability.
          </p>
        </Reveal>

        {/* Product Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularProducts.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 0.08} y={36}>
              {hasArtwork(product) ? (
                <PopularProductCard product={product} />
              ) : (
                <ComingSoonProductCard product={product} />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {icon}
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
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

const cardShell =
  "group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-charcoal/90 transition-colors duration-500 hover:border-silver/40";

function PopularProductCard({ product }: { product: Product }) {
  const collection = getCollection(product.collection);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cardShell}
    >
      {/* metallic top edge on hover */}
      <span className="metallic absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-70" />

      {/* Image */}
      <Link to="/product/$slug" params={{ slug: product.slug }} className="relative aspect-[3/4] overflow-hidden bg-background">
        <div className="absolute inset-0 spotlight opacity-50" />
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-70" />
        <span className="absolute left-4 top-4 rounded-full border border-orange-400/40 bg-black/60 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-orange-300 backdrop-blur-sm">
          Best Seller
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-[0.55rem]">{collection.marque}</p>
          <p className="mt-1.5 truncate font-display text-xl text-foreground">{product.title}</p>
          <p className="mt-2 text-sm text-silver">From {formatPrice(product.basePrice)}</p>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex flex-col gap-3">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="btn-luxe silver-line block rounded-sm px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Add to Cart
          </Link>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="group/btn flex items-center justify-center gap-2 rounded-sm border border-white/10 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-silver transition-all duration-300 hover:border-silver/50 hover:text-foreground"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Same premium card shell as a product card, but for items without real
 * artwork yet: no image (never a stand-in), Coming Soon badge, no price, and a
 * Notify Me button in place of Add to Cart so the grid stays balanced.
 */
function ComingSoonProductCard({ product }: { product: Product }) {
  const { open } = useNotify();
  const collection = getCollection(product.collection);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cardShell}
    >
      <span className="metallic absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-60" />

      {/* Framed placeholder area — matches the product image footprint, no image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-charcoal-light to-background">
        <div className="absolute inset-6 rounded-sm border border-white/10 transition-transform duration-700 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 spotlight opacity-30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <span className="eyebrow text-[0.55rem] text-silver-dim">{collection.marque}</span>
          <span className="display-fluid mt-3 font-display text-2xl leading-tight text-silver/80">
            {modelName(product, collection.marque)}
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 spotlight" />
        </div>
        <span className="absolute left-4 top-4 rounded-full border border-silver/30 bg-black/50 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-silver backdrop-blur-sm">
          Coming Soon
        </span>
      </div>

      {/* Content — no price, Notify Me instead of Add to Cart */}
      <div className="flex flex-1 flex-col p-5">
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-[0.55rem]">{collection.marque}</p>
          <p className="mt-1.5 truncate font-display text-xl text-foreground">{product.title}</p>
          <p className="mt-2 text-sm text-silver/60">Future Release</p>
        </div>

        <div className="mt-5">
          <button
            onClick={() => open(product.title)}
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-silver transition-all duration-300 hover:border-silver/50 hover:text-foreground"
          >
            <Bell className="h-3.5 w-3.5" />
            Notify Me
          </button>
        </div>
      </div>
    </motion.div>
  );
}
