import {
  Award,
  Frame,
  Gauge,
  Home,
  Maximize,
  Sparkles,
  PenTool,
} from "lucide-react";

const items = [
  { icon: Sparkles, label: "Premium Print Quality" },
  { icon: Award, label: "Collector Grade Artwork" },
  { icon: Gauge, label: "Designed For Enthusiasts" },
  { icon: Home, label: "Luxury Home & Office Décor" },
  { icon: Maximize, label: "Multiple Sizes Available" },
  { icon: Frame, label: "Museum Quality Presentation" },
  { icon: PenTool, label: "Automotive-Inspired Design" },
];

/** A slim, continuously-scrolling credential strip — the CarCentralCo standard. */
export function WhyChooseUs() {
  const row = [...items, ...items];
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-charcoal/40 py-6">
      <div className="edge-fade-x flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12">
          {row.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 whitespace-nowrap text-silver/70"
            >
              <item.icon className="h-4 w-4 shrink-0 text-silver/60" strokeWidth={1.4} />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em]">
                {item.label}
              </span>
              <span className="ml-9 h-1 w-1 rounded-full bg-silver-dim/40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
