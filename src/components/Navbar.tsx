import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { divisions } from "@/data/divisions";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`glass-nav fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 lg:px-10">
        <Link
          to="/"
          className="silver-text font-display text-xl tracking-[0.18em] sm:text-2xl"
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
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {collectionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="glass absolute left-1/2 top-full w-72 -translate-x-1/2 rounded-md p-2 pt-3"
                >
                  {divisions.map((d) => (
                    <Link
                      key={d.id}
                      to={d.path}
                      className="block rounded-sm px-4 py-3 transition-colors hover:bg-white/5"
                    >
                      <span
                        className={`block font-display text-base ${
                          d.id === "performance" ? "perf-text" : "silver-text"
                        }`}
                      >
                        {d.name}
                      </span>
                      <span className="eyebrow text-[0.6rem]">{d.tagline}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/premium">Premium</NavLink>
          <NavLink to="/performance">Performance</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        <button
          className="md:hidden text-foreground"
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="mx-6 mt-4 space-y-1 border-t border-white/10 pt-4">
              <MobileLink to="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
              <MobileLink to="/about" onClick={() => setMobileOpen(false)}>About</MobileLink>
              <p className="eyebrow px-1 pt-4">Collections</p>
              {divisions.map((d) => (
                <MobileLink key={d.id} to={d.path} onClick={() => setMobileOpen(false)}>
                  {d.name}
                </MobileLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  to,
  params,
  children,
}: {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      params={params}
      activeOptions={{ exact: to === "/" }}
      className="text-xs font-semibold uppercase tracking-[0.22em] text-silver/80 transition-colors hover:text-foreground"
      activeProps={{ className: "text-foreground" }}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  to,
  params,
  children,
  onClick,
}: {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      params={params}
      onClick={onClick}
      className="block py-2.5 text-sm uppercase tracking-[0.18em] text-silver/80"
    >
      {children}
    </Link>
  );
}
