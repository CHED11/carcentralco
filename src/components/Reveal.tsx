import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Horizontal travel distance in px (for cinematic side reveals). */
  x?: number;
  /** Adds a soft focus-pull (blur → sharp) for a more cinematic entrance. */
  blur?: boolean;
  className?: string;
  once?: boolean;
};

/**
 * Cinematic reveal-on-scroll wrapper. Slow, restrained, never bouncy.
 * Global <MotionConfig reducedMotion="user"> strips the transform for users
 * who prefer reduced motion, leaving a gentle opacity fade.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  blur = false,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
