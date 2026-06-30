import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { comingSoon } from "@/data/comingSoon";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { Reveal } from "@/components/Reveal";

export function ComingSoonSection({
  items = comingSoon,
}: {
  items?: typeof comingSoon;
}) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-28 sm:py-36">
      <div className="aurora-silver pointer-events-none absolute -top-24 left-1/2 h-[50vh] w-[80vh] -translate-x-1/2 rounded-full opacity-50 blur-3xl" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header + countdown */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal blur>
            <div>
              <p className="eyebrow text-[0.6rem]">The Future Catalogue</p>
              <h2 className="display-fluid mt-4 font-display text-4xl text-foreground sm:text-6xl">
                What's
                <span className="silver-text block italic">arriving next.</span>
              </h2>
              <p className="mt-6 max-w-md text-balance text-sm leading-relaxed text-muted-foreground">
                A preview of upcoming artwork entering the collection. Reserve early
                access — releases are limited and move quickly.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12} x={30}>
            <NextDropCountdown />
          </Reveal>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 0.07} y={34}>
              <ComingSoonCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Next drop countdown ---------- */

// A rolling two-week cadence anchored to a fixed epoch, so the timer is always
// counting down to a real future moment and never expires.
const CADENCE_MS = 14 * 24 * 60 * 60 * 1000;
const ANCHOR = Date.UTC(2026, 0, 1);

function nextDropRemaining(): number {
  const now = Date.now();
  const next = ANCHOR + Math.ceil((now - ANCHOR) / CADENCE_MS) * CADENCE_MS;
  return Math.max(0, next - now);
}

function split(ms: number) {
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function NextDropCountdown() {
  // Render placeholder on the server / first paint to avoid hydration drift,
  // then start the live ticker once mounted on the client.
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    setMounted(true);
    setRemaining(nextDropRemaining());
    const id = setInterval(() => setRemaining(nextDropRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = split(remaining);
  const units: { label: string; value: number }[] = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="glass rounded-2xl p-8 sm:p-10">
      <div className="flex items-center gap-3">
        <span className="metallic h-1.5 w-1.5 rounded-full" />
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-silver-dim">
          Next Release Drops In
        </p>
      </div>

      <div className="mt-7 grid grid-cols-4 gap-3 sm:gap-4">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.02] px-2 py-5 sm:py-6">
            <motion.span
              key={mounted ? u.value : -1}
              initial={mounted ? { opacity: 0, y: -8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl text-foreground tabular-nums sm:text-4xl"
            >
              {mounted ? String(u.value).padStart(2, "0") : "--"}
            </motion.span>
            <span className="mt-2 text-[0.5rem] font-semibold uppercase tracking-[0.3em] text-silver-dim sm:text-[0.55rem]">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
