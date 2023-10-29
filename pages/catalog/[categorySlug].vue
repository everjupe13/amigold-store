<script lang="ts" setup>
import type { FiltersInterface } from 'store/catalog/catalog.types'
import { computed, onMounted, ref } from 'vue'

import CatalogSorting from '@/components/screens/app-catalog/ui/CatalogSorting.vue'
import { useCartStore } from '@/store/cart'
import { SortList } from '@/store/catalog/catalog.constants'
import {
  type IFilter,
  type IProduct,
  useCatalogStore
} from '@/store/catalog/index'

const route = useRoute()
const currentCategorySlug = Array.isArray(route.params.categorySlug)
  ? route.params.categorySlug[0]
  : route.params.categorySlug

const isLoading = ref(true)
const isMainCategoryFetching = ref(true)
const catalogStore = useCatalogStore()
const refApiProducts = ref<IProduct[]>([])

await catalogStore.fetchCategories()
isMainCategoryFetching.value = false

const currentMainCategory = computed(() =>
  catalogStore.categories.find(
    category => category.slug === currentCategorySlug
  )
)
const { data: apiFilters } = await catalogStore.fetchFilters()

onMounted(async () => {
  const { data: apiProducts, count } = await catalogStore.fetchAllProducts({
    categorySlug: currentCategorySlug
  })
  refApiProducts.value = apiProducts.value

  if (count) {
    const pageSize = 50
    const pages = Math.ceil(Number(count) / pageSize)

    for (let i = 2; i <= pages; i++) {
      const { data: apiProducts } = await catalogStore.fetchAllProducts({
        page: i,
        categorySlug: currentCategorySlug
      })

      if (apiProducts.value?.length && apiProducts.value?.length > 0) {
        refApiProducts.value?.push?.(...apiProducts.value)
        console.log(refApiProducts.value)
      }
    }
  }

  isLoading.value = false
  isMainCategoryFetching.value = false
})

const subcategories: Ref<IFilter[]> = computed(() => apiFilters.value || [])
const currentSubcategorySlug = ref('all')

const isProductsLoading = ref(false)
const products: Ref<IProduct[]> = computed(() =>
  refApiProducts.value?.length && refApiProducts.value?.length > 0
    ? currentSubcategorySlug.value === 'all'
      ? refApiProducts.value.filter(product => product.isActive)
      : refApiProducts.value?.filter(
          product =>
            product.filters.some(
              productFilter =>
                productFilter.slug === currentSubcategorySlug.value
            ) && product.isActive
        )
    : []
)

const onSubcategoryChange = (slug: string) => {
  currentSubcategorySlug.value = slug
}

const cartStore = useCartStore()
const cartLoadingProductId = ref()
const isCartStoreFetching = ref(false)
const isCartStoreFinish = ref(true)
const onAddProductToCart = async (id: number, priceId: number) => {
  cartLoadingProductId.value = id
  isCartStoreFetching.value = true
  isCartStoreFinish.value = false

  try {
    await cartStore.addItem(id, priceId)
  } finally {
    isCartStoreFetching.value = false
    setTimeout(() => {
      isCartStoreFinish.value = true
      cartLoadingProductId.value = undefined
    }, 1000)
  }
}

const activeSortingId = ref(1)
const handleSortingChange = async (id: number) => {
  activeSortingId.value = id
  const searchKey = SortList.find(item => item.id === id)?.sortKey || ''

  isLoading.value = true
  const { data: apiProducts, count } = await catalogStore.fetchAllProducts({
    categorySlug: currentCategorySlug,
    filters: searchKey as FiltersInterface
  })
  refApiProducts.value = apiProducts.value

  if (count) {
    const pageSize = 50
    const pages = Math.ceil(Number(count) / pageSize)

    for (let i = 2; i <= pages; i++) {
      const { data: apiProducts } = await catalogStore.fetchAllProducts({
        page: i,
        categorySlug: currentCategorySlug,
        filters: searchKey as FiltersInterface
      })

      if (apiProducts.value?.length && apiProducts.value?.length > 0) {
        refApiProducts.value?.push?.(...apiProducts.value)
      }
    }
  }

  refApiProducts.value = apiProducts.value
  isLoading.value = false
}
</script>

<template>
  <section class="py-40">
    <AppContainer>
      <AppBreadcrumbs
        :crumbs="[
          {
            label: isMainCategoryFetching
              ? 'Каталог'
              : currentMainCategory?.name || 'Каталог'
          }
        ]"
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
            <button
              class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16 active:translate-y-2"
              :class="{
                '!bg-black !text-white': currentSubcategorySlug === 'all'
              }"
              @click="onSubcategoryChange('all')"
            >
              Все товары
            </button>
            <template v-if="subcategories.length > 0">
              <button
                v-for="subcategory in subcategories"
                :key="subcategory.id"
                class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16"
                :class="{
                  '!bg-black !text-white':
                    currentSubcategorySlug === subcategory.slug
                }"
                @click="onSubcategoryChange(subcategory.slug)"
              >
                {{ subcategory.name }}
              </button>
            </template>
          </div>
          <div
            class="controls relative z-[5] self-center justify-self-end md:justify-self-start"
          >
            <CatalogSorting
              :items="SortList"
              :active-item-id="activeSortingId"
              @handle-change="handleSortingChange"
            />
          </div>
        </div>
        <div class="mb-60 md:mb-30">
          <template v-if="!isProductsLoading">
            <div
              v-if="products.length > 0"
              class="grid grid-cols-5 gap-x-20 gap-y-60 md:grid-cols-2"
            >
              <AppProductCard
                v-for="product in products"
                :key="product.id"
                :product-id="product.id"
                :name="product.name"
                :vendor-code="product.vendorCode"
                :slug="product.slug"
                :prices="product.prices"
                :is-new="product.isNew"
                :is-discount="product.isDiscount"
                :image="
                  product.gallery.find(galleryItem => galleryItem.is_main)
                    ?.imageThumb || ''
                "
                :is-loading="
                  cartLoadingProductId === product.id
                    ? isCartStoreFetching
                    : undefined
                "
                :is-finished="
                  cartLoadingProductId === product.id
                    ? isCartStoreFinish
                    : undefined
                "
                @add-product="
                  onAddProductToCart(product.id, product.prices[0].id)
                "
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
        </div>
        <div v-if="products.length > 0" class="flex justify-end">
          <span
            class="flex flex-grow-0 cursor-default items-center justify-center whitespace-nowrap rounded-full bg-button px-20 py-16 leading-none transition-all text-bold-16"
          >
            {{ `Показано: ${products.length}` }}
          </span>
        </div>
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
