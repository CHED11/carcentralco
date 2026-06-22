import { Link } from "@tanstack/react-router";
import { divisions } from "@/data/divisions";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal/40">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
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
            <div className="silver-line mt-6 h-px w-24 opacity-50" />
          </div>

          <div>
            <p className="eyebrow mb-5">Collections</p>
            <ul className="space-y-3">
              {divisions.map((d) => (
                <li key={d.id}>
                  <Link
                    to={d.path}
                    className="text-sm text-silver/70 transition-colors hover:text-foreground"
                  >
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
                <Link to="/" className="text-sm text-silver/70 transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-silver/70 transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/product/$slug"
                  params={{ slug: "porsche-918-spyder" }}
                  className="text-sm text-silver/70 transition-colors hover:text-foreground"
                >
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
