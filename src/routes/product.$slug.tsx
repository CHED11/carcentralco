import { useMemo, useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Minus, Plus, ShieldCheck, Truck, Globe } from "lucide-react";
import {
  getProductBySlug,
  products,
  formatPrice,
  getStripeLink,
  type Product,
} from "@/data/products";
import { getCollection } from "@/data/collections";
import { comingSoon } from "@/data/comingSoon";
import { Reveal } from "@/components/Reveal";
import { ComingSoonCard } from "@/components/ComingSoonCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    return {
      meta: product
        ? [
            { title: `${product.title} — CarCentralCo` },
            { name: "description", content: product.description },
            { property: "og:title", content: `${product.title} — CarCentralCo` },
            { property: "og:description", content: product.description },
            { property: "og:image", content: product.image },
            { name: "twitter:image", content: product.image },
          ]
        : [{ title: "Artwork — CarCentralCo" }],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl text-foreground">Artwork not found</h1>
        <Link to="/" className="eyebrow mt-6 inline-block">
          Return Home
        </Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const collection = getCollection(product.collection);

  const [sizeCode, setSizeCode] = useState(
    product.sizes.find((s) => s.popular)?.code ?? product.sizes[0].code,
  );
  const [frameCode, setFrameCode] = useState(product.frames[0].code);
  const [qty, setQty] = useState(1);

  const stripeUrl = useMemo(
    () => getStripeLink(product, sizeCode, frameCode),
    [product, sizeCode, frameCode],
  );
  const available = Boolean(stripeUrl);

  const handleBuy = () => {
    if (available) {
      window.open(stripeUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-background pt-28 sm:pt-32">
      {/* breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <nav className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">Home</Link>
          <span>/</span>
          {collection && (
            <>
              <Link
                to="/collections/$slug"
                params={{ slug: collection.slug }}
                className="transition-colors hover:text-foreground"
              >
                {collection.marque}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-silver">{product.title}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-32 pt-10 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Gallery */}
        <ProductGallery product={product} framed={frameCode !== "PRINT_ONLY"} />

        {/* Purchase column (sticky on desktop) */}
        <div>
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow">{collection?.marque} · Limited Collector Edition</p>
              <h1 className="mt-4 font-display text-4xl uppercase leading-tight tracking-wide text-foreground sm:text-5xl">
                {product.title}
              </h1>
              <p className="mt-4 text-2xl text-silver">From {formatPrice(product.basePrice)}</p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </Reveal>

            <div className="silver-line my-8 h-px w-full opacity-30" />

            {/* Performance specifications */}
            {product.specs && (
              <div className="mb-8">
                <p className="eyebrow mb-4 text-[0.6rem]">Performance Specifications</p>
                <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  {product.specs.map((s) => (
                    <div key={s.label} className="bg-charcoal p-4 text-center">
                      <p className="text-[0.5rem] uppercase tracking-[0.16em] text-muted-foreground">
                        {s.label}
                      </p>
                      <p className="mt-2 font-display text-xl text-foreground">
                        {s.value}
                        {s.unit && <span className="ml-1 text-xs text-silver/60">{s.unit}</span>}
                      </p>
                      {s.sub && (
                        <p className="mt-0.5 text-[0.5rem] text-muted-foreground">{s.sub}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            <div>
              <p className="eyebrow mb-4 text-[0.6rem]">Size</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s.code}
                    onClick={() => setSizeCode(s.code)}
                    className={`relative rounded-sm border px-5 py-3 text-sm transition-all duration-300 ${
                      sizeCode === s.code
                        ? "border-silver/70 bg-white/5 text-foreground"
                        : "border-white/12 text-silver/70 hover:border-white/30 hover:text-foreground"
                    }`}
                  >
                    {s.label}
                    {s.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-silver/30 bg-background px-2 py-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-silver">
                        Most Popular
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Frames */}
            <div className="mt-8">
              <p className="eyebrow mb-4 text-[0.6rem]">Frame</p>
              <div className="flex flex-wrap gap-3">
                {product.frames.map((f) => (
                  <button
                    key={f.code}
                    onClick={() => setFrameCode(f.code)}
                    className={`rounded-sm border px-5 py-3 text-sm transition-all duration-300 ${
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

            {/* Quantity */}
            <div className="mt-8">
              <p className="eyebrow mb-4 text-[0.6rem]">Quantity</p>
              <div className="inline-flex items-center rounded-sm border border-white/12">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-silver transition-colors hover:text-foreground"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm text-foreground">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-3 text-silver transition-colors hover:text-foreground"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="mt-9 rounded-lg border border-white/10 bg-charcoal/50 p-6">
              <p className="eyebrow mb-4 text-[0.6rem]">Product Features</p>
              <ul className="space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-silver/80">
                    <span className="silver-line h-px w-5 opacity-70" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Purchase buttons */}
            <div className="mt-9 hidden gap-4 sm:flex">
              <BuyButtons available={available} onBuy={handleBuy} />
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-silver/70" />
              Collector-grade quality. Carefully packaged and shipped worldwide.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              <Assurance icon={ShieldCheck} label="Collector Grade" />
              <Assurance icon={Truck} label="Securely Packaged" />
              <Assurance icon={Globe} label="Shipped Worldwide" />
            </div>
          </div>
        </div>
      </div>

      {/* Recommended + Recently Viewed */}
      <RowSection title="Recommended Artwork" eyebrow="Curated For You" />
      <RowSection title="Recently Viewed" eyebrow="Continue Browsing" showProduct product={product} />

      {/* Mobile sticky bar */}
      <div className="glass-nav fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 px-4 py-3 sm:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-silver/70">{product.title}</p>
          <p className="text-sm text-foreground">From {formatPrice(product.basePrice)}</p>
        </div>
        <button
          onClick={handleBuy}
          disabled={!available}
          className={`silver-line shrink-0 rounded-sm px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-opacity ${
            available ? "hover:opacity-90" : "cursor-not-allowed opacity-50"
          }`}
        >
          {available ? "Buy Now" : "Available Soon"}
        </button>
      </div>
    </div>
  );
}

function BuyButtons({
  available,
  onBuy,
}: {
  available: boolean;
  onBuy: () => void;
}) {
  return (
    <>
      <button
        onClick={onBuy}
        disabled={!available}
        className={`hairline flex-1 rounded-sm px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-silver transition-all duration-300 ${
          available ? "hover:border-silver/50 hover:text-foreground" : "cursor-not-allowed opacity-50"
        }`}
      >
        {available ? "Add To Cart" : "Available Soon"}
      </button>
      <button
        onClick={onBuy}
        disabled={!available}
        className={`silver-line flex-1 rounded-sm px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-opacity ${
          available ? "hover:opacity-90" : "cursor-not-allowed opacity-50"
        }`}
      >
        {available ? "Buy Now" : "Available Soon"}
      </button>
    </>
  );
}

function Assurance({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <Icon className="h-5 w-5 text-silver/70" strokeWidth={1.4} />
      <span className="text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function ProductGallery({ product, framed }: { product: Product; framed?: boolean }) {
  const mainImage = framed && product.framedImage ? product.framedImage : product.image;
  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <div className="relative flex items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-charcoal p-8 sm:p-12">
        <div className="absolute inset-0 spotlight opacity-60" />
        <motion.img
          key={mainImage}
          src={mainImage}
          alt={product.title}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="gallery-shadow relative w-full max-w-md rounded-sm"
        />
      </div>
      {/* secondary thumbnail slots (detail shots later) */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <button className="relative overflow-hidden rounded-sm border border-silver/40 bg-charcoal">
          <img src={product.image} alt={product.title} loading="lazy" className="aspect-square w-full object-cover" />
        </button>
        {product.framedImage && (
          <button className="relative overflow-hidden rounded-sm border border-silver/40 bg-charcoal">
            <img src={product.framedImage} alt={`${product.title} framed`} loading="lazy" className="aspect-square w-full object-cover" />
          </button>
        )}
        {[0, 1].slice(0, product.framedImage ? 1 : 2).map((i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-sm border border-dashed border-white/10 bg-charcoal/40"
          >
            <span className="text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground">
              Detail
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RowSection({
  title,
  eyebrow,
  showProduct = false,
  product,
}: {
  title: string;
  eyebrow: string;
  showProduct?: boolean;
  product?: Product;
}) {
  const items = comingSoon.slice(0, showProduct ? 3 : 4);
  return (
    <section className="border-t border-white/10 bg-charcoal/30 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">{title}</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {showProduct && product && (
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              className="group overflow-hidden rounded-lg border border-white/10 bg-charcoal transition-colors hover:border-silver/40"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <div className="absolute inset-0 spotlight opacity-50" />
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="truncate font-display text-lg text-foreground">{product.title}</p>
                <p className="eyebrow mt-1 text-[0.55rem]">From {formatPrice(product.basePrice)}</p>
              </div>
            </Link>
          )}
          {items.map((item) => (
            <ComingSoonCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

// keep import used for type clarity
void products;
