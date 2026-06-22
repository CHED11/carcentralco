import {
  Award,
  Frame,
  Gauge,
  Home,
  Maximize,
  Sparkles,
  PenTool,
} from "lucide-react";
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
    <section className="border-y border-white/10 bg-charcoal/40 py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">The CarCentralCo Standard</p>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Why Collectors Choose Us
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <div className="group flex h-full flex-col items-center justify-center gap-4 bg-charcoal px-5 py-10 text-center transition-colors duration-500 hover:bg-charcoal-light">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-silver/25 text-silver transition-all duration-500 group-hover:border-silver/60">
                  <item.icon className="h-5 w-5" strokeWidth={1.4} />
                </span>
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
