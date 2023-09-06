import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

import { type ICategory, useCatalogStore } from '@/store/catalog'

export const useCatalogController = async (options?: {
  categorySlug?: string
  withHashUrlState?: boolean
}) => {
  const isCategoryPart = computed(() => !!options?.categorySlug)

  const isLoading = ref(false)
  const catalogStore = useCatalogStore()

  isLoading.value = true
  await catalogStore.fetchCategories()
  isLoading.value = false

  const { categories }: { categories: Ref<ICategory[]> } =
    storeToRefs(catalogStore)
  const currentCategory: Ref<ICategory> = computed(
    () =>
      (isCategoryPart.value &&
        categories.value.find(
          category => category.slug === options?.categorySlug
        )) ||
      categories.value[0]
  )
  const subcategories: Ref<ICategory['sub_categories']> = computed(
    () => currentCategory.value.sub_categories
  )
  const currentSubcategorySlug = ref(subcategories.value[0].slug)
  const currentSubcategory = computed(() =>
    subcategories.value.find(
      subcategory => subcategory.slug === currentSubcategorySlug.value
    )
  )

  await catalogStore.fetchProducts({
    ...(isCategoryPart.value ? { categorySlug: options!.categorySlug } : {}),
    subcategorySlug: currentSubcategorySlug.value
  })

  const isProductsLoading = ref(false)
  const products = computed(() => catalogStore.catalog)

  const setProducts = async () => {
    isProductsLoading.value = true
    await catalogStore.fetchProducts({
      ...(isCategoryPart.value ? { categorySlug: options!.categorySlug } : {}),
      subcategorySlug: currentSubcategorySlug.value
    })

    isProductsLoading.value = false
  }

  const setCurrentSubcategorySlug = async (slug: string) => {
    if (!subcategories.value?.length) {
      return
    }

    const checkIsSubcatalogSlugValid = (slug: string) =>
      slug && subcategories.value.some(subcategory => subcategory.slug === slug)

    console.log(
      subcategories.value.some(subcategory => subcategory.slug === slug)
    )
    const DEFAULT_SLUG = subcategories.value[0].slug
    const currentSlug = checkIsSubcatalogSlugValid(slug) ? slug : DEFAULT_SLUG
    currentSubcategorySlug.value = currentSlug

    await setProducts()
  }

  if (options?.withHashUrlState) {
    const route = useRoute()
    const SUBCATEGORY_URL_QUERY = 'subcategory'

    const parseSubcategoryFromUrl = () =>
      (route.query[SUBCATEGORY_URL_QUERY] as string) ?? ''

    const setSubcategorySlugToUrl = (slug: string) => {
      const domainUrl = new URL(window.location.href)
      domainUrl.searchParams.set(SUBCATEGORY_URL_QUERY, slug)

      window.history.pushState({}, '', domainUrl.pathname + domainUrl.search)
    }

    onMounted(() => {
      nextTick(async () => {
        if (!(route.query instanceof Object)) {
          return
        }

        if (route.query[SUBCATEGORY_URL_QUERY]) {
          const _subcategorySlugFromUrl = parseSubcategoryFromUrl()

          if (_subcategorySlugFromUrl) {
            await setCurrentSubcategorySlug(_subcategorySlugFromUrl)
          }
        }
      })
    })

    watch(currentSubcategorySlug, newSlug => {
      setSubcategorySlugToUrl(newSlug)
    })
  }

  return {
    isLoading,
    products,
    isProductsLoading,
    categories,
    subcategories,
    currentSubcategorySlug,
    currentSubcategory,
    setCurrentSubcategorySlug
  }
}
