<script lang="ts" setup>
// import { useCatalogController } from '@/composables/useCatalogController'
import { FiltersInterface } from 'store/catalog/catalog.types'
import { computed, ref } from 'vue'

import CatalogSorting from '@/components/screens/app-catalog/ui/CatalogSorting.vue'
import { useCartStore } from '@/store/cart'
import { SortList } from '@/store/catalog/catalog.constants'
import {
  type IFilter,
  type IProduct,
  useCatalogStore
} from '@/store/catalog/index'

const isLoading = ref(false)
const catalogStore = useCatalogStore()

isLoading.value = true
const { data: apiFilters } = await catalogStore.fetchFilters()
const { data: apiProducts } = await catalogStore.fetchAllProducts()
isLoading.value = false

const refApiProducts = ref(apiProducts.value)

const subcategories: Ref<IFilter[]> = computed(() => apiFilters.value || [])
const currentSubcategorySlug = ref(subcategories.value[0].slug)
const currentSubcategory = computed(() =>
  subcategories.value.find(
    subcategory => subcategory.slug === currentSubcategorySlug.value
  )
)

const onSubcategoryChange = (slug: string) => {
  currentSubcategorySlug.value = slug
}

const isProductsLoading = ref(false)
const products: Ref<IProduct[]> = computed(() =>
  refApiProducts.value?.length && refApiProducts.value?.length > 0
    ? refApiProducts.value?.filter(product =>
        product.filters.some(
          productFilter => productFilter.slug === currentSubcategorySlug.value
        )
      )
    : []
)

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
  const { data: apiProducts } = await catalogStore.fetchAllProducts({
    filters: searchKey as FiltersInterface
  })

  refApiProducts.value = apiProducts.value

  isLoading.value = false
}
</script>

<template>
  <section class="py-40">
    <AppContainer>
      <AppBreadcrumbs :crumbs="[{ label: 'Каталог' }]"></AppBreadcrumbs>
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
        <div
          class="header-grid mb-20 grid grid-cols-3 md:grid-cols-2 md:gap-y-10"
        >
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
                class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16 active:translate-y-2"
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
            <CatalogSorting
              :items="SortList"
              :active-item-id="activeSortingId"
              @handle-change="handleSortingChange"
            />
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
              :product-id="product.id"
              :name="product.name"
              :vendor-code="product.vendorCode"
              :slug="product.slug"
              :prices="product.prices"
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
      </AppContainer>
    </section>
  </template>
</template>

<style lang="scss" scoped>
.header-grid {
  grid-template-areas: 'a a' 'b b' 'c c';

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
