import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
process.env.BROWSER = "chrome";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/simple-chess/",
  server: {
    open: "/simple-chess/index.html",
    port: 3000,
  },
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
