<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'

import { IProduct } from 'store/catalog'
import type { Swiper as ISwiper } from 'swiper'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { provide, reactive, type Ref, ref } from 'vue'

import ProductCommentsSliderButtons from './ProductCommentsSliderButtons.vue'
import ProductCommentsSliderCard from './ProductCommentsSliderCard.vue'

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

const swiperPerView = reactive({
  slidesPerView: 1,
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1120: {
      slidesPerView: 3
    }
  }
})

type Props = {
  feedbacks: IProduct['feedbacks']
}
const props = defineProps<Props>()
</script>

<template>
  <swiper
    v-if="props.feedbacks && props.feedbacks.length > 0"
    data-aos="zoom-out"
    data-aos-delay="50"
    data-aos-duration="600"
    class="mb-60"
    :space-between="24"
    :modules="modules"
    v-bind="swiperPerView"
    :slides-per-group="swiperSlidesPerGroup"
    @swiper="onSwiper"
    @slide-change="onSlideChange"
  >
    <template #container-start>
      <div
        class="mb-40 flex flex-nowrap items-center justify-between md:mb-30 md:flex-wrap"
      >
        <h2 class="title relative z-[2]">Что о нас говорят</h2>
        <ProductCommentsSliderButtons />
      </div>
    </template>

    <swiper-slide v-for="item in props.feedbacks" :key="item.id">
      <ProductCommentsSliderCard
        :id="item.id"
        :images="item.images"
        :name="item.name"
        :text="item.text"
      />
    </swiper-slide>
  </swiper>
  <template v-else>
    <h2 class="title relative z-[2] mb-40 md:mb-30">Что о нас говорят</h2>
    <p class="text-center text-[20px] font-medium">Пусто</p>
  </template>
</template>
