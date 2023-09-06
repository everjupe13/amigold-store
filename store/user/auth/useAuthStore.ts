import { defineStore } from 'pinia'

import { useApiRequest } from '@/composables/useApiRequest'

export const TOKEN_LOCAL_STORAGE_KEY = 'x-token'

type IAuthData = {
  login?: string
  password?: string
}

type UserResponseType = {
  login: string
  password: string
  id: number
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const authData = ref<IAuthData>({ login: undefined, password: undefined })
  const isAuth = computed<boolean>(
    () => Object.keys(authData.value).every(field => !!field) && token !== null
  )

  const signUp = async ({
    login,
    password
  }: {
    login: string
    password: string
  }) => {
    try {
      const { data, error, refresh, execute } = await useApiRequest(
        '/auth/users/',
        {
          method: 'POST',
          body: { login, password }
        }
      )

      if (data.value) {
        const responseData = data.value as UserResponseType
        authData.value = {
          login: responseData.login,
          password: responseData.password
        }

        return { data, error, refresh, execute, status: true }
      }

      return { data, error, refresh, execute, status: false }
    } catch (error) {
      console.log(error)
      return { error, status: false }
    }
  }

  const signIn = async ({
    login,
    password
  }: {
    login: string
    password: string
  }) => {
    const _fetcher = async ({
      login,
      password
    }: {
      login: string
      password: string
      // eslint-disable-next-line unicorn/consistent-function-scoping
    }) => {
      try {
        const { data, error, refresh, execute } = await useApiRequest(
          '/auth/token/login/',
          {
            method: 'POST',
            body: { login, password }
          }
        )

        if (data.value && !error.value) {
          return {
            data: data as Ref<{ auth_token: string }>,
            error: null,
            refresh,
            execute,
            status: true
          }
        }

        return {
          data: data as Ref<null>,
          error: error.value as Error | null,
          refresh,
          execute,
          status: false
        }
      } catch (error) {
        console.log(error)
        return { error: error as string, status: false, data: ref(null) }
      }
    }

    if (process.server) {
      /* empty */
    }

    if (process.client) {
      const storagedToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)

      const tokenApiResponse = await _fetcher({ login, password })
      if (tokenApiResponse.data.value) {
        const responsedToken =
          (tokenApiResponse.data.value?.auth_token as string) || ''

        if (responsedToken !== storagedToken) {
          token.value = responsedToken
          localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, responsedToken)
        }
      }
      return tokenApiResponse
    }

    return { status: false }
  }

  const signOut = async () => {
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY)
    token.value = null
    return await new Promise<void>(resolve => resolve())
  }

  return { isAuth, token, signUp, signIn, signOut }
})
