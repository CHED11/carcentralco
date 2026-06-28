import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { getCollectionBySlug, listCollections } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import { getComingSoonByCollection } from "@/data/comingSoon";
import { ProductCard } from "@/components/ProductCard";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { Reveal } from "@/components/Reveal";
import { useNotify } from "@/components/NotifyModal";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollectionBySlug(params.slug);
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.collection;
    return {
      meta: c
        ? [
            { title: `${c.name} — CarCentralCo` },
            { name: "description", content: c.description },
            { property: "og:title", content: `${c.name} — CarCentralCo` },
            { property: "og:description", content: c.description },
          ]
        : [{ title: "Collection — CarCentralCo" }],
    };
  },
  component: CollectionPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl text-foreground">Collection not found</h1>
        <Link to="/" className="eyebrow mt-6 inline-block">Return Home</Link>
      </div>
    </div>
  ),
});

function CollectionPage() {
  const { collection } = Route.useLoaderData();
  const { open } = useNotify();
  const productsInCollection = getProductsByCollection(collection.id);
  const upcoming = getComingSoonByCollection(collection.id);
  const isEmpty = productsInCollection.length === 0;

  return (
    <div className="bg-background pt-28 sm:pt-36">
      {/* Hero header */}
      <header className="relative overflow-hidden border-b border-white/10 py-24 sm:py-32">
        <div className="absolute inset-0 spotlight opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-10">
          <Reveal>
            <p className="eyebrow">{collection.tagline}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-5xl text-foreground sm:text-7xl">
              {collection.name}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="silver-line mx-auto my-7 h-px w-24 opacity-60" />
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
              {collection.description}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {/* Available products */}
        {!isEmpty && (
          <div className="mb-20">
            <Reveal>
              <p className="eyebrow mb-8">Available Now</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {productsInCollection.map((p) => (
                <Reveal key={p.id}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Empty elegant state */}
        {isEmpty && (
          <Reveal>
            <div className="glass mx-auto max-w-2xl rounded-lg px-8 py-20 text-center">
              <p className="eyebrow">Curation In Progress</p>
              <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">
                New artwork arriving soon
              </h2>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                The {collection.marque} collection is being curated with collector-grade
                precision. Reserve early access to the first releases.
              </p>
              <button
                onClick={() => open(`${collection.name}`)}
                className="silver-line mt-9 inline-flex items-center gap-2 rounded-sm px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Bell className="h-4 w-4" />
                Notify Me
              </button>
            </div>
          </Reveal>
        )}

        {/* Upcoming in this collection */}
        {upcoming.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <p className="eyebrow mb-8">Coming Soon</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {upcoming.map((item) => (
                <Reveal key={item.id}>
                  <ComingSoonCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Other collections */}
      <section className="border-t border-white/10 bg-charcoal/30 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow mb-8">Explore More</p>
          <div className="flex flex-wrap gap-4">
            {listCollections()
              .filter((c) => c.id !== collection.id)
              .map((c) => (
                <Link
                  key={c.id}
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className="hairline rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-silver/80 transition-colors hover:border-silver/50 hover:text-foreground"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
