import { Reveal } from "@/components/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-28 sm:py-40">
      {/* faint oversized watermark wordmark */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[22vw] leading-none tracking-tight text-white/[0.02]"
        aria-hidden
      >
        ENTHUSIAST
      </div>
      <div className="aurora-silver pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="eyebrow">Our Philosophy</p>
        </Reveal>
        <Reveal delay={0.1} blur>
          <h2 className="display-fluid mt-6 font-display text-4xl leading-tight text-foreground sm:text-6xl">
            Built For <span className="silver-text italic">Car Enthusiasts.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="divider-glow mx-auto my-8 h-px w-24" />
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mx-auto max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
            CarCentralCo creates premium automotive artwork inspired by the world's
            most iconic performance cars. Every design is created to celebrate
            engineering, performance, and automotive passion.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
