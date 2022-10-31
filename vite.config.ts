
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';
import {configDefaults} from "vitest/config"


// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, "example/**/*", ".image/*", ".husky/*"],
  },
  plugins: [vue()],
  publicDir: resolve(__dirname,'example/public'),
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@/': new URL('./example/', import.meta.url).pathname
    }
  },
  build:{
    minify: "esbuild",
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "libs/index.ts"),
      name: "vue-squadpay",
      fileName: (format) => `squad.${format}.js`,
      formats: ['umd','es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
    
  }
})
