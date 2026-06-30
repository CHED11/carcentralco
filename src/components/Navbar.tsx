import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { divisions } from "@/data/divisions";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "border-b border-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 lg:px-10">
        <Link
          to="/"
          className="silver-text font-display text-xl tracking-[0.18em] transition-opacity hover:opacity-80 sm:text-2xl"
          onClick={() => setMobileOpen(false)}
        >
          CARCENTRALCO
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-9 md:flex">
          <NavLink to="/">Home</NavLink>

          <div
            className="relative"
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-silver/80 transition-colors hover:text-foreground">
              Collections
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${collectionsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {collectionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="glass absolute left-1/2 top-full w-80 -translate-x-1/2 rounded-xl p-2.5 pt-3"
                >
                  {divisions.map((d) => {
                    const isPerf = d.id === "performance";
                    return (
                      <Link
                        key={d.id}
                        to={d.path}
                        className="group flex items-center justify-between gap-3 rounded-lg px-4 py-3.5 transition-colors hover:bg-white/5"
                      >
                        <span>
                          <span className={`block font-display text-lg ${isPerf ? "perf-text" : "silver-text"}`}>
                            {d.name}
                          </span>
                          <span className="eyebrow text-[0.55rem]">{d.tagline}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-silver-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/premium">Premium</NavLink>
          <NavLink to="/performance">Performance</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        <button
          className="text-foreground md:hidden"
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 top-0 -z-10 h-[100svh] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-2 px-8 pt-20">
              {[
                { to: "/", label: "Home" },
                { to: "/premium", label: "Premium Collection" },
                { to: "/performance", label: "Performance Collection" },
                { to: "/about", label: "About" },
              ].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.4, ease: EASE }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 font-display text-3xl text-foreground"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress — thin silver reading line */}
      <motion.div
        style={{ scaleX: progress }}
        className="silver-line absolute bottom-0 left-0 h-px w-full origin-left opacity-70"
        aria-hidden
      />
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      className="group relative text-xs font-semibold uppercase tracking-[0.22em] text-silver/80 transition-colors hover:text-foreground"
      activeProps={{ className: "text-foreground" }}
    >
      {children}
      <span className="silver-line absolute -bottom-1.5 left-0 h-px w-0 opacity-70 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
