import { ofetch } from 'ofetch'

import { useAuthStore } from '@/store/auth/useAuthStore'

export default defineNuxtPlugin(_nuxtApp => {
  globalThis.$fetch = ofetch.create({
    onRequest({ request: _request, options }) {
      const authStore = useAuthStore()

      if (authStore.isAuth) {
        const authHeader = { Authorization: `Bearer ${authStore.token}` }
        options.headers = authHeader
      } else {
        console.log('Not authenticated')
      }

      console.log(options)
    },

    onRequestError({ error }) {
      console.error(
        '---------------------------------------------------------------'
      )
      console.error('ERROR')
      // console.error('METHOD', method)
      // console.error('URL', url)
      // console.error('DATA', data)
      console.error(
        '---------------------------------------------------------------'
      )
      console.error(error)
    }
  })
})
