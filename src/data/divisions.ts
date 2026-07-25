import type { Division } from "./products";

export type DivisionMeta = {
  id: Division;
  slug: string;
  path: "/premium" | "/performance";
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  /**
   * When true the whole division is in a "Coming Soon" hold: none of its
   * products are treated as live (no cards, prices, checkout or product
   * routes), and the division pages show a polished Coming Soon state. Flip
   * back to false / remove to launch the division. Single source of truth.
   */
  comingSoon?: boolean;
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
    // Not launching yet — the whole Performance division is on Coming Soon hold.
    comingSoon: true,
  },
];

export const getDivision = (id: Division) =>
  divisions.find((d) => d.id === id)!;

/** True when a division is on a Coming Soon hold (no live products/routes). */
export const isDivisionComingSoon = (id: Division): boolean =>
  getDivision(id).comingSoon === true;
