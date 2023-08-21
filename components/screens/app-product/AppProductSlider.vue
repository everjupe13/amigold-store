<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

import { type Swiper as SwiperType } from 'swiper'
import { FreeMode, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, inject, ref } from 'vue'

import { IProduct } from '@/store/catalog'

type ISwiper = typeof SwiperType
type IProductSlider = {
  gallery: IProduct['gallery']
}
const props = withDefaults(defineProps<IProductSlider>(), {
  gallery: () => []
})
const isLgScreen = inject('isLgScreen')

const thumbsSwiper = ref<ISwiper | null>(null)
const setThumbsSwiper = (swiper: ISwiper) => {
  thumbsSwiper.value = swiper
}
const modules = [FreeMode, Thumbs]

const computedGallery = computed(() =>
  [...props.gallery].sort(imageObject => (imageObject.is_main ? 0 : 1))
)
</script>

<template>
  <div class="wrapper">
    <swiper
      :style="{
        '--swiper-navigation-color': '#969EAB',
        '--swiper-pagination-color': '#969EAB'
      }"
      :space-between="40"
      :slides-per-view="1"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      :class="[{ 'animate-pulse': computedGallery.length === 0 }]"
      class="main-gallery aspect-square w-full"
    >
      <swiper-slide
        v-for="(imageObject, index) in computedGallery"
        :key="index"
      >
        <div class="main-gallery__item">
          <img
            :src="imageObject.image"
            :alt="`product ${index + 1}`"
            class="block max-h-full max-w-full select-none object-fill"
          />
        </div>
      </swiper-slide>
    </swiper>

    <swiper
      v-if="isLgScreen"
      :space-between="12"
      :slides-per-view="4"
      :free-mode="true"
      :watch-slides-progress="true"
      :modules="modules"
      :direction="'vertical'"
      class="thumb-gallery"
      @swiper="setThumbsSwiper"
    >
      <swiper-slide
        v-for="(imageObject, index) in computedGallery"
        :key="index"
      >
        <div class="thumb-gallery__item">
          <img
            :src="imageObject.image"
            :alt="`product ${index + 1}`"
            class="block max-h-full max-w-full select-none object-fill"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  @apply grid h-[480px] grid-cols-[480px_calc(100%-480px-12px)] gap-x-12 md:h-auto md:grid-cols-1;
}

.main-gallery {
  @apply aspect-square overflow-hidden rounded-[24px] bg-gray;

  &__item {
    @apply flex h-full items-center justify-center;
  }
}

.thumb-gallery {
  @apply max-h-[480px];

  &__item {
    @apply flex aspect-square h-[calc((480px-(12px*3))_/_4)] items-center justify-center overflow-hidden rounded-[14px] bg-gray p-10;
  }

  .swiper-slide {
    @apply opacity-40 transition;
  }
  .swiper-slide-thumb-active {
    @apply opacity-100;
  }
}
</style>
