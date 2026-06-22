import type { CollectionId } from "./products";

export type Collection = {
  id: CollectionId;
  slug: string;
  name: string;
  marque: string;
  tagline: string;
  description: string;
};

/** Drives the Collections dropdown and the generic /collections/$slug page. */
export const collections: Collection[] = [
  {
    id: "mclaren",
    slug: "mclaren",
    name: "McLaren Collection",
    marque: "McLaren",
    tagline: "Engineered Obsession",
    description:
      "Track-bred precision translated into collectible automotive art. The McLaren Collection celebrates the relentless pursuit of speed.",
  },
  {
    id: "lamborghini",
    slug: "lamborghini",
    name: "Lamborghini Collection",
    marque: "Lamborghini",
    tagline: "Raging Bull",
    description:
      "Dramatic, uncompromising, theatrical. The Lamborghini Collection captures the most flamboyant machines ever built.",
  },
  {
    id: "porsche",
    slug: "porsche",
    name: "Porsche Collection",
    marque: "Porsche",
    tagline: "Precision Perfected",
    description:
      "Decades of motorsport heritage and engineering purity, rendered as gallery-grade wall art.",
  },
  {
    id: "ferrari",
    slug: "ferrari",
    name: "Ferrari Collection",
    marque: "Ferrari",
    tagline: "Prancing Horse",
    description:
      "The soul of Maranello. The Ferrari Collection honours the most emotive performance cars in history.",
  },
  {
    id: "hypercar",
    slug: "hypercar",
    name: "Hypercar Collection",
    marque: "Hypercar",
    tagline: "The Pinnacle",
    description:
      "The rarest, fastest, and most extraordinary machines on earth — curated as a future auction catalogue.",
  },
];

export const getCollectionBySlug = (slug: string) =>
  collections.find((c) => c.slug === slug);
