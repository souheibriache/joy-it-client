import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // You can add more aliases here if needed:
      components: path.resolve(__dirname, "src/components"),
      lib: path.resolve(__dirname, "src/lib"),
      // etc.
    },
  },
});
