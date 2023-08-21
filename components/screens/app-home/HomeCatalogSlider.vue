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
// const swiperSlidesPerView = ref(5)
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
            <AppButton
              theme="default"
              outlined
              class="flex items-center justify-center whitespace-nowrap rounded-[100px] px-20 py-16 leading-none text-white transition text-bold-16"
            >
              Собакам
            </AppButton>
            <button
              class="flex items-center justify-center whitespace-nowrap rounded-[100px] border-2 border-gray bg-button px-20 py-16 leading-none transition text-bold-16"
            >
              Кошкам
            </button>
            <button
              class="flex items-center justify-center whitespace-nowrap rounded-[100px] border-2 border-gray bg-button px-20 py-16 leading-none transition text-bold-16"
            >
              Попугаем
            </button>
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
      <swiper-slide class="max-w-[calc((100%-20px*4)/5)] md:max-w-full">
        <SliderCard></SliderCard>
      </swiper-slide>
      <swiper-slide class="max-w-[calc((100%-20px*4)/5)] md:max-w-full">
        <SliderCard></SliderCard>
      </swiper-slide>
      <swiper-slide class="max-w-[calc((100%-20px*4)/5)] md:max-w-full">
        <SliderCard></SliderCard>
      </swiper-slide>
      <swiper-slide class="max-w-[calc((100%-20px*4)/5)] md:max-w-full">
        <SliderCard></SliderCard>
      </swiper-slide>
      <swiper-slide class="max-w-[calc((100%-20px*4)/5)] md:max-w-full">
        <SliderCard></SliderCard>
      </swiper-slide>
      <swiper-slide class="max-w-[calc((100%-20px*4)/5)] md:max-w-full">
        <SliderCard></SliderCard>
      </swiper-slide>
      <swiper-slide class="max-w-[calc((100%-20px*4)/5)] md:max-w-full">
        <SliderCard></SliderCard>
      </swiper-slide>
    </swiper>
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
