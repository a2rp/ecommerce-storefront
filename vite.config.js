import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/ecommerce-storefront/",
  build: { sourcemap: false },
  plugins: [react()],
});
