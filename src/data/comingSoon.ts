import type { CollectionId, Division } from "./products";
import { products, hasArtwork } from "./products";
import { getCollection } from "./collections";

export type ComingSoonItem = {
  id: string;
  title: string;
  marque: string;
  collection: CollectionId;
  division: Division;
};

/**
 * Genuine teasers — cars that do NOT have a product entry yet. Do not list a
 * car here if it already exists in products.ts: any product without uploaded
 * artwork is shown as Coming Soon automatically (see `fromProducts` below), so
 * adding it here too would duplicate it.
 */
const teasers: ComingSoonItem[] = [
  { id: "porsche-gt3rs", title: "Porsche GT3 RS", marque: "Porsche", collection: "porsche", division: "performance" },
  { id: "ferrari-f40", title: "Ferrari F40", marque: "Ferrari", collection: "ferrari", division: "performance" },
  { id: "aston-valkyrie", title: "Aston Martin Valkyrie", marque: "Aston Martin", collection: "hypercar", division: "premium" },
];

/** Products that have no real poster yet are presented as Coming Soon. */
const fromProducts: ComingSoonItem[] = products
  .filter((p) => !hasArtwork(p))
  .map((p) => ({
    id: p.id,
    title: p.title.replace(/\s*poster\s*$/i, "").trim(),
    marque: getCollection(p.collection).marque,
    collection: p.collection,
    division: p.division,
  }));

/** Upcoming artwork shown across the site — real products first, then teasers. */
export const comingSoon: ComingSoonItem[] = [...fromProducts, ...teasers];

export const getComingSoonByCollection = (collection: CollectionId) =>
  comingSoon.filter((c) => c.collection === collection);

export const getComingSoonByDivision = (division: Division) =>
  comingSoon.filter((c) => c.division === division);
