import { defu } from 'defu'

import { useFetch, UseFetchOptions } from '#app'

export const useHttp = <T>(url: string, options: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseUrl as string,
    key: url,

    // set user token if connected
    // headers: userAuth.value
    //   ? { Authorization: `Bearer ${userAuth.value}` }
    //   : {},

    onResponse(_ctx: any) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },

    onResponseError(_ctx: any) {
      // throw new myBusinessError()
    }
  }

  const params = defu(options, defaults)
  return useFetch(url, params)
}
