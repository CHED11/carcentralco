import type { CollectionId } from "./products";
import { products } from "./products";
import { comingSoon } from "./comingSoon";

export type Collection = {
  id: CollectionId;
  slug: string;
  name: string;
  marque: string;
  tagline: string;
  description: string;
};

/**
 * Optional rich copy for collection landing pages. You do NOT have to add an
 * entry here to use a collection — any marque referenced by a product (or a
 * coming-soon item) gets a sensible auto-generated collection page. Add an
 * entry only when you want a custom name/tagline/description.
 */
const registry: Collection[] = [
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

/** "aston-martin" -> "Aston Martin" */
const titleCase = (id: string) =>
  id
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** Build default copy for a collection that has no registry entry. */
const makeDefault = (id: CollectionId): Collection => {
  const marque = titleCase(id);
  return {
    id,
    slug: id,
    name: `${marque} Collection`,
    marque,
    tagline: "Automotive Art",
    description: `Collector-grade ${marque} automotive art, curated for enthusiasts.`,
  };
};

/** Always returns metadata for a collection id (registry entry or a default). */
export const getCollection = (id: CollectionId): Collection =>
  registry.find((c) => c.id === id) ?? makeDefault(id);

/** Backwards-compatible export: the hand-authored collection registry. */
export const collections = registry;

/**
 * Every collection that actually has products or upcoming items — registry
 * entries first (in their authored order), then any extra marques. Drives the
 * sitemap and "explore more" links, so new collections appear automatically.
 */
export const listCollections = (): Collection[] => {
  const used = new Set<CollectionId>();
  for (const p of products) used.add(p.collection);
  for (const c of comingSoon) used.add(c.collection);

  const ordered: CollectionId[] = registry
    .filter((c) => used.has(c.id))
    .map((c) => c.id);
  for (const id of used) if (!ordered.includes(id)) ordered.push(id);

  return ordered.map(getCollection);
};

/** Resolve a collection by slug, but only if it has content (else 404). */
export const getCollectionBySlug = (slug: string): Collection | undefined => {
  const known = registry.find((c) => c.slug === slug);
  if (known) return known;
  return listCollections().some((c) => c.slug === slug) ? getCollection(slug) : undefined;
};
