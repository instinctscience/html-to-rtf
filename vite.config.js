// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "index.js"),
      name: "html-to-rtf",
      // the proper extensions will be added
      fileName: "html-to-rtf",
    },
    rollupOptions: {},
  },

  plugins: [nodePolyfills()],
});
