<script lang="ts" setup>
// import type { FiltersInterface } from 'store/catalog/catalog.types'
import { computed, ref } from 'vue'

// import CatalogSorting from '@/components/screens/app-catalog/ui/CatalogSorting.vue'
import { useCartStore } from '@/store/cart'
import {
  type ICategoryProducts,
  type IFilter,
  useCatalogStore
} from '@/store/catalog'
// import { SortList } from '@/store/catalog/catalog.constants'

const route = useRoute()
const currentCategorySlug = Array.isArray(route.params.categorySlug)
  ? route.params.categorySlug[0]
  : route.params.categorySlug

const isLoading = ref(false)
const isMainCategoryFetching = ref(true)

const catalogStore = useCatalogStore()
await catalogStore.fetchCategories()

isMainCategoryFetching.value = false

const currentMainCategory = computed(() =>
  catalogStore.categories.find(
    category => category.slug === currentCategorySlug
  )
)

isLoading.value = true
const { data: apiFilters } = await catalogStore.fetchFilters()
const subcategories: Ref<IFilter[]> = computed(() => apiFilters.value || [])
const currentSubcategorySlug = ref(subcategories.value[0].slug)
const currentSubcategory = computed(() =>
  subcategories.value.find(
    subcategory => subcategory.slug === currentSubcategorySlug.value
  )
)

const { data: apiProducts } = await catalogStore.fetchCategoryProducts({
  categorySlug: currentCategorySlug,
  subcategorySlug: currentSubcategorySlug.value
})
isLoading.value = false

const isProductsLoading = ref(false)
const products: Ref<ICategoryProducts[]> = ref(
  apiProducts.value?.length && apiProducts.value?.length > 0
    ? apiProducts.value
    : []
)

const onSubcategoryChange = async (slug: string) => {
  currentSubcategorySlug.value = slug
  isProductsLoading.value = true

  const { data: apiProducts } = await catalogStore.fetchCategoryProducts({
    categorySlug: currentCategorySlug,
    subcategorySlug: currentSubcategorySlug.value
  })

  products.value =
    apiProducts.value?.length && apiProducts.value?.length > 0
      ? apiProducts.value
      : []

  isProductsLoading.value = false
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

// const refApiProducts = ref(apiProducts.value)
// const activeSortingId = ref(1)
// const handleSortingChange = async (id: number) => {
//   activeSortingId.value = id
//   const searchKey = SortList.find(item => item.id === id)?.sortKey || ''

//   isLoading.value = true
//   const { data: apiProducts } = await catalogStore.fetchAllProducts({
//     filters: searchKey as FiltersInterface
//   })

//   refApiProducts.value = apiProducts.value

//   isLoading.value = false
// }
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
            <template v-if="subcategories.length > 0">
              <button
                v-for="subcategory in subcategories"
                :key="subcategory.id"
                class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16"
                :class="{
                  '!bg-black !text-white':
                    currentSubcategory!.slug === subcategory.slug
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
            <!-- <CatalogSorting
              :items="SortList"
              :active-item-id="activeSortingId"
              @handle-change="handleSortingChange"
            /> -->
          </div>
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
              :name="product.name"
              :vendor-code="product.vendorCode"
              :slug="product.slug"
              :prices="product.prices"
              :image="product.image"
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
