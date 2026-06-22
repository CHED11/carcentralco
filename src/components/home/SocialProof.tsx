import { Reveal } from "@/components/Reveal";

const testimonials = [
  { quote: "The perfect centrepiece for my office.", name: "James R.", role: "Collector" },
  { quote: "Looks incredible in my garage.", name: "Daniel M.", role: "Enthusiast" },
  { quote: "Premium quality from frame to print.", name: "Sofia L.", role: "Collector" },
  { quote: "Exactly what every enthusiast needs.", name: "Marcus T.", role: "Owner, 918" },
];

export function SocialProof() {
  return (
    <section className="border-y border-white/10 bg-charcoal/40 py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Trusted By Enthusiasts</p>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
              From The Collectors
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="glass flex h-full flex-col justify-between rounded-lg p-8">
                <blockquote className="font-display text-2xl leading-snug text-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-8">
                  <div className="silver-line mb-4 h-px w-10 opacity-60" />
                  <p className="text-sm text-silver">{t.name}</p>
                  <p className="eyebrow mt-1 text-[0.55rem]">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
