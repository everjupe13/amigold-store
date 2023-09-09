import { AxiosError } from 'axios'

export type ErrorReturnType = {
  status?: boolean
  error?: AnyObject | string | AxiosError | any
}

export const HttpCatchedError = (opt?: ErrorReturnType) => {
  if (opt?.error && opt.error instanceof Object) {
    const errors = opt?.error?.response?.data as AnyObject
    return { error: errors, status: false }
  }
  return { error: opt?.error || true, status: false }
}
