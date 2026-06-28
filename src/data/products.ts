/**
 * ============================================================================
 *  PRODUCTS — the single source of truth for the entire storefront.
 * ============================================================================
 *
 *  To add a new product you ONLY need to:
 *
 *    1. Drop the poster image at:   public/products/<slug>/poster.png
 *    2. (optional) framed image at: public/products/<slug>/framed.png
 *    3. Append ONE defineProduct({ ... }) block to the `products` array below.
 *    4. Paste the Stripe Payment Link URLs into that block's `stripe` map.
 *
 *  Everything else — homepage, division pages, collection pages, the product
 *  page + gallery, sizes/frames, breadcrumbs and the sitemap — populates
 *  automatically. No component edits required.
 *
 *  <slug> is derived from the title:
 *    "Porsche 918 Spyder Poster"  ->  "porsche-918-spyder"
 *  Name the image folder exactly that. See docs/ADDING-A-PRODUCT.md.
 * ============================================================================
 */

/** The two primary brand divisions. */
export type Division = "premium" | "performance";

/**
 * A collection is just a marque id, e.g. "porsche". New collections work
 * automatically; add optional display copy in `collections.ts` if you want a
 * richer collection landing page.
 */
export type CollectionId = string;

export type SizeOption = {
  code: string; // used in the stripe key, e.g. "16X20"
  label: string;
  popular?: boolean;
};

export type FrameOption = {
  code: string; // used in the stripe key, e.g. "PRINT_ONLY"
  label: string;
};

/** A single performance statistic shown on Performance Collection products. */
export type PerformanceSpec = {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
};

/**
 * Stripe Payment Links for a product, keyed `${SIZE_CODE}_${FRAME_CODE}`
 * (e.g. "16X20_BLACK_FRAME"). A missing/empty value renders as "Available Soon".
 */
export type StripeLinks = Record<string, string>;

export type Product = {
  id: string;
  slug: string;
  title: string;
  division: Division;
  collection: CollectionId;
  basePrice: number;
  /** Poster artwork. */
  image: string;
  /** Optional framed/in-room artwork shown when a frame is selected. */
  framedImage?: string;
  description: string;
  features: string[];
  /** Performance statistics — typically only for the Performance division. */
  specs?: PerformanceSpec[];
  sizes: SizeOption[];
  frames: FrameOption[];
  stripe: StripeLinks;
};

export const STANDARD_SIZES: SizeOption[] = [
  { code: "16X20", label: "16×20 Inches", popular: true },
  { code: "18X24", label: "18×24 Inches" },
  { code: "24X36", label: "24×36 Inches" },
];

export const STANDARD_FRAMES: FrameOption[] = [
  { code: "PRINT_ONLY", label: "Print Only" },
  { code: "BLACK_FRAME", label: "Black Frame" },
];

/** Default selling points; override per-product with `features: [...]`. */
const DEFAULT_FEATURES = [
  "Premium artwork",
  "Collector-grade presentation",
  "High quality print",
  "Designed for enthusiasts",
  "Luxury wall décor",
];

/** Shown until a real poster image has been uploaded for a product. */
export const PLACEHOLDER_POSTER = "/products/_placeholder.svg";

/** "Porsche 918 Spyder Poster" -> "porsche-918-spyder" */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .toLowerCase()
    .replace(/\bposter\b/g, " ") // the word "Poster" is implied everywhere
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** What you fill in per product. Anything omitted is sensibly defaulted. */
export type ProductInput = {
  title: string;
  division: Division;
  collection: CollectionId;
  basePrice: number;
  description: string;
  /** Defaults to `/products/<slug>/poster.png`. */
  image?: string;
  /** Set to `/products/<slug>/framed.png` after uploading a framed photo. */
  framedImage?: string;
  features?: string[];
  specs?: PerformanceSpec[];
  sizes?: SizeOption[];
  frames?: FrameOption[];
  /** `${SIZE_CODE}_${FRAME_CODE}` -> Stripe Payment Link URL. */
  stripe?: StripeLinks;
  /** Override the auto-derived slug (URL). Rarely needed. */
  slug?: string;
  id?: string;
};

