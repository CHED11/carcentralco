import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const hero = {
  quote: "It doesn't feel like a poster on the wall. It feels like a piece of the car itself.",
  name: "Marcus T.",
  role: "Owner, Porsche 918",
};

const supporting = [
  { quote: "The perfect centrepiece for my office.", name: "James R.", role: "Collector" },
  { quote: "Looks incredible in my garage.", name: "Daniel M.", role: "Enthusiast" },
  { quote: "Premium quality from frame to print.", name: "Sofia L.", role: "Collector" },
];

export function SocialProof() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-28 sm:py-36">
      <div className="aurora-silver pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[70vh] -translate-x-1/2 rounded-full opacity-40 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="metallic h-1.5 w-1.5 rounded-full" />
            <p className="eyebrow text-[0.6rem]">From The Collectors</p>
            <span className="metallic h-1.5 w-1.5 rounded-full" />
          </div>
        </Reveal>

        {/* Hero quote */}
        <Reveal delay={0.1} blur>
          <figure className="mx-auto mt-12 max-w-3xl text-center">
            <div className="mb-6 flex justify-center gap-1 text-silver/80">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="display-fluid font-display text-3xl leading-snug text-foreground sm:text-4xl lg:text-5xl">
              "{hero.quote}"
            </blockquote>
            <figcaption className="mt-8">
              <div className="divider-glow mx-auto mb-4 h-px w-16" />
              <p className="text-sm text-silver">{hero.name}</p>
              <p className="eyebrow mt-1 text-[0.55rem]">{hero.role}</p>
            </figcaption>
          </figure>
        </Reveal>

        {/* Supporting quotes */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {supporting.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} y={30}>
              <motion.figure
                whileHover={{ y: -6 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full flex-col justify-between rounded-xl border border-white/10 bg-charcoal/60 p-7"
              >
                <blockquote className="font-display text-xl leading-snug text-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6">
                  <div className="silver-line h-px w-8 opacity-60 transition-all duration-500 group-hover:w-14" />
                  <p className="mt-4 text-sm text-silver">{t.name}</p>
                  <p className="eyebrow mt-1 text-[0.55rem]">{t.role}</p>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
