import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import wasm from 'vite-plugin-wasm'

export const layerName = 'image'
const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  devtools: { enabled: true },

  vite: {
    plugins: [wasm()],
  },
  modules: ['@vueuse/nuxt', '@nuxt/ui', '@nuxt/eslint'],
  css: [`${currentDir}/assets/css/main.css`],
  eslint: {
    config: {
      standalone: false,
    },
  },
})