/** Normalises one product input into a complete Product with defaults applied. */
export function defineProduct(input: ProductInput): Product {
  const slug = input.slug ?? slugify(input.title);
  return {
    id: input.id ?? slug,
    slug,
    title: input.title,
    division: input.division,
    collection: input.collection,
    basePrice: input.basePrice,
    image: input.image ?? `/products/${slug}/poster.png`,
    framedImage: input.framedImage,
    description: input.description,
    features: input.features ?? DEFAULT_FEATURES,
    specs: input.specs,
    sizes: input.sizes ?? STANDARD_SIZES,
    frames: input.frames ?? STANDARD_FRAMES,
    stripe: input.stripe ?? {},
  };
}

/* ===========================================================================
 *  THE CATALOGUE — append new products here.
 *  (Array order controls the homepage "Featured" [first] and "Popular" [first 6].)
 * ======================================================================== */
export const products: Product[] = [
  defineProduct({
    title: "Porsche 918 Spyder Poster",
    division: "performance",
    collection: "porsche",
    basePrice: 49,
    // image auto -> /products/porsche-918-spyder/poster.png
    description:
      "A collector-grade tribute to one of the greatest hybrid hypercars ever engineered. The Porsche 918 Spyder is rendered in cinematic monochrome with metallic silver detailing — designed to be the centrepiece of any enthusiast's space.",
    specs: [
      { label: "Top Speed", value: "345", unit: "km/h", sub: "214 mph" },
      { label: "0–100 km/h", value: "2.6", unit: "s" },
      { label: "System Power", value: "887", unit: "hp", sub: "@ 6,500 rpm" },
      { label: "Engine", value: "4.6L V8", sub: "Naturally Aspirated + Electric" },
      { label: "Torque", value: "1,280", unit: "Nm", sub: "@ 8,650 rpm" },
      { label: "MSRP", value: "$845,000", sub: "USD" },
    ],
    stripe: {
      // "16X20_PRINT_ONLY": "https://buy.stripe.com/...",
    },
  }),
  defineProduct({
    title: "Lamborghini SVJ Poster",
    division: "performance",
    collection: "lamborghini",
    basePrice: 49,
    image: PLACEHOLDER_POSTER, // TODO: upload /products/lamborghini-svj/poster.png then remove this line
    description:
      "The most extreme V12 Lamborghini ever built. The Aventador SVJ poster captures its aggressive aerodynamics and racing pedigree in gallery-grade detail.",
    specs: [
      { label: "Top Speed", value: "350", unit: "km/h", sub: "217 mph" },
      { label: "0–100 km/h", value: "2.8", unit: "s" },
      { label: "Power", value: "770", unit: "hp", sub: "@ 8,500 rpm" },
      { label: "Engine", value: "6.5L V12", sub: "Naturally Aspirated" },
      { label: "Torque", value: "720", unit: "Nm", sub: "@ 6,750 rpm" },
      { label: "MSRP", value: "$517,000", sub: "USD" },
    ],
  }),
  defineProduct({
    title: "Ferrari LaFerrari\u00A0Poster",
    division: "performance",
    collection: "ferrari",
    basePrice: 45,
    image: PLACEHOLDER_POSTER, // TODO: upload /products/ferrari-laferrari/poster.png then remove this line
    description:
      "The definitive hybrid hypercar. The Ferrari LaFerrari poster celebrates the pinnacle of Maranello's engineering and design.",
    specs: [
      { label: "Top Speed", value: "324", unit: "km/h", sub: "201 mph" },
      { label: "0–100 km/h", value: "4.1", unit: "s" },
      { label: "Power", value: "478", unit: "hp", sub: "@ 7,000 rpm" },
      { label: "Engine", value: "2.9L V8", sub: "Twin-Turbo" },
      { label: "Torque", value: "577", unit: "Nm", sub: "@ 4,000 rpm" },
      { label: "MSRP", value: "$400,000", sub: "USD" },
    ],
  }),
  defineProduct({
    title: "McLaren P1 Poster",
    division: "performance",
    collection: "mclaren",
    basePrice: 49,
    image: PLACEHOLDER_POSTER, // TODO: upload /products/mclaren-p1/poster.png then remove this line
    description:
      "The ultimate expression of McLaren engineering. The P1 hybrid hypercar poster captures its fluid aerodynamics and track-bred DNA in striking detail.",
    specs: [
      { label: "Top Speed", value: "350", unit: "km/h", sub: "217 mph" },
      { label: "0–100 km/h", value: "2.8", unit: "s" },
      { label: "Power", value: "903", unit: "hp", sub: "@ 7,500 rpm" },
      { label: "Engine", value: "3.8L V8", sub: "Twin-Turbo + Electric" },
      { label: "Torque", value: "900", unit: "Nm", sub: "@ 4,000 rpm" },
      { label: "MSRP", value: "$1,150,000", sub: "USD" },
    ],
  }),
  defineProduct({
    title: "LAMBORGHINI Urus Poster",
    division: "performance",
    collection: "lamborghini",
    basePrice: 45,
    image: PLACEHOLDER_POSTER, // TODO: upload /products/lamborghini-urus/poster.png then remove this line
    description:
      "The ultimate super-SUV. The Lamborghini Urus poster showcases its aggressive styling and versatile performance.",
    specs: [
      { label: "Top Speed", value: "296", unit: "km/h", sub: "184 mph" },
      { label: "0–100 km/h", value: "3.2", unit: "s" },
      { label: "Power", value: "641", unit: "hp", sub: "@ 6,000 rpm" },
      { label: "Engine", value: "4.0L V8", sub: "Twin-Turbo" },
      { label: "Torque", value: "850", unit: "Nm", sub: "@ 2,250 rpm" },
      { label: "MSRP", value: "$230,000", sub: "USD" },
    ],
  }),
  defineProduct({
    title: "Lamborghini Revuelto Poster",
    division: "premium",
    collection: "lamborghini",
    basePrice: 49,
    // image auto -> /products/lamborghini-revuelto/poster.png
    framedImage: "/products/lamborghini-revuelto/framed.png",
    description:
      "The new era of the Raging Bull. The Lamborghini Revuelto poster captures its futuristic design and hybrid V12 powertrain in stunning collector-grade detail.",
    specs: [
      { label: "Top Speed", value: "350", unit: "km/h", sub: "217 mph" },
      { label: "0–100 km/h", value: "2.5", unit: "s" },
      { label: "Power", value: "1,001", unit: "hp", sub: "@ 9,250 rpm" },
      { label: "Engine", value: "6.5L V12", sub: "Naturally Aspirated + Electric" },
      { label: "Torque", value: "725", unit: "Nm", sub: "@ 6,750 rpm" },
      { label: "MSRP", value: "$608,000", sub: "USD" },
    ],
  }),
];

/* ----------------------------- selectors ------------------------------- */

/**
 * A product is "live" only once it has real uploaded artwork. Until then it is
 * treated as Coming Soon (see comingSoon.ts) and never rendered as a buyable
 * card with a placeholder/duplicate image.
 */
export const hasArtwork = (product: Product): boolean =>
  product.image.trim().length > 0 && product.image !== PLACEHOLDER_POSTER;

/** Products with real artwork — these are the ones shown as product cards. */
export const availableProducts = products.filter(hasArtwork);

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

/** Only products with artwork appear in collection/division product grids. */
export const getProductsByCollection = (collection: CollectionId) =>
  availableProducts.filter((p) => p.collection === collection);

export const getProductsByDivision = (division: Division) =>
  availableProducts.filter((p) => p.division === division);

/** Stripe Payment Link for a given size + frame, or "" if not yet set. */
export const getStripeLink = (
  product: Product,
  sizeCode: string,
  frameCode: string,
): string => product.stripe[`${sizeCode}_${frameCode}`] ?? "";

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
