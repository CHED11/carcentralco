import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { divisions } from "@/data/divisions";
import { useNotify } from "@/components/NotifyModal";

export function Footer() {
  const { open } = useNotify();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-charcoal/40">
      <div className="aurora-silver pointer-events-none absolute -top-20 right-0 h-64 w-96 rounded-full opacity-40 blur-3xl" aria-hidden />

      {/* CTA band */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 text-center md:flex-row md:text-left lg:px-10">
          <div>
            <h3 className="font-display text-2xl text-foreground sm:text-3xl">
              Be first to the next release.
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Reserved access for collectors. Get notified the moment new artwork drops.
            </p>
          </div>
          <button
            onClick={() => open()}
            className="btn-luxe silver-line inline-flex shrink-0 items-center gap-2 rounded-sm px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Bell className="h-4 w-4" />
            Join The Waitlist
          </button>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="silver-text font-display text-2xl tracking-[0.18em]"
            >
              CARCENTRALCO
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium collector-grade wall art featuring the world's most iconic
              performance cars. Automotive art for enthusiasts.
            </p>
            <div className="divider-glow mt-6 h-px w-24" />
          </div>

          <div>
            <p className="eyebrow mb-5">Collections</p>
            <ul className="space-y-3">
              {divisions.map((d) => (
                <li key={d.id}>
                  <Link
                    to={d.path}
                    className="group inline-flex items-center gap-2 text-sm text-silver/70 transition-colors hover:text-foreground"
                  >
                    <span className="h-px w-0 bg-silver/60 transition-all duration-300 group-hover:w-4" />
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Brand</p>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="group inline-flex items-center gap-2 text-sm text-silver/70 transition-colors hover:text-foreground">
                  <span className="h-px w-0 bg-silver/60 transition-all duration-300 group-hover:w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="group inline-flex items-center gap-2 text-sm text-silver/70 transition-colors hover:text-foreground">
                  <span className="h-px w-0 bg-silver/60 transition-all duration-300 group-hover:w-4" />
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/product/$slug"
                  params={{ slug: "porsche-918-spyder" }}
                  className="group inline-flex items-center gap-2 text-sm text-silver/70 transition-colors hover:text-foreground"
                >
                  <span className="h-px w-0 bg-silver/60 transition-all duration-300 group-hover:w-4" />
                  The 918 Spyder
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs tracking-wide text-muted-foreground">
            © {new Date().getFullYear()} CarCentralCo. All rights reserved.
          </p>
          <p className="eyebrow text-[0.6rem]">Collector-Grade Automotive Art</p>
        </div>
      </div>
    </footer>
  );
}
