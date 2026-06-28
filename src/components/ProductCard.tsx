import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { type Product, formatPrice } from "@/data/products";
import { getCollection } from "@/data/collections";

export function ProductCard({ product }: { product: Product }) {
  const collection = getCollection(product.collection);

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="group block overflow-hidden rounded-lg border border-white/10 bg-charcoal transition-colors duration-500 hover:border-silver/40"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-background">
          <div className="absolute inset-0 spotlight opacity-50" />
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full border border-silver/30 bg-black/50 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-silver backdrop-blur-sm">
            Limited Edition
          </span>
        </div>
        <div className="flex items-end justify-between gap-3 p-5">
          <div className="min-w-0">
            <p className="eyebrow text-[0.55rem]">{collection?.marque}</p>
            <p className="mt-1.5 truncate font-display text-lg text-foreground">{product.title}</p>
          </div>
          <p className="shrink-0 text-sm text-silver">From {formatPrice(product.basePrice)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
