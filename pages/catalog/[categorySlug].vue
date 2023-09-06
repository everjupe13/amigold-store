<script lang="ts" setup>
// import { useCatalogController } from '@/composables/useCatalogController'
// TODO сделать один компонент для всего этого который будет с гвардами на пустоту, на загрузку
// также предусмотреть что его можно будет засунуть в свайпер для главной страницы
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

import { type ICategory, useCatalogStore } from '@/store/catalog'

const route = useRoute()
const options = {
  categorySlug: route.params.categorySlug as string,
  withHashUrlState: true
}
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
  () => currentCategory.value?.sub_categories
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

  const DEFAULT_SLUG = subcategories.value[0].slug
  const currentSlug = checkIsSubcatalogSlugValid(slug) ? slug : DEFAULT_SLUG
  currentSubcategorySlug.value = currentSlug

  await setProducts()
}

if (options?.withHashUrlState) {
  const SUBCATEGORY_URL_QUERY = 'subcategory'

  const parseSubcategoryFromUrl = () =>
    (route.query[SUBCATEGORY_URL_QUERY] as string) ?? ''

  const setSubcategorySlugToUrl = (slug: string) => {
    const domainUrl = new URL(window.location.href)
    domainUrl.searchParams.set(SUBCATEGORY_URL_QUERY, slug)

    navigateTo(domainUrl.pathname + domainUrl.search)
  }

  const _subcategorySlugFromUrl = route.query[SUBCATEGORY_URL_QUERY]
    ? parseSubcategoryFromUrl()
    : currentSubcategorySlug.value

  await setCurrentSubcategorySlug(_subcategorySlugFromUrl)

  onMounted(() => {
    nextTick(() => {
      if (!(route.query instanceof Object)) {
        return
      }

      if (!route.query[SUBCATEGORY_URL_QUERY]) {
        setSubcategorySlugToUrl(currentSubcategorySlug.value)
      }
    })
  })

  watch(currentSubcategorySlug, newSlug => {
    setSubcategorySlugToUrl(newSlug)
  })
}

const onSubcatalogChange = async (slug: string) => {
  await setCurrentSubcategorySlug(slug)
}
</script>

<template>
  <section class="py-40">
    <AppContainer>
      <AppBreadcrumbs
        :crumbs="[{ label: 'Корма для животных' }]"
      ></AppBreadcrumbs>
    </AppContainer>
  </section>

  <template v-if="isLoading">
    <div class="flex h-[400px] items-center justify-center">
      <AppSpinner />
    </div>
  </template>

  <template v-else>
    <section class="pb-100">
      <AppContainer>
        <div class="header-grid mb-20 grid grid-cols-3">
          <div class="heading-title md:mb-20">
            <h1 class="title">Каталог</h1>
          </div>

          <div
            class="filters flex items-center justify-center gap-10 md:flex-col md:items-start"
          >
            <template v-if="subcategories.length > 0">
              <button
                v-for="subcategory in subcategories"
                :key="subcategory.id"
                class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16"
                :class="{
                  '!bg-black !text-white':
                    currentSubcategory!.slug === subcategory.slug
                }"
                @click="onSubcatalogChange(subcategory.slug)"
              >
                {{ subcategory.name }}
              </button>
            </template>
          </div>
          <div class="controls self-center justify-self-end"></div>
        </div>
        <template v-if="!isProductsLoading">
          <div
            v-if="products.length > 0"
            class="grid grid-cols-5 gap-x-20 gap-y-60 md:grid-cols-2"
          >
            <AppProductCard
              v-for="product in products"
              :key="product.id"
              v-bind="product"
            ></AppProductCard>
          </div>
          <template v-else>
            <div class="flex h-60 items-center justify-center">
              <p class="py-30 text-center text-bold-24">Пусто</p>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="grid grid-cols-5 gap-x-20 gap-y-60 md:grid-cols-2">
            <AppProductCard></AppProductCard>
            <AppProductCard></AppProductCard>
            <AppProductCard></AppProductCard>
            <AppProductCard></AppProductCard>
            <AppProductCard></AppProductCard>
          </div>
        </template>
      </AppContainer>
    </section>
  </template>
</template>

<style lang="scss" scoped>
.header-grid {
  grid-template-areas: 'a a' 'b c';

  .heading-title {
    @media (max-width: 991.99px) {
      grid-area: 'a';
    }
  }
  .filters {
    @media (max-width: 991.99px) {
      grid-area: b;
    }
  }

  .controls {
    @media (max-width: 991.99px) {
      grid-area: c;
    }
  }
}
</style>
