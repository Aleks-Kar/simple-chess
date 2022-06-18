import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
process.env.BROWSER = 'chrome'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: "/index.html",
  },
});
