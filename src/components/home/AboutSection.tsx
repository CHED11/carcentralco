import { Reveal } from "@/components/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="eyebrow">Our Philosophy</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl leading-tight text-foreground sm:text-6xl">
            Built For <span className="silver-text italic">Car Enthusiasts.</span>
          </h2>
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
      </div>
    </section>
  );
}
