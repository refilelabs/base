import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const layerName = 'image'
const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@nuxt/ui', '@nuxt/eslint'],
  css: [`${currentDir}/assets/css/main.css`],
  eslint: {
    config: {
      standalone: false,
    },
  },
  // Hotfix until Nuxt 3.17 is released
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
  },
})
