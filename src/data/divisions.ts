import type { Division } from "./products";

export type DivisionMeta = {
  id: Division;
  slug: string;
  path: "/premium" | "/performance";
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
};

/** The two signature CarCentralCo divisions. */
export const divisions: DivisionMeta[] = [
  {
    id: "premium",
    slug: "premium",
    path: "/premium",
    name: "Premium Collection",
    eyebrow: "The Gallery",
    tagline: "Luxury Automotive Art",
    description:
      "Collector-grade artwork curated like fine art. Sophisticated, restrained, and gallery-ready — the Premium Collection is the quiet luxury side of CarCentralCo.",
  },
  {
    id: "performance",
    slug: "performance",
    path: "/performance",
    name: "Performance Collection",
    eyebrow: "The Division",
    tagline: "High-Performance Automotive Art",
    description:
      "Original poster designs engineered for enthusiasts. Horsepower, top speed, and raw numbers rendered with dramatic intensity — this is CarCentralCo at full throttle.",
  },
];

export const getDivision = (id: Division) =>
  divisions.find((d) => d.id === id)!;
