import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const testimonials = [
  { quote: "The perfect centrepiece for my office.", name: "James R.", role: "Collector" },
  { quote: "Looks incredible in my garage.", name: "Daniel M.", role: "Enthusiast" },
  { quote: "Premium quality from frame to print.", name: "Sofia L.", role: "Collector" },
  { quote: "Exactly what every enthusiast needs.", name: "Marcus T.", role: "Owner, 918" },
];

export function SocialProof() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-charcoal/40 py-28 sm:py-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal blur>
          <div className="text-center">
            <p className="eyebrow">Trusted By Enthusiasts</p>
            <h2 className="display-fluid mt-5 font-display text-4xl text-foreground sm:text-5xl">
              From The Collectors
            </h2>
            <div className="divider-glow mx-auto mt-7 h-px w-24" />
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 0.08} y={34}>
              <motion.figure
                whileHover={{ y: -6 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="glass group flex h-full flex-col justify-between rounded-xl p-8"
              >
                <div>
                  <div className="flex gap-1 text-silver/80">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <blockquote className="mt-5 font-display text-2xl leading-snug text-foreground">
                    "{t.quote}"
                  </blockquote>
                </div>
                <figcaption className="mt-8">
                  <div className="silver-line mb-4 h-px w-10 opacity-60 transition-all duration-500 group-hover:w-16" />
                  <p className="text-sm text-silver">{t.name}</p>
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
