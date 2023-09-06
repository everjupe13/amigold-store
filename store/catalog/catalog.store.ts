import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useApiRequest } from '@/composables/useApiRequest'

import { ICatalogProducts, ICategory, IProduct } from './catalog.types'

export const useCatalogStore = defineStore('catalog', () => {
  const catalog = ref<ICatalogProducts[] | []>([])
  const categories = ref<ICategory[] | []>([])

  async function fetchProducts(options?: {
    categorySlug?: string
    subcategorySlug?: string
  }) {
    try {
      const CATALOG_API_URLS = {
        ALL: '/api/product/all',
        BY_SUBCATALOG: `/api/product/by_subcategory/${
          options?.subcategorySlug || ''
        }`,
        ALL_CATALOG_BY_SUBCATALOG: `/api/product/catalog/${
          options?.categorySlug || ''
        }/${options?.subcategorySlug || ''}`
      }

      let url: string = CATALOG_API_URLS.ALL

      if (options?.categorySlug && options?.subcategorySlug) {
        url = CATALOG_API_URLS.ALL_CATALOG_BY_SUBCATALOG
      }

      if (options?.subcategorySlug) {
        url = CATALOG_API_URLS.BY_SUBCATALOG
      }

      // if (options?.categorySlug) {
      //   // TODO dont supported
      //   return { error: ref(true), data: ref<ICatalogProducts[] | []>([]) }
      // }

      const { data, error, refresh, execute } = await useApiRequest<
        ICatalogProducts[]
      >(url, { server: false })

      if (Array.isArray(data?.value) && !error.value) {
        catalog.value = data.value
      }

      return {
        error,
        refresh,
        execute,
        data: data as Ref<ICatalogProducts[] | []>
      }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { error, data: ref<ICatalogProducts[] | []>([]) }
    }
  }

  async function fetchProduct(productSlug: string) {
    try {
      const { data, error, refresh, execute } = await useApiRequest<IProduct>(
        `/api/product/${productSlug}`,
        { server: false }
      )

      return { data, error, refresh, execute }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { error, data: ref(null) }
    }
  }

  async function fetchCategories() {
    try {
      const { data, error, refresh, execute, pending } = await useApiRequest(
        `/api/product/categories`
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

  async function fetchCategoryProduct(
    catalogSlug: string,
    subcatalogSlug: string
  ) {
    if (!catalogSlug || !subcatalogSlug) {
      return { error: ref(true), data: ref([]) }
    }

    try {
      const { data, error, refresh, execute, pending } = await useApiRequest(
        `/api/product/catalog/${catalogSlug}/${subcatalogSlug}`
      )

      return { data, error, refresh, execute, pending }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { error, data: ref([]) }
    }
  }

  return {
    catalog,
    categories,
    fetchProducts,
    fetchProduct,
    fetchCategories,
    fetchCategoryProduct
  }
})
