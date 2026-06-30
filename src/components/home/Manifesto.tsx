import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const STATEMENT =
  "We don't make posters. We frame the machines that move people — rendered with the precision they deserve, and the restraint that makes them art.";

const WORDS = STATEMENT.split(" ");

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  return (
    <section ref={ref} className="relative bg-background py-32 sm:py-48">
      <div className="aurora-silver pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
        <div className="mb-10 flex items-center gap-3">
          <span className="metallic h-1.5 w-1.5 rounded-full" />
          <p className="eyebrow text-[0.6rem]">The Philosophy</p>
        </div>
        <p className="display-fluid flex flex-wrap font-display text-3xl leading-[1.25] text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.2]">
          {WORDS.map((w, i) => {
            const start = i / WORDS.length;
            const end = start + 1 / WORDS.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {w}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
