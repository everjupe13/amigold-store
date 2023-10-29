import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useApiRequest } from '@/composables/useApiRequest'

import {
  FiltersInterface,
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

  const fetchAllProducts = async ({
    page,
    filters,
    categorySlug
  }: {
    filters?: FiltersInterface
    categorySlug?: string
    page?: number
  } = {}) => {
    try {
      const { data, error } = await useApiRequest<{
        count: number
        next: string
        previous: string
        results: IProduct[]
      }>(`/api/product/items${filters ? `?ordering=${filters}` : ''}`, {
        params: {
          page: page || 1,
          page_size: 50,
          ...(filters ? { ordering: filters } : {}),
          ...(categorySlug ? { category__slug: categorySlug } : {})
        }
      })

      if (!error.value) {
        return {
          data: ref((data.value?.results as IProduct[]) || []),
          count: data.value?.count || 0,
          error
        }
      }

      return {
        data: ref([]),
        count: 0,
        error
      }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { data: ref([]), count: 0, error }
    }
  }

  async function fetchProduct(productId: string | number) {
    try {
      const { data, error, refresh, execute } = await useApiRequest<IProduct>(
        `/api/product/items/${productId}`,
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
