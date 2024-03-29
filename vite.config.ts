import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import { createSvg } from "./src/utils/svg"
import monacoEditorPlugin from "vite-plugin-monaco-editor"

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir)
}

export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@": pathResolve("src"),
      "#": pathResolve("types"),
    },
    dedupe: ["vue"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "src/styles/style.scss";`,
      },
    },
  },
  plugins: [vue(), createSvg("./src/assets/svg/"), monacoEditorPlugin()],
  build: {
    emptyOutDir: true,
  },
})
