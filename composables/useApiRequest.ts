export const useApiRequest = <T>(url: string, options?: {}) => {
  const config = useRuntimeConfig()
  const TOKEN_LOCAL_STORAGE_KEY = 'x-token'

  const token = ref()
  if (process.client && localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)) {
    token.value = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
  }

  return useAsyncData<T>(url, () =>
    $fetch(url, {
      ...options,
      timeout: 5000,
      baseURL: config.public.baseUrl as string,
      headers: {
        Accept: 'application/json',
        ...(token.value ? { Authorization: `Token ${token.value}` } : {})
      }
    })
  )
}

export const useFetchApiRequest = (url: string, options?: {}) => {
  const config = useRuntimeConfig()
  const TOKEN_LOCAL_STORAGE_KEY = 'x-token'

  const token = ref()
  if (process.client && localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)) {
    token.value = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
  }

  return $fetch(url, {
    ...options,
    timeout: 5000,
    baseURL: config.public.baseUrl as string,
    headers: {
      Accept: 'application/json',
      ...(token.value ? { Authorization: `Token ${token.value}` } : {})
    }
  })
}
