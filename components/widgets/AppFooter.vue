<script lang="ts" setup>
import AppLogo from '@/components/shared/AppLogo.vue'
import { useCatalogStore } from '@/store/catalog'

const catalogStore = useCatalogStore()
await catalogStore.fetchCategories()
</script>

<template>
  <footer id="footer" class="bg-waved-t py-40">
    <AppContainer>
      <div>
        <div class="flex justify-between gap-40 md:flex-col md:gap-y-20">
          <div class="flex flex-shrink-0 flex-grow md:mb-20">
            <AppLogo :width="100" :height="78"></AppLogo>
          </div>
          <div class="flex max-w-[200px] flex-grow gap-40 md:max-w-none">
            <nav>
              <p class="mb-20 text-bold-18">Каталог</p>
              <ul class="flex flex-col gap-y-10 leading-tight">
                <li
                  v-for="category in catalogStore.categories"
                  :key="category.id"
                  class="font-inter tracking-[-0.28px] text-medium-14"
                >
                  <NuxtLink
                    :to="`/catalog${category.slug ? `/${category.slug}` : ''}`"
                  >
                    {{ category.name }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
          <div class="flex flex-grow gap-y-40 md:gap-y-20">
            <nav>
              <p class="mb-20 text-bold-18">Деятельность</p>
              <ul class="flex flex-col gap-y-10 leading-tight">
                <li class="font-inter tracking-[-0.28px] text-medium-14">
                  <NuxtLink to="/news">Новости</NuxtLink>
                </li>
                <li class="font-inter tracking-[-0.28px] text-medium-14">
                  <NuxtLink to="/about">О нас</NuxtLink>
                </li>
                <li class="font-inter tracking-[-0.28px] text-medium-14">
                  <NuxtLink to="/topics">Статьи</NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
          <div class="flex flex-grow gap-y-40 md:gap-y-20">
            <nav>
              <p class="mb-20 text-bold-18">Покупателям</p>
              <ul class="flex flex-col gap-y-10 leading-tight">
                <li class="font-inter tracking-[-0.28px] text-medium-14">
                  <NuxtLink to="/contact">Контакты</NuxtLink>
                </li>
                <li class="font-inter tracking-[-0.28px] text-medium-14">
                  <NuxtLink to="/pay">Доставка и оплата</NuxtLink>
                </li>
                <li class="font-inter tracking-[-0.28px] text-medium-14">
                  <NuxtLink to="/partner">Партнерам</NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
          <div class="flex flex-grow-[2] gap-y-40 md:gap-y-20">
            <nav>
              <p class="mb-20 text-bold-18">Контакты</p>

              <ul class="mb-20 flex flex-col gap-y-10 leading-tight">
                <li class="font-inter tracking-[-0.28px] text-medium-14">
                  <span class="text-black/70">График работы:</span>
                  с 09:00 по 21:00
                </li>
                <li class="font-inter tracking-[-0.28px] text-medium-14">
                  <span class="text-black/70">Контактный номер:</span>
                  8 800 555-44-33
                </li>
                <li class="font-inter tracking-[-0.28px] text-medium-14">
                  <span class="text-black/70">Офис:</span>
                  г. Москва, ул Ратная д 10, корп 2, помещение XIII
                </li>
                <li class="font-inter tracking-[-0.28px] text-medium-14">
                  <span class="text-black/70">Склад:</span>
                  г. Москва, Южнобутовская 29
                </li>
                <li class="font-inter tracking-[-0.28px] text-medium-14">
                  <span class="text-black/70">Email:</span>
                  shumilova4@ya.ru
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
          </div>
        </div>
        <hr class="mt-40 h-1 border-0 bg-black/20" />
        <div
          class="flex items-center gap-x-40 py-20 font-inter leading-none text-medium-14 md:flex-col md:gap-y-20"
        >
          <p class="">© 2023 Зоомагазин «Амиго»</p>
          <a href="/" class="">Пользовательское соглашение</a>
          <a href="/" class="">Политика конфиденциальности</a>
        </div>
      </div>
    </AppContainer>
  </footer>
</template>
