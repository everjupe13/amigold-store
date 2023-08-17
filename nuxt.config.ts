// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@pinia/nuxt'],

  // plugins: [
  //   '~/plugins/foo.client.js', // only in client side
  //   '~/plugins/bar.server.js', // only in server side
  //   '~/plugins/baz.js', // both client & server
  //   { src: '~/plugins/both-sides.js' },
  //   { src: '~/plugins/client-only.js', mode: 'client' }, // only on client side
  //   { src: '~/plugins/server-only.js', mode: 'server' } // only on server side
  // ]
  css: ['~/assets/scss/index.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
      // ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/core.scss" as *;'
        }
      }
    }
  }
})
