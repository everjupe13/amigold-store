import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import { useApiRequest } from '@/composables/useApiRequest'

export const TOKEN_LOCAL_STORAGE_KEY = 'x-token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const isAuth = computed(() => token.value !== null)

  const setSavedToken = async () => {
    const storagedToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
    if (storagedToken !== null) {
      token.value = storagedToken
    }

    return await new Promise<void>(resolve => resolve())
  }

  const signUp = async () => {
    const generatedToken = uuidv4()
    token.value = generatedToken
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, generatedToken)

    return await new Promise<void>(resolve => resolve())
    // todo fetcher

    try {
      const { data } = await useApiRequest('/auth/signup')
      if (data) {
        console.log(data)
      }
    } catch {}
  }

  const signIn = async () => {
    const storagedToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
    if (storagedToken !== null) {
      token.value = storagedToken
    }

    return await new Promise<void>(resolve => resolve())

    try {
      const { data } = await useApiRequest('/auth/signin')
      if (data) {
        console.log(data)
      }
    } catch {}
  }

  const signOut = async () => {
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY)
    token.value = null
    return await new Promise<void>(resolve => resolve())
  }

  return { isAuth, token, signUp, signIn, signOut, setSavedToken }
})
