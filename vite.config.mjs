import vue from "@vitejs/plugin-vue";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";
import { VitePWA } from "vite-plugin-pwa";

/** @type {import('vite').UserConfig} */
export default {
  root: "src",
  base: "/webpack-project/",
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
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg}"],
      },
      manifest: {
        name: "Vite App",
        short_name: "Vite",
        description: "A Vite app with PWA",
        start_url: "/webpack-project/",
        display: "standalone",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
};
