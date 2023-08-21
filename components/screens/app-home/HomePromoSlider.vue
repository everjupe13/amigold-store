<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'

import type { Swiper as ISwiper } from 'swiper'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

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
const swiperSlidesPerView = ref(1)
const swiperSlidesPerGroup = ref(1)
</script>

<template>
  <div class="wrapper">
    <swiper
      :style="{
        '--swiper-navigation-color': '#969EAB',
        '--swiper-pagination-color': '#969EAB'
      }"
      :space-between="20"
      :navigation="true"
      :slides-per-view="swiperSlidesPerView"
      :slides-per-group="swiperSlidesPerGroup"
      :modules="modules"
      class="w-full rounded-[24px]"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <template #container-end>
        <div
          class="absolute bottom-80 left-0 z-[4] flex items-center gap-x-20 md:flex-col-reverse md:items-start md:gap-20"
        >
          <slot name="controls"></slot>
          <HomeSliderButtons />
        </div>
      </template>
      <swiper-slide>
        <HomoPromoSliderCard>
          <template #title>
            <span class="text-yellow">Бесплатная консультация</span>
            <br />
            ветеринарного врача
          </template>
          <template #text>
            Lorem ipsum dolor sit amet consectetur. Massa lectus massa malesuada
            vulputate praesent cursus feugiat.
          </template>
          <template #image>
            <img src="~/assets/img/home-page/slider/1.png" alt="" />
          </template>
        </HomoPromoSliderCard>
      </swiper-slide>
      <swiper-slide>
        <HomoPromoSliderCard>
          <template #title>
            <span class="text-yellow">Консультация врача</span>
          </template>
          <template #text>
            Lorem ipsum dolor sit amet consectetur. Massa lectus massa malesuada
            vulputate praesent cursus feugiat.
          </template>
          <template #image>
            <img src="~/assets/img/home-page/slider/1.png" alt="" />
          </template>
        </HomoPromoSliderCard>
      </swiper-slide>
      <swiper-slide>
        <HomoPromoSliderCard>
          <template #title>
            <span class="text-yellow">Консультация</span>
            <br />
            ветеринарного врача
          </template>
          <template #text>
            Lorem ipsum dolor sit amet consectetur. Massa lectus massa malesuada
            vulputate praesent cursus feugiat.
          </template>
          <template #image>
            <img src="~/assets/img/home-page/slider/1.png" alt="" />
          </template>
        </HomoPromoSliderCard>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './HomePromoSlider.scss';
</style>
