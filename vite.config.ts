import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(projectRoot, "index.html"),
        partner: resolve(projectRoot, "become-a-partner/index.html"),
        privacy: resolve(projectRoot, "privacy-policy/index.html"),
        terms: resolve(projectRoot, "terms/index.html"),
      },
    },
  },
});
