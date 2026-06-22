import { comingSoon } from "@/data/comingSoon";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { Reveal } from "@/components/Reveal";

export function ComingSoonSection({
  items = comingSoon,
}: {
  items?: typeof comingSoon;
}) {
  return (
    <section className="bg-background py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">The Future Catalogue</p>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Coming Soon
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              A preview of upcoming artwork entering the collection. Reserve early
              access to the next releases.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 0.08}>
              <ComingSoonCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
