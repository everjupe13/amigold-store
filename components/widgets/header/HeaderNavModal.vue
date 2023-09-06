<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'

import IconBurgerOpened from '@/assets/img/burger-icon-opened.svg'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const onNavProceed = (path: string) => {
  emit('confirm')
  navigateTo(path)
}
</script>

<template>
  <VueFinalModal
    class="flex flex-col items-center justify-center"
    content-class="px-40 py-50 bg-white rounded-[0x] w-full h-[100vh] w-[100vw] flex flex-col"
  >
    <div class="relative flex flex-grow flex-col items-center">
      <div class="absolute right-0 top-0 flex items-center justify-center p-10">
        <img
          :src="IconBurgerOpened"
          alt=""
          class="h-30 w-30"
          @click="emit('confirm')"
        />
      </div>
      <nav class="pt-60">
        <ul class="flex flex-col items-center gap-x-20 leading-none text-black">
          <li class="px-3 py-5 text-bold-18 md:mb-20 md:text-bold-22">
            <button @click="onNavProceed('/')">Главная</button>
          </li>
          <li class="px-3 py-5 text-bold-18 md:mb-20 md:text-bold-22">
            <button @click="onNavProceed('/catalog')">Каталог</button>
          </li>
          <li class="px-3 py-5 text-bold-18 md:mb-20 md:text-bold-22">
            <button @click="onNavProceed('/')">Новинки</button>
          </li>
          <li class="px-3 py-5 text-bold-18 md:mb-20 md:text-bold-22">
            <button @click="onNavProceed('/cart')">Корзина</button>
          </li>
        </ul>
      </nav>
      <div class="mt-auto">
        <a
          href="tel:+79915955199"
          class="flex flex-shrink-0 flex-grow-0 items-center leading-none text-black text-extrabold-20 group-[.expanded]:hidden md:flex-col md:text-black md:text-extrabold-24"
        >
          +7 991 595-51-99
        </a>
      </div>
    </div>
  </VueFinalModal>
</template>
