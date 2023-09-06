import { defineStore } from 'pinia'

import { useFetchApiRequest } from '@/composables/useApiRequest'
import { useAuthStore } from '@/store/user/auth/useAuthStore'

export const TOKEN_LOCAL_STORAGE_KEY = 'x-token'

type IUserData = {
  id: number
  client: number
  pages: {
    id: number
    page: {
      id: number
      name: string
      url: string
    }
    permission: {
      id: 0
      name: string
      can_open: boolean
      can_edit: boolean
    }
    role: number
  }[]
  name: string
  email: string
  phone: string
  comment: string
  is_manager: boolean
}

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()
  const user: Ref<IUserData | undefined> = ref()
  const isAuth = computed<boolean>(() =>
    Boolean(user.value && Object.keys(user.value).every(field => !!field))
  )

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

    return { status: false }
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

    return { status: false }
  }

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
      return { status: false, error }
    }
  }

  const initializeUser = async () => {
    if (localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)) {
      authStore.token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
      await _fetchUserData()
    }
  }

  return { isAuth, user, createUser, authUser, initializeUser }
})
