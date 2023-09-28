import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useApiRequest } from '@/composables/useApiRequest'

import {
  ICategory,
  ICategoryProducts,
  IFilter,
  IProduct
} from './catalog.types'

export const useCatalogStore = defineStore('catalog', () => {
  const catalog = ref<ICategoryProducts[] | []>([])
  const categories = ref<ICategory[] | []>([])

  async function fetchCategories() {
    try {
      const { data, error, refresh, execute, pending } = await useApiRequest(
        `/api/product/category`
      )

      if (Array.isArray(data?.value) && !error.value) {
        categories.value = data.value
      }

      return { data, error, refresh, execute, pending }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { error, data: ref(null) }
    }
  }

  const fetchFilters = async () => {
    try {
      const { data, error, refresh, execute, pending } =
        await useApiRequest<IFilter[]>(`/api/product/filter`)

      if (!error.value) {
        return {
          data,
          error,
          refresh,
          execute,
          pending
        }
      }

      return {
        data: ref(null),
        error,
        refresh,
        execute,
        pending
      }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { data: ref(null), error }
    }
  }

  const fetchCategoryProducts = async ({
    categorySlug,
    subcategorySlug
  }: { categorySlug?: string; subcategorySlug?: string } = {}) => {
    try {
      const url = categorySlug
        ? `/api/product/filter/${categorySlug}${
            subcategorySlug ? `/${subcategorySlug}` : ''
          }`
        : '/api/product/filter'
      const { data, error, refresh, execute, pending } =
        await useApiRequest<ICategoryProducts[]>(url)

      if (!error.value) {
        return {
          data: ref(data.value) || [],
          error,
          refresh,
          execute,
          pending
        }
      }

      return {
        data: ref(null),
        error,
        refresh,
        execute,
        pending
      }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { data: ref(null), error }
    }
  }

  const fetchAllProducts = async () => {
    try {
      const { data, error, refresh, execute, pending } = await useApiRequest<{
        count: number
        next: string
        previous: string
        results: IProduct[]
      }>(`/api/product/items`)

      if (!error.value) {
        return {
          data: ref(data.value?.results) || [],
          error,
          refresh,
          execute,
          pending
        }
      }

      return {
        data: ref(null),
        error,
        refresh,
        execute,
        pending
      }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { data: ref(null), error }
    }
  }

  async function fetchProduct(productSlug: string) {
    try {
      const { data, error, refresh, execute } = await useApiRequest<IProduct>(
        `/api/product/items/${productSlug}`,
        { server: false }
      )

      return { data, error, refresh, execute }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { error, data: ref(null) }
    }
  }

  return {
    catalog,
    categories,

    fetchCategories,
    fetchFilters,
    fetchAllProducts,
    fetchCategoryProducts,
    fetchProduct
  }
})
