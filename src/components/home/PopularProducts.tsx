import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame, Star, Heart } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { getCollection } from "@/data/collections";
import { Reveal } from "@/components/Reveal";

const popularProducts = products.slice(0, 6);

export function PopularProducts() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-charcoal/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Trending This Week</p>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Popular Products Right Now
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Our most purchased automotive wall art this week. Premium-quality prints designed for enthusiasts, collectors, offices, garages, and showrooms.
            </p>
          </div>
        </Reveal>

        {/* Social Proof */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2.5">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium text-foreground">327+ Posters Sold</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
              <span className="text-sm font-medium text-foreground">Average Rating: 4.9/5</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Heart className="h-4 w-4 text-rose-400" fill="currentColor" />
              <span className="text-sm font-medium text-foreground">Enthusiast Favourite Collection</span>
            </div>
          </div>
        </Reveal>

        {/* Urgency */}
        <Reveal delay={0.15}>
          <p className="mt-6 text-center text-xs italic text-muted-foreground">
            Popular products regularly sell out due to limited print availability.
          </p>
        </Reveal>

        {/* Product Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularProducts.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.08}>
              <PopularProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularProductCard({ product }: { product: (typeof products)[number] }) {
  const collection = getCollection(product.collection);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-charcoal transition-colors duration-500 hover:border-silver/40"
    >
      {/* Image */}
      <Link to="/product/$slug" params={{ slug: product.slug }} className="relative aspect-[3/4] overflow-hidden bg-background">
        <div className="absolute inset-0 spotlight opacity-50" />
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full border border-orange-400/40 bg-black/60 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-orange-300 backdrop-blur-sm">
          Best Seller
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-[0.55rem]">{collection?.marque}</p>
          <p className="mt-1.5 truncate font-display text-lg text-foreground">{product.title}</p>
          <p className="mt-2 text-sm text-silver">From {formatPrice(product.basePrice)}</p>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex flex-col gap-3">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="silver-line block rounded-sm px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Add to Cart
          </Link>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="hairline block rounded-sm px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-silver transition-all duration-300 hover:border-silver/50 hover:text-foreground"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
