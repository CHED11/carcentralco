import { Reveal } from "@/components/Reveal";

const pillars = [
  { k: "Curated", v: "Every piece is selected and composed like fine art — never mass-produced clip art." },
  { k: "Collector-Grade", v: "Premium print quality and museum-quality presentation, built to be framed and kept." },
  { k: "Limited", v: "Short, intentional print runs. When a release is gone, it stays gone." },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-32 sm:py-44">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[22vw] leading-none tracking-tight text-white/[0.02]"
        aria-hidden
      >
        ENTHUSIAST
      </div>
      <div className="aurora-silver pointer-events-none absolute left-1/2 top-1/3 h-[50vh] w-[70vh] -translate-x-1/2 rounded-full opacity-40 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="metallic h-1.5 w-1.5 rounded-full" />
                <p className="eyebrow text-[0.6rem]">Our Philosophy</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} blur>
              <h2 className="display-fluid mt-6 font-display text-5xl leading-[1.05] text-foreground sm:text-6xl">
                Built for <span className="silver-text italic">car enthusiasts.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-balance text-lg leading-relaxed text-muted-foreground">
                CarCentralCo creates premium automotive artwork inspired by the
                world's most iconic performance cars. Every design celebrates
                engineering, performance, and the obsession that connects us.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {pillars.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.1}>
                <div className="group bg-[#0c0c0c] p-7 transition-colors duration-500 hover:bg-charcoal-light sm:p-9">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-sm text-white/25">0{i + 1}</span>
                    <h3 className="font-display text-2xl text-foreground">{p.k}</h3>
                  </div>
                  <p className="mt-3 pl-9 text-sm leading-relaxed text-muted-foreground">{p.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
