import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const layerName = 'image'
const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@vueuse/nuxt', '@nuxt/ui', '@nuxt/eslint', '@nuxt/fonts'],
  css: [`${currentDir}/assets/css/main.css`],
  eslint: {
    config: {
      standalone: false,
    },
  },
  fonts: {
    families: [
      { name: 'Geist', provider: 'google' },
      { name: 'Geist Mono', provider: 'google' },
    ],
  },
})
