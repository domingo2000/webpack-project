import vue from "@vitejs/plugin-vue";
import { compression } from "vite-plugin-compression2";

/** @type {import('vite').UserConfig} */
export default {
  root: "src",
  outDir: "../dist",
  plugins: [vue(), compression()],
};
