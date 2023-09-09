import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useApiRequest } from '@/composables/useApiRequest'

import { INews } from './blog.types'

export const useBlogStore = defineStore('blog', () => {
  const blog = ref<INews[] | []>([])
  const news = ref<INews | null>(null)

  const fetchBlog = async () => {
    try {
      const { data, error, refresh, execute, pending } =
        await useApiRequest(`/api/data/news`)

      if (Array.isArray(data?.value) && !error.value) {
        blog.value = data.value
      }

      return { data, error, refresh, execute, pending, status: true }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { error, status: false }
    }
  }

  const fetchCertainNews = async (slug: string) => {
    try {
      const { data, error, refresh, execute, pending } = await useApiRequest(
        `/api/data/blog/${slug}`
      )

      if (data?.value && !error.value) {
        news.value = data.value as INews
      }

      return { data, error, refresh, execute, pending, status: true }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { error, status: false }
    }
  }

  return { blog, news, fetchBlog, fetchCertainNews }
})
