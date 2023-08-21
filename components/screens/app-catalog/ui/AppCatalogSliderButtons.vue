<script lang="ts" setup>
import { useSwiper } from 'swiper/vue'
import { computed, inject, Ref } from 'vue'

const swiper = useSwiper()
const swiperOptions = inject('swiperOptions') as {
  isSwiperEnd: Ref<boolean | undefined>
  isSwiperBeginning: Ref<boolean | undefined>
}

const isPrevDisabled = computed<true | false>(
  () => !!swiperOptions.isSwiperBeginning.value
)
const isNextDisabled = computed<true | false>(
  () => !!swiperOptions.isSwiperEnd.value
)

const onClickPrev = () => {
  swiper.value.slidePrev()
}

const onClickNext = () => {
  swiper.value.slideNext()
}
</script>

<template>
  <div class="flex items-center gap-x-10">
    <button
      class="flex h-46 w-46 items-center justify-center bg-white transition hover:bg-[#999999] active:bg-[#666666] disabled:bg-[#FFFFFF]/10"
      :disabled="isPrevDisabled"
      @click="onClickPrev"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M8.8571 9.28534L15.9997 16.4279L13.1426 19.285L6 12.1424L8.8571 9.28534Z"
          fill="black"
        />
        <path
          d="M6 12.1424L13.1429 5L16 7.8571L8.8574 14.9992L6 12.1424Z"
          fill="black"
        />
      </svg>
    </button>
    <button
      class="flex h-46 w-46 items-center justify-center bg-white transition hover:bg-[#999999] active:bg-[#666666] disabled:bg-[#FFFFFF]/10"
      :disabled="isNextDisabled"
      @click="onClickNext"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M15.1429 9.28534L8.0003 16.4279L10.8574 19.285L18 12.1424L15.1429 9.28534Z"
          fill="black"
        />
        <path
          d="M18 12.1424L10.8571 5L8 7.8571L15.1426 14.9992L18 12.1424Z"
          fill="black"
        />
      </svg>
    </button>
  </div>
</template>

<style lang=""></style>
