<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'

import type { Swiper as ISwiper } from 'swiper'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import type { TopBanner } from '@/store/home/useTopBanners'

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

type Props = {
  banners: TopBanner[] | null
}
const props = withDefaults(defineProps<Props>(), {
  banners: () => []
})
</script>

<template>
  <div class="wrapper">
    <swiper
      v-if="
        props.banners &&
        Array.isArray(props.banners) &&
        props.banners.length > 0
      "
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
          class="absolute bottom-82 left-[250px] z-[4] flex items-center gap-x-20 md:bottom-[150px] md:left-0 md:flex-col-reverse md:items-start md:gap-20"
        >
          <HomeSliderButtons v-if="props.banners.length > 0" />
        </div>
      </template>
      <swiper-slide v-for="banner in props.banners" :key="banner.id">
        <HomoPromoSliderCard
          :is-linked="banner.isButtonActionHyperlink"
          :link="banner.url"
        >
          <template #title>
            <span class="text-yellow">{{ banner.accentTitleText }}</span>
            <br />
            {{ banner.secondaryTitleText }}
          </template>
          <template #text>
            {{ banner.description }}
          </template>
          <template #buttonLabel>
            {{ banner.buttonLabel }}
          </template>
          <template #image>
            <img :src="banner.image" alt="" />
          </template>
        </HomoPromoSliderCard>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './HomePromoSlider.scss';
</style>
