/* eslint-disable unicorn/consistent-function-scoping */
import { defineStore } from 'pinia'

import { useAppFetch } from '@/api/shared/network/useAppFetch'

export const useContactsStore = defineStore('contacts', () => {
  async function createFeedback({
    email,
    name,
    phone,
    comment
  }: {
    email: string
    name: string
    phone: string
    comment: string
  }) {
    try {
      await useAppFetch('/form/create')
        .post({
          email,
          phone,
          userName: name,
          ...(comment ? { orderComment: comment } : {})
        })
        .json()

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return {
    createFeedback
  }
})
