import { defineStore } from 'pinia'

import { useFetchApiRequest } from '@/composables/useApiRequest'
import { HttpCatchedError } from '@/utils/network/error.service'

import { useAuthStore } from './auth/useAuthStore'
import { type IUserData } from './user.types'

export const TOKEN_LOCAL_STORAGE_KEY = 'x-token'

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()
  const user: Ref<IUserData | undefined> = ref()
  const isAuth = computed<boolean>(() =>
    Boolean(user.value && Object.keys(user.value).every(field => !!field))
  )

  const _fetchUserData = async () => {
    try {
      const response = (await useFetchApiRequest('/auth/users/me')) as {
        error?: { data: { detail: string }; id?: number }
      }

      if (response.error) {
        throw response.error.data.detail
      }

      if (!response.error) {
        user.value = response as IUserData

        return { data: response, error: null, status: true }
      }
    } catch (error) {
      return HttpCatchedError({ error })
    }
  }

  const createUser = async ({
    login,
    password
  }: {
    login: string
    password: string
  }) => {
    const { status } = await authStore.signUp({ login, password })
    if (status) {
      const authUserApiResponse = await authUser({ login, password })

      return { status: authUserApiResponse.status }
    }

    return HttpCatchedError()
  }

  const authUser = async ({
    login,
    password
  }: {
    login: string
    password: string
  }) => {
    const { status } = await authStore.signIn({ login, password })
    if (status) {
      await _fetchUserData()

      return { status: true }
    }

    return HttpCatchedError()
  }

  const initializeUser = async () => {
    if (localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)) {
      authStore.token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
      await _fetchUserData()
    }
  }

  const forget = async () => {
    // const { data, error, status } = await authStore.signOut()
    // if (status) {
    //   return { data, error, status }
    // }

    await authStore.signOut()
    user.value = undefined
    return HttpCatchedError({ error: false, status: true })
  }

  return { isAuth, user, createUser, authUser, initializeUser, forget }
})
