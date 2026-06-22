import type { CollectionId, Division } from "./products";

export type ComingSoonItem = {
  id: string;
  title: string;
  marque: string;
  collection: CollectionId;
  division: Division;
};

/** Upcoming artwork — preview of the future catalogue. Front-end only. */
export const comingSoon: ComingSoonItem[] = [
  { id: "lambo-svj", title: "Lamborghini SVJ", marque: "Lamborghini", collection: "lamborghini", division: "performance" },
  { id: "lambo-revuelto", title: "Lamborghini Revuelto", marque: "Lamborghini", collection: "lamborghini", division: "premium" },
  { id: "lambo-urus", title: "Lamborghini Urus", marque: "Lamborghini", collection: "lamborghini", division: "premium" },
  { id: "porsche-gt3rs", title: "Porsche GT3 RS", marque: "Porsche", collection: "porsche", division: "performance" },
  { id: "ferrari-laferrari", title: "Ferrari LaFerrari", marque: "Ferrari", collection: "ferrari", division: "premium" },
  { id: "ferrari-f40", title: "Ferrari F40", marque: "Ferrari", collection: "ferrari", division: "performance" },
  { id: "mclaren-p1", title: "McLaren P1", marque: "McLaren", collection: "mclaren", division: "performance" },
  { id: "aston-valkyrie", title: "Aston Martin Valkyrie", marque: "Aston Martin", collection: "hypercar", division: "premium" },
];

export const getComingSoonByCollection = (collection: CollectionId) =>
  comingSoon.filter((c) => c.collection === collection);

export const getComingSoonByDivision = (division: Division) =>
  comingSoon.filter((c) => c.division === division);
