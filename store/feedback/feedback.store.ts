import { defineStore } from 'pinia'

export const useFeedbackStore = defineStore('feedback', () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  async function feedback({
    phone,
    email,
    userName,
    orderComment
  }: {
    phone: string
    email: string
    userName: string
    orderComment: string
  }) {
    try {
      const { data, error, refresh, execute, pending } = await useApiRequest(
        '/api/form/create',
        {
          method: 'POST',
          body: {
            phone,
            email,
            userName,
            orderComment
          }
        }
      )

      if (!error.value) {
        return { data, error, refresh, execute, pending, status: true }
      }

      return { data, error, refresh, execute, pending, status: true }
    } catch (error) {
      console.log(error)
      return { status: false, error }
    }
  }

  return {
    feedback
  }
})
