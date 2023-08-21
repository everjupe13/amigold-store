import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useHttp } from '@/composables/useHttp'

import { ICatalogProducts, ICategory, IProduct } from './catalog.types'

export const useCatalogStore = defineStore('catalog', () => {
  const catalog = ref<ICatalogProducts[] | null>(null)

  async function fetchCatalog() {
    if (Array.isArray(catalog)) {
      return true
    }

    try {
      const _fetchReturn = await useHttp('/product/all')
      if (_fetchReturn.data?.value) {
        catalog.value = _fetchReturn.data?.value
      }

      return true
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return false
    }
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  async function fetchProduct(productSlug: string) {
    try {
      const _fetchReturn = await useHttp(`/product/${productSlug}`)

      if (_fetchReturn.data?.value) {
        return _fetchReturn.data?.value as IProduct
      }
      return false
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return false
    }
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  async function fetchCategories() {
    try {
      const _fetchReturn = await useHttp(`/product/types`)
      if (_fetchReturn.data?.value) {
        return _fetchReturn.data?.value as ICategory[]
      }
      return false
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return false
    }
  }

  return { catalog, fetchCatalog, fetchProduct, fetchCategories }
})
