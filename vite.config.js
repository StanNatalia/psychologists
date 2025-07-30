import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import json from "@rollup/plugin-json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), json()],
  base: "/",
  build: {
    sourcemap: true,
  },
});
