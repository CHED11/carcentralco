import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import type { ComingSoonItem } from "@/data/comingSoon";
import { useNotify } from "./NotifyModal";

export function ComingSoonCard({ item }: { item: ComingSoonItem }) {
  const { open } = useNotify();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-lg border border-white/10 bg-charcoal transition-colors duration-500 hover:border-silver/40"
    >
      {/* framed art placeholder area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-charcoal-light to-background">
        <div className="absolute inset-6 rounded-sm border border-white/10 transition-transform duration-700 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 spotlight opacity-40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <span className="eyebrow text-[0.55rem] text-silver-dim">{item.marque}</span>
          <span className="mt-3 font-display text-2xl leading-tight text-silver/80">
            {item.title.replace(item.marque, "").trim() || item.title}
          </span>
        </div>
        {/* silver glow on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 spotlight" />
        </div>

        <span className="absolute left-4 top-4 rounded-full border border-silver/30 bg-black/50 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-silver backdrop-blur-sm">
          Coming Soon
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="truncate text-sm text-foreground">{item.title}</p>
          <p className="eyebrow text-[0.55rem]">Future Release</p>
        </div>
        <button
          onClick={() => open(item.title)}
          className="flex shrink-0 items-center gap-1.5 rounded-sm border border-white/15 px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-silver/80 transition-colors hover:border-silver/50 hover:text-foreground"
        >
          <Bell className="h-3 w-3" />
          Notify
        </button>
      </div>
    </motion.div>
  );
}
