/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup-tests.ts",
  },
  css: {
    modules: mode !== "test" ? {} : { generateScopedName: (name) => name },
  },
}));
