import vue from "@vitejs/plugin-vue";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";
import { VitePWA } from "vite-plugin-pwa";

/** @type {import('vite').UserConfig} */
export default {
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [
    vue(),
    compression(),
    react(),
    VitePWA({
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg}"],
      },
    }),
  ],
};
