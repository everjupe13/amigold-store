export const useApiRequest = <T>(url: string, options?: {}) => {
  const config = useRuntimeConfig()
  const TOKEN_LOCAL_STORAGE_KEY = 'x-token'

  const token = ref()
  if (process.client && localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)) {
    token.value = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
  }

  return useAsyncData(url, () =>
    $fetch<T>(url, {
      ...options,
      baseURL: config.public.baseUrl as string,
      headers: {
        Accept: 'application/json',
        ...(token.value ? { Authorization: `Token ${token.value}` } : {})
      }
    }).catch(error => ({ error }))
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
    baseURL: config.public.baseUrl as string,
    headers: {
      Accept: 'application/json',
      ...(token.value ? { Authorization: `Token ${token.value}` } : {})
    }
  }).catch(error => ({ error }))
}
