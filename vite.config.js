           
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // многостраничность
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // about: resolve(__dirname, 'about.html'),
        // catalog: resolve(__dirname, 'catalog.html'),
        // blog: resolve(__dirname, 'blog.html'),
      },
    },
  },
  plugins: [
    // оптимизация изображений
    ViteImageOptimizer({
      // Опции (можно настроить качество и формат)
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 80, lossless: false, convert: 'webp' },
    }),
    createSvgIconsPlugin({
      // встраивает svg-спрайт
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[name]',
      // svgoOptions: {
      //   plugins: [
      //     {
      //       name: 'removeAttrs',
      //       // params: {
      //       //   attrs: '(fill|stroke|style)'  // удаляет fill, stroke и инлайновые стили
      //       // }
      //     }
      //   ]
      // }
    })
  ],
  
});