import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  resolve: {
    alias: {
      "@": `${process.cwd()}/src`,
    },
    // Ensure a single copy of React / TanStack Query across the dependency graph.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // src/server.ts is the SSR entry (a small error-handling wrapper around
      // TanStack Start's server handler).
      server: { entry: "server" },
    }),
    // Emit the Vercel Build Output (`.vercel/output`) so the app deploys
    // natively on Vercel. Nitro also auto-detects Vercel via the VERCEL env var.
    nitro({ preset: "vercel" }),
    viteReact(),
  ],
});
