import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
process.env.BROWSER = "chrome";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: "/index.html",
  },
  base: "/simple-chess/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  build: {
    target: "es2020",
    outDir: "docs",
    emptyOutDir: true,
    sourcemap: true,
  },
});
