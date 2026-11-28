import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    // The Netlify plugin is only needed for deployment builds; its edge-function
    // simulator requires Deno and breaks local `vite dev` without it.
    process.env.NETLIFY_BUILD === "1" ? netlify() : null,
    tanstackStart(),
    viteReact(),
  ].filter(Boolean),
});

export default config;
