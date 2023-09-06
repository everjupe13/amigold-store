<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'

// import { useCatalogController } from '@/composables/useCatalogController'
import { storeToRefs } from 'pinia'
import type { Swiper as ISwiper } from 'swiper'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, ref, watch } from 'vue'

import { type ICategory, useCatalogStore } from '@/store/catalog'

const modules = [FreeMode]

// TODO сделать фильтрацию по сабкаталогам, скелетон лоадер

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

const options = {
  categorySlug: '',
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
  const route = useRoute()
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
                @click="onSubcatalogChange(subcategory.slug)"
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
              <HomeSliderButtons />
              <NuxtLink
                class="flex rounded-full border-2 border-gray bg-gray px-20 py-16 font-inter leading-none text-bold-16"
                to="/catalog"
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
        <AppProductCard v-bind="product"></AppProductCard>
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
              @click="onSubcatalogChange(subcategory.slug)"
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
