<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'

// import { useCatalogController } from '@/composables/useCatalogController'
// import { storeToRefs } from 'pinia'
import type { Swiper as ISwiper } from 'swiper'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, ref } from 'vue'

import { useCartStore } from '@/store/cart'
import {
  type IFilter,
  type IProduct,
  useCatalogStore
} from '@/store/catalog/index'

const modules = [FreeMode]

const isSwiperEnd = ref(false)
const isSwiperBeginning = ref(true)

provide('swiperOptions', {
  isSwiperEnd,
  isSwiperBeginning
})

const onSlideChange = (swiper: typeof ISwiper) => {
  isSwiperEnd.value = swiper.isEnd
  isSwiperBeginning.value = swiper.isBeginning
  swiperActiveIndex.value = swiper.activeIndex
}
const onSwiper = (swiper: typeof ISwiper) => {
  swiperRef.value = swiper
}

const swiperRef: Ref<typeof ISwiper | null> = ref(null)
const swiperActiveIndex = ref(0)
const swiperSlidesPerGroup = ref(1)

// const options = {
//   categorySlug: '',
//   withHashUrlState: true
// }

const isLoading = ref(false)
const catalogStore = useCatalogStore()

isLoading.value = true
const { data: apiFilters } = await catalogStore.fetchFilters()
const { data: apiProducts } = await catalogStore.fetchAllProducts()
isLoading.value = false

const subcategories: Ref<IFilter[]> = computed(() => apiFilters.value || [])
const currentSubcategorySlug = ref(subcategories.value?.[0]?.slug || '')
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
  apiProducts.value?.length && apiProducts.value?.length > 0
    ? apiProducts.value?.filter(product =>
        product.filters.some(
          productFilter => productFilter.slug === currentSubcategorySlug.value
        )
      )
    : []
)

// const setProducts = async () => {
//   isProductsLoading.value = true

//   isProductsLoading.value = false
// }

// const setCurrentSubcategorySlug = async (slug: string) => {
//   if (!subcategories.value?.length) {
//     return
//   }

//   const checkIsSubcatalogSlugValid = (slug: string) =>
//     slug && subcategories.value.some(subcategory => subcategory.slug === slug)

//   const DEFAULT_SLUG = subcategories.value[0].slug
//   const currentSlug = checkIsSubcatalogSlugValid(slug) ? slug : DEFAULT_SLUG
//   currentSubcategorySlug.value = currentSlug

//   await setProducts()
// }

// if (options?.withHashUrlState) {
//   const route = useRoute()
//   const SUBCATEGORY_URL_QUERY = 'subcategory'

//   const parseSubcategoryFromUrl = () =>
//     (route.query[SUBCATEGORY_URL_QUERY] as string) ?? ''

//   const setSubcategorySlugToUrl = (slug: string) => {
//     const domainUrl = new URL(window.location.href)
//     domainUrl.searchParams.set(SUBCATEGORY_URL_QUERY, slug)

//     navigateTo(domainUrl.pathname + domainUrl.search)
//   }

//   const _subcategorySlugFromUrl = route.query[SUBCATEGORY_URL_QUERY]
//     ? parseSubcategoryFromUrl()
//     : currentSubcategorySlug.value

//   await setCurrentSubcategorySlug(_subcategorySlugFromUrl)

//   onMounted(() => {
//     nextTick(() => {
//       if (!(route.query instanceof Object)) {
//         return
//       }

//       if (!route.query[SUBCATEGORY_URL_QUERY]) {
//         setSubcategorySlugToUrl(currentSubcategorySlug.value)
//       }
//     })
//   })

//   watch(currentSubcategorySlug, newSlug => {
//     setSubcategorySlugToUrl(newSlug)
//   })
// }

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
</script>

<template>
  <div class="wrapper">
    <swiper
      v-if="!isLoading && !isProductsLoading"
      :style="{
        '--swiper-navigation-color': '#969EAB',
        '--swiper-pagination-color': '#969EAB'
      }"
      :space-between="20"
      :navigation="true"
      :slides-per-view="'auto'"
      :slides-per-group="swiperSlidesPerGroup"
      :modules="modules"
      class="w-full"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <template #container-start>
        <div
          class="header-grid relative z-[2] mb-40 grid grid-cols-3 md:flex md:flex-wrap md:items-center md:justify-between"
        >
          <div class="heading-title">
            <slot name="title"></slot>
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
            class="controls self-center justify-self-end md:self-stretch md:justify-self-auto"
          >
            <div
              class="flex items-center gap-x-20 md:h-full md:flex-col-reverse md:justify-between md:gap-y-10"
            >
              <NuxtLink
                class="flex rounded-full border-2 border-gray bg-gray px-20 py-16 font-inter leading-none text-bold-16"
                to="/novinki"
              >
                Показать все
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
      <swiper-slide
        v-for="product in products"
        :key="product.id"
        class="max-w-[calc((100%-20px*4)/5)] md:max-w-full"
      >
        <AppProductCard
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
            cartLoadingProductId === product.id ? isCartStoreFinish : undefined
          "
          @add-product="onAddProductToCart(product.id, product.prices[0].id)"
        ></AppProductCard>
      </swiper-slide>
    </swiper>
    <div v-else>
      <div
        class="header-grid relative z-[2] mb-40 grid grid-cols-3 md:grid-cols-[1fr_auto]"
      >
        <div class="heading-title md:mb-20">
          <slot name="title"></slot>
        </div>
        <div
          class="filters flex items-center justify-center gap-10 md:flex-col md:items-start md:justify-normal"
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
          class="controls self-center justify-self-end md:self-stretch md:justify-self-auto"
        >
          <div
            class="flex items-center gap-x-20 md:h-full md:flex-col-reverse md:justify-between md:gap-y-10"
          >
            <NuxtLink
              class="flex rounded-full border-2 border-gray bg-gray px-20 py-16 font-inter leading-none text-bold-16"
              to="/catalog"
            >
              Показать все
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-5 gap-x-20 gap-y-60 md:grid-cols-2">
        <HomeCatalogSliderCard></HomeCatalogSliderCard>
        <HomeCatalogSliderCard></HomeCatalogSliderCard>
        <HomeCatalogSliderCard></HomeCatalogSliderCard>
        <HomeCatalogSliderCard></HomeCatalogSliderCard>
        <HomeCatalogSliderCard></HomeCatalogSliderCard>
      </div>
    </div>
  </div>
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
