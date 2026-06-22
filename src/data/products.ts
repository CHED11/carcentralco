import porsche918Asset from "@/assets/porsche-918-performance.png.asset.json";
import revueltoPosterAsset from "@/assets/revuelto-poster.png.asset.json";
import revueltoFramedAsset from "@/assets/revuelto-framed.png.asset.json";

/**
 * SINGLE SOURCE OF TRUTH for every product.
 *
 * To add a future poster: append one object below. It automatically
 * inherits the full design, product page, and collection placement.
 *
 * The product image is stored ONCE per product (the `image` field).
 * Swapping in the real framed photo later is a one-line change here that
 * updates the hero, featured section, and product gallery everywhere.
 */

export type SizeOption = {
  code: string; // used in stripe key, e.g. "16X20"
  label: string;
  popular?: boolean;
};

export type FrameOption = {
  code: string; // used in stripe key, e.g. "PRINT_ONLY"
  label: string;
};

/** The two primary brand divisions. */
export type Division = "premium" | "performance";

/** A single performance statistic shown on Performance Collection products. */
export type PerformanceSpec = {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
};

export type Product = {
  id: string;
  slug: string;
  /** key used to build stripe link keys, e.g. "918" */
  productKey: string;
  title: string;
  /** Which brand division this product belongs to. */
  division: Division;
  collection: CollectionId;
  basePrice: number;
  image: string;
  /** Optional framed/in-room artwork shown when a frame is selected. */
  framedImage?: string;
  description: string;
  features: string[];
  /** Performance statistics — only used by Performance Collection products. */
  specs?: PerformanceSpec[];
  sizes: SizeOption[];
  frames: FrameOption[];
};

export type CollectionId =
  | "porsche"
  | "lamborghini"
  | "ferrari"
  | "mclaren"
  | "hypercar";

// The Porsche 918 framed poster image — the ONE place this lives.
// This is the exact uploaded artwork, used as-is across the whole site.
export const productImage = porsche918Asset.url;

export const STANDARD_SIZES: SizeOption[] = [
  { code: "16X20", label: "16×20 Inches", popular: true },
  { code: "18X24", label: "18×24 Inches" },
  { code: "24X36", label: "24×36 Inches" },
];

export const STANDARD_FRAMES: FrameOption[] = [
  { code: "PRINT_ONLY", label: "Print Only" },
  { code: "BLACK_FRAME", label: "Black Frame" },
];

