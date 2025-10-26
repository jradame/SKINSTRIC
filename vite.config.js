// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["axios"], // Ensure axios is bundled
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      // No externals, axios must be bundled
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
