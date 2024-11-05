import { cssImports } from './config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: cssImports,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:map"; @import "assets/styles/mixin.scss";',
        },
      },
    },
  },
})
