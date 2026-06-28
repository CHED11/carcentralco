import {
  Award,
  Frame,
  Gauge,
  Home,
  Maximize,
  Sparkles,
  PenTool,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const items = [
  { icon: Sparkles, label: "Premium Print Quality" },
  { icon: Award, label: "Collector Grade Artwork" },
  { icon: Gauge, label: "Designed For Enthusiasts" },
  { icon: Home, label: "Luxury Home & Office Décor" },
  { icon: Maximize, label: "Multiple Sizes Available" },
  { icon: Frame, label: "Museum Quality Presentation" },
  { icon: PenTool, label: "Automotive-Inspired Design" },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-charcoal/40 py-28 sm:py-32">
      <div className="aurora-silver pointer-events-none absolute -bottom-32 right-1/4 h-[50vh] w-[60vh] rounded-full opacity-50 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal blur>
          <div className="text-center">
            <p className="eyebrow">The CarCentralCo Standard</p>
            <h2 className="display-fluid mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Why Collectors Choose Us
            </h2>
            <div className="divider-glow mx-auto mt-7 h-px w-24" />
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={(i % 4) * 0.06}>
              <div className="group relative flex h-full flex-col items-center justify-center gap-4 bg-charcoal px-5 py-12 text-center transition-colors duration-500 hover:bg-charcoal-light">
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-silver/25 text-silver transition-all duration-500 group-hover:border-silver/60 group-hover:shadow-[0_0_24px_-6px_rgba(232,232,232,0.4)]"
                >
                  <item.icon className="h-5 w-5" strokeWidth={1.4} />
                </motion.span>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-silver/80">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
