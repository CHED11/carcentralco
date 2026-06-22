import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CarCentralCo" },
      {
        name: "description",
        content:
          "CarCentralCo creates premium automotive artwork inspired by the world's most iconic performance cars — built for car enthusiasts.",
      },
      { property: "og:title", content: "About — CarCentralCo" },
      {
        property: "og:description",
        content:
          "Premium automotive artwork celebrating engineering, performance, and automotive passion.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-background pt-28 sm:pt-36">
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 spotlight opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Reveal>
            <p className="eyebrow">Our Philosophy</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-5xl leading-tight text-foreground sm:text-7xl">
              Built For <span className="silver-text italic">Car Enthusiasts.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="silver-line mx-auto my-8 h-px w-24 opacity-60" />
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              CarCentralCo creates premium automotive artwork inspired by the world's
              most iconic performance cars. Every design is created to celebrate
              engineering, performance, and automotive passion.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <Link
              to="/product/$slug"
              params={{ slug: "porsche-918-spyder" }}
              className="silver-line mt-10 inline-block rounded-sm px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore The Collection
            </Link>
          </Reveal>
        </div>
      </section>

      <WhyChooseUs />
    </div>
  );
}
