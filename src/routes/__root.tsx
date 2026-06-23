import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { LoadingScreen } from "../components/LoadingScreen";
import { NotifyProvider } from "../components/NotifyModal";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CarCentralCo — Automotive Art For Enthusiasts" },
      {
        name: "description",
        content:
          "Premium collector-grade wall art featuring the world's most iconic performance cars. Museum-quality automotive posters for enthusiasts.",
      },
      { name: "author", content: "CarCentralCo" },
      { property: "og:title", content: "CarCentralCo — Automotive Art For Enthusiasts" },
      {
        property: "og:description",
        content:
          "Premium collector-grade wall art featuring the world's most iconic performance cars.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@CarCentralCo" },
      { name: "twitter:title", content: "CarCentralCo — Automotive Art For Enthusiasts" },
      { name: "description", content: "CarCentralCo offers premium, collector-grade automotive art posters for enthusiasts." },
      { property: "og:description", content: "CarCentralCo offers premium, collector-grade automotive art posters for enthusiasts." },
      { name: "twitter:description", content: "CarCentralCo offers premium, collector-grade automotive art posters for enthusiasts." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/93be9f0c-d0e8-4b32-9680-2e205b9b4e11/id-preview-0f9c171a--a95efd52-4d6c-4a1d-9830-283ae6685c29.lovable.app-1781421723397.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/93be9f0c-d0e8-4b32-9680-2e205b9b4e11/id-preview-0f9c171a--a95efd52-4d6c-4a1d-9830-283ae6685c29.lovable.app-1781421723397.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <NotifyProvider>
        <LoadingScreen />
        <Navbar />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </NotifyProvider>
    </QueryClientProvider>
  );
}
