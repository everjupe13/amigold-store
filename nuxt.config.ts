import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  experimental: {
    renderJsonPayloads: false
  },

  runtimeConfig: {
    public: {
      baseUrl: 'http://185.18.55.254:8000/'
    }
  },

  routeRules: {
    '/product/**': { ssr: false }
  },

  modules: ['@nuxtjs/eslint-module', '@pinia/nuxt'],

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  alias: {
    '~': fileURLToPath(new URL('./', import.meta.url)),
    '@': fileURLToPath(new URL('./', import.meta.url)),
    assets: fileURLToPath(new URL('assets', import.meta.url)),
    public: fileURLToPath(new URL('public', import.meta.url))
  },

  // tailwindcss: {
  //   cssPath: '~/assets/scss/tailwind.scss',
  //   configPath: 'tailwind.config',
  //   exposeConfig: false,
  //   exposeLevel: 2,
  //   config: {},
  //   injectPosition: 'last',
  //   viewer: true
  // },
  css: [
    'vue-final-modal/style.css',

    '~/assets/scss/index.scss',
    '~/assets/scss/tailwind.scss',
    '~/assets/scss/fonts.scss',
    '~/assets/scss/custom-scrollbar.scss'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano: {}
      // ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    }
  }

  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@use "~/assets/scss/core.scss" as *;'
  //       }
  //     }
  //   }
  // }
})
