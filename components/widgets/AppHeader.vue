<script lang="ts" setup>
import { debounce } from 'lodash-es'

import IconBurger from '@/assets/img/burger-icon.svg'
import IconBurgerOpened from '@/assets/img/burger-icon-opened.svg'
import AppLogo from '@/components/shared/AppLogo.vue'

const isLgScreen: boolean | undefined = inject('isLgScreen', true)

const isModalOpened = ref(false)
const openModal = () => {
  const modal = document.querySelector('.app-modal') as HTMLElement
  const body = document.querySelector('body') as HTMLElement
  const html = document.querySelector('html') as HTMLElement

  if (modal.style.display === 'flex') {
    modal.style.display = 'none'
    body.style.removeProperty('overflow')
    html.style.removeProperty('overflow')
    isModalOpened.value = false
  } else {
    modal.style.display = 'flex'
    body.style.setProperty('overflow', 'hidden')
    html.style.setProperty('overflow', 'hidden')
    isModalOpened.value = true
  }
}

const searchModel = ref('')
const handleSearchInput = debounce(e => {
  searchModel.value = e.target.value
  console.log(e.target.value)
}, 500)
</script>

<template>
  <header id="header" class="group flex flex-col justify-center">
    <div class="bg-gray py-13 md:hidden">
      <AppContainer>
        <nav class="flex items-center justify-between">
          <ul class="flex items-center gap-x-20">
            <li>
              <NuxtLink to="/" class="tracking-[-0.36px]">Новости</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="tracking-[-0.36px]">Отзывы</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="tracking-[-0.36px]">Где помыть</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="tracking-[-0.36px]">Статьи</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="tracking-[-0.36px]">Партнерам</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="tracking-[-0.36px]">
                Доставка и оплата
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="tracking-[-0.36px]">Видеоуроки</NuxtLink>
            </li>
          </ul>
          <ul class="flex items-center gap-x-10">
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener norefferer nofollow"
                class="flex items-center justify-center"
              >
                <img
                  src="~/assets/img/icons/dzen.png"
                  alt=""
                  class="block h-28 w-28"
                />
              </a>
            </li>
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener norefferer nofollow"
                class="flex items-center justify-center"
              >
                <img
                  src="~/assets/img/icons/vk.png"
                  alt=""
                  class="block h-28 w-28"
                />
              </a>
            </li>
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener norefferer nofollow"
                class="flex items-center justify-center"
              >
                <img src="~/assets/img/icons/tg.svg" alt="" class="block" />
              </a>
            </li>
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener norefferer nofollow"
                class="flex items-center justify-center"
              >
                <img src="~/assets/img/icons/yt.svg" alt="" class="block" />
              </a>
            </li>
          </ul>
        </nav>
      </AppContainer>
    </div>
    <AppContainer>
      <div class="py-20 group-[.expanded]:py-10">
        <div class="flex items-center">
          <div
            class="mr-40 flex flex-shrink-0 flex-grow-0 items-center group-[.expanded]:hidden"
          >
            <AppLogo></AppLogo>
          </div>
          <teleport to=".app-modal-content" :disabled="isLgScreen">
            <div v-if="!isLgScreen" class="flex justify-end py-16">
              <img :src="IconBurgerOpened" alt="" @click="openModal" />
            </div>
            <div
              class="flex flex-grow items-center justify-between gap-x-10 transition-all group-[.expanded]:mr-0 group-[.expanded]:justify-end md:flex-col"
            >
              <nav>
                <ul
                  class="flex items-center gap-x-20 leading-none text-black md:flex-col md:text-black"
                >
                  <li class="px-3 py-5 text-bold-18 md:mb-20 md:text-bold-22">
                    <RouterLink to="/catalog">Главная</RouterLink>
                  </li>
                  <li class="px-3 py-5 text-bold-18 md:mb-20 md:text-bold-22">
                    <RouterLink to="/contacts">Каталог</RouterLink>
                  </li>
                  <li class="px-3 py-5 text-bold-18 md:mb-20 md:text-bold-22">
                    <RouterLink to="/cart">Новинки</RouterLink>
                  </li>
                </ul>
              </nav>
              <div
                class="ml-40 mr-20 flex flex-grow items-center gap-x-10 group-[.expanded]:hidden md:mb-30"
              >
                <div
                  class="group flex w-full items-center rounded-full border border-black/20 leading-none"
                >
                  <div class="ml-12 mr-5 h-16 w-16">
                    <img src="@/assets/img/icons/search.svg" alt="" />
                  </div>
                  <div class="relative w-full flex-grow">
                    <input
                      id="search-input"
                      class="input peer block w-full bg-transparent p-12 pl-0 font-inter text-black outline-none transition text-bold-16 placeholder:opacity-0 focus:text-[#000] group-hover:text-[#000]"
                      :value="searchModel"
                      placeholder="Поиск"
                      type="text"
                      @input="handleSearchInput"
                    />
                    <label
                      class="label absolute left-0 top-12 text-[12px] text-[#848A99] opacity-0 transition-all text-bold-16 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:opacity-100 peer-hover:text-[#000] peer-focus:top-5 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:text-[#848A99] peer-focus:opacity-0"
                      for="search-input"
                    >
                      Поиск
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="tel:+79915955199"
              class="flex flex-shrink-0 flex-grow-0 items-center leading-none text-black text-extrabold-20 group-[.expanded]:hidden md:flex-col md:text-black md:text-extrabold-24"
            >
              +7 991 595-51-99
            </a>
          </teleport>
          <ClientOnly>
            <div v-if="!isLgScreen" class="ml-auto">
              <img
                :src="isModalOpened ? IconBurgerOpened : IconBurger"
                alt=""
                @click="openModal"
              />
            </div>
          </ClientOnly>
        </div>
      </div>
    </AppContainer>
  </header>
</template>

<style lang="scss" scoped></style>
