import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import * as path from "path";
import { resolve } from "path"

import { createSvg } from './src/utils/svg';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  base: '/',
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types')
      },
      {
        find: '@',
        replacement: pathResolve('src')
      },
    ],
    dedupe: ['vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "src/styles/style.scss";`
      }
    }
  },
  plugins: [
    vue(),
    createSvg("./src/assets/svg/")
  ],
  build: {
    emptyOutDir: true, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
  },
});