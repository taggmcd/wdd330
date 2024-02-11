import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        rovers: resolve(__dirname, "src/rovers/index.html"),
        about: resolve(__dirname, "src/about.html"),
      },
    },
  },
});
