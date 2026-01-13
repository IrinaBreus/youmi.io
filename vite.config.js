// для многостраничных сайтов

// import { dirname, resolve } from 'node:path'
// import { fileURLToPath } from 'node:url'
// import { defineConfig } from 'vite'

// const __dirname = dirname(fileURLToPath(import.meta.url))

// export default defineConfig({
//   build: {
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, 'index.html'),
//         // nested: resolve(__dirname, 'nested/index.html'),
//       },
//     },
//   },
// plugins: [
//     createSvgIconsPlugin({
//       iconDirs: [path.resolve(__dirname, 'src/icons')],
//       symbolId: 'icon-[name]'
//     })
//   ]
// })


// оптимизация изображений

import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';


export default defineConfig({
  plugins: [
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
      svgoOptions: {
        plugins: [
          {
            name: 'removeAttrs',
            params: {
              attrs: '(fill|stroke|style)'  // удаляет fill, stroke и инлайновые стили
            }
          }
        ]
      }
    })
  ],
  
});