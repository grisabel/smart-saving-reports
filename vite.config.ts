import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remoteReportsMfe",
      filename: "remoteReportsMfe.js",
      exposes: {
        "./CategoriesReport":
          "./src/pages/Reports/view/pages/CategoriesReport/CategoriesReport.tsx",
        "./CategoriesDetailsReport":
          "./src/pages/Reports/view/pages/CategoriesDetailsReport/CategoriesDetailsReport.tsx",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