export const products: Product[] = [
  {
    id: "porsche-918-spyder",
    slug: "porsche-918-spyder",
    productKey: "918",
    title: "Porsche 918 Spyder Poster",
    division: "performance",
    collection: "porsche",
    basePrice: 49,
    image: productImage,
    description:
      "A collector-grade tribute to one of the greatest hybrid hypercars ever engineered. The Porsche 918 Spyder is rendered in cinematic monochrome with metallic silver detailing — designed to be the centrepiece of any enthusiast's space.",
    features: [
      "Premium artwork",
      "Collector-grade presentation",
      "High quality print",
      "Designed for enthusiasts",
      "Luxury wall décor",
    ],
    specs: [
      { label: "Top Speed", value: "345", unit: "km/h", sub: "214 mph" },
      { label: "0–100 km/h", value: "2.6", unit: "s" },
      { label: "System Power", value: "887", unit: "hp", sub: "@ 6,500 rpm" },
      { label: "Engine", value: "4.6L V8", sub: "Naturally Aspirated + Electric" },
      { label: "Torque", value: "1,280", unit: "Nm", sub: "@ 8,650 rpm" },
      { label: "MSRP", value: "$845,000", sub: "USD" },
    ],
    sizes: STANDARD_SIZES,
    frames: STANDARD_FRAMES,
  },
  {
    id: "lamborghini-svj",
    slug: "lamborghini-svj",
    productKey: "SVJ",
    title: "Lamborghini SVJ Poster",
    division: "performance",
    collection: "lamborghini",
    basePrice: 49,
    image: productImage,
    description:
      "The most extreme V12 Lamborghini ever built. The Aventador SVJ poster captures its aggressive aerodynamics and racing pedigree in gallery-grade detail.",
    features: [
      "Premium artwork",
      "Collector-grade presentation",
      "High quality print",
      "Designed for enthusiasts",
      "Luxury wall décor",
    ],
    specs: [
      { label: "Top Speed", value: "350", unit: "km/h", sub: "217 mph" },
      { label: "0–100 km/h", value: "2.8", unit: "s" },
      { label: "Power", value: "770", unit: "hp", sub: "@ 8,500 rpm" },
      { label: "Engine", value: "6.5L V12", sub: "Naturally Aspirated" },
      { label: "Torque", value: "720", unit: "Nm", sub: "@ 6,750 rpm" },
      { label: "MSRP", value: "$517,000", sub: "USD" },
    ],
    sizes: STANDARD_SIZES,
    frames: STANDARD_FRAMES,
  },
  {
    id: "ferrari-laferrari",
    slug: "ferrari-laferrari",
    productKey: "LAFERRARI",
    title: "Ferrari LaFerrari\u00A0Poster",
    division: "performance",
    collection: "ferrari",
    basePrice: 45,
    image: productImage,
    description:
      "The definitive hybrid hypercar. The Ferrari LaFerrari poster celebrates the pinnacle of Maranello's engineering and design.",
    features: [
      "Premium artwork",
      "Collector-grade presentation",
      "High quality print",
      "Designed for enthusiasts",
      "Luxury wall décor",
    ],
    specs: [
      { label: "Top Speed", value: "324", unit: "km/h", sub: "201 mph" },
      { label: "0–100 km/h", value: "4.1", unit: "s" },
      { label: "Power", value: "478", unit: "hp", sub: "@ 7,000 rpm" },
      { label: "Engine", value: "2.9L V8", sub: "Twin-Turbo" },
      { label: "Torque", value: "577", unit: "Nm", sub: "@ 4,000 rpm" },
      { label: "MSRP", value: "$400,000", sub: "USD" },
    ],
    sizes: STANDARD_SIZES,
    frames: STANDARD_FRAMES,
  },
  {
    id: "mclaren-p1",
    slug: "mclaren-p1",
    productKey: "P1",
    title: "McLaren P1 Poster",
    division: "performance",
    collection: "mclaren",
    basePrice: 49,
    image: productImage,
    description:
      "The ultimate expression of McLaren engineering. The P1 hybrid hypercar poster captures its fluid aerodynamics and track-bred DNA in striking detail.",
    features: [
      "Premium artwork",
      "Collector-grade presentation",
      "High quality print",
      "Designed for enthusiasts",
      "Luxury wall décor",
    ],
    specs: [
      { label: "Top Speed", value: "350", unit: "km/h", sub: "217 mph" },
      { label: "0–100 km/h", value: "2.8", unit: "s" },
      { label: "Power", value: "903", unit: "hp", sub: "@ 7,500 rpm" },
      { label: "Engine", value: "3.8L V8", sub: "Twin-Turbo + Electric" },
      { label: "Torque", value: "900", unit: "Nm", sub: "@ 4,000 rpm" },
      { label: "MSRP", value: "$1,150,000", sub: "USD" },
    ],
    sizes: STANDARD_SIZES,
    frames: STANDARD_FRAMES,
  },
  {
    id: "lamborghini-urus",
    slug: "lamborghini-urus",
    productKey: "URUS",
    title: "LAMBORGHINI Urus Poster",
    division: "performance",
    collection: "lamborghini",
    basePrice: 45,
    image: productImage,
    description:
      "The ultimate super-SUV. The Lamborghini Urus poster showcases its aggressive styling and versatile performance.",
    features: [
      "Premium artwork",
      "Collector-grade presentation",
      "High quality print",
      "Designed for enthusiasts",
      "Luxury wall décor",
    ],
    specs: [
      { label: "Top Speed", value: "296", unit: "km/h", sub: "184 mph" },
      { label: "0–100 km/h", value: "3.2", unit: "s" },
      { label: "Power", value: "518", unit: "hp", sub: "@ 8,500 rpm" },
      { label: "Engine", value: "4.0L Flat-6", sub: "Naturally Aspirated" },
      { label: "Torque", value: "465", unit: "Nm", sub: "@ 6,300 rpm" },
      { label: "MSRP", value: "$223,000", sub: "USD" },
    ],
    sizes: STANDARD_SIZES,
    frames: STANDARD_FRAMES,
  },
  {
    id: "lamborghini-revuelto",
    slug: "lamborghini-revuelto",
    productKey: "REVUELTO",
    title: "Lamborghini Revuelto Poster",
    division: "premium",
    collection: "lamborghini",
    basePrice: 49,
    image: revueltoPosterAsset.url,
    framedImage: revueltoFramedAsset.url,
    description:
      "The new era of the Raging Bull. The Lamborghini Revuelto poster captures its futuristic design and hybrid V12 powertrain in stunning collector-grade detail.",
    features: [
      "Premium artwork",
      "Collector-grade presentation",
      "High quality print",
      "Designed for enthusiasts",
      "Luxury wall décor",
    ],
    specs: [
      { label: "Top Speed", value: "350", unit: "km/h", sub: "217 mph" },
      { label: "0–100 km/h", value: "2.5", unit: "s" },
      { label: "Power", value: "1,001", unit: "hp", sub: "@ 9,250 rpm" },
      { label: "Engine", value: "6.5L V12", sub: "Naturally Aspirated + Electric" },
      { label: "Torque", value: "725", unit: "Nm", sub: "@ 6,750 rpm" },
      { label: "MSRP", value: "$608,000", sub: "USD" },
    ],
    sizes: STANDARD_SIZES,
    frames: STANDARD_FRAMES,
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCollection = (collection: CollectionId) =>
  products.filter((p) => p.collection === collection);

export const getProductsByDivision = (division: Division) =>
  products.filter((p) => p.division === division);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
