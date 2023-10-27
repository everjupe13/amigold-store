<script lang="ts" setup>
import { debounce } from 'lodash-es'
import { useModal } from 'vue-final-modal'

import IconBurger from '@/assets/img/burger-icon.svg'
import AppLogo from '@/components/shared/AppLogo.vue'
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user/useUserStore'

import HeaderNavModal from './HeaderNavModal.vue'

const isLgScreen: boolean | undefined = inject('isLgScreen', true)

const clientOpenAuthModal = ref()
onMounted(() => {
  const openAuthModal = inject('openAuth') as () => void
  clientOpenAuthModal.value = openAuthModal
})
const userStore = useUserStore()

const burgerModal = useModal({
  component: HeaderNavModal,
  attrs: {
    onConfirm() {
      burgerModal.close()
    }
  }
})

const cartStore = useCartStore()
const searchModel = ref('')
const handleSearchInput = debounce(e => {
  searchModel.value = e.target.value
  console.log(e.target.value)
}, 500)
</script>

<template>
  <div>
    <AppContainer>
      <div class="py-20 group-[.expanded]:py-10">
        <div class="flex items-center">
          <div
            class="mr-40 flex flex-shrink-0 flex-grow-0 items-center group-[.expanded]:hidden"
          >
            <AppLogo></AppLogo>
          </div>
          <div
            class="flex flex-grow items-center justify-between gap-x-10 transition-all group-[.expanded]:mr-0 group-[.expanded]:justify-end md:hidden md:flex-col"
          >
            <nav>
              <ul
                class="flex items-center gap-x-20 leading-none text-black md:flex-col md:text-black"
              >
                <li class="px-3 py-5 text-bold-18 md:mb-20 md:text-bold-22">
                  <RouterLink to="/">Главная</RouterLink>
                </li>
                <li class="px-3 py-5 text-bold-18 md:mb-20 md:text-bold-22">
                  <RouterLink to="/catalog">Каталог</RouterLink>
                </li>
                <li class="px-3 py-5 text-bold-18 md:mb-20 md:text-bold-22">
                  <RouterLink to="/novinki">Новинки</RouterLink>
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

          <div class="mr-20 md:hidden">
            <a
              href="tel:+79915955199"
              class="flex flex-shrink-0 flex-grow-0 items-center leading-none text-black text-extrabold-20 group-[.expanded]:hidden md:flex-col md:text-black md:text-extrabold-24"
            >
              +7 991 595-51-99
            </a>
          </div>
          <div class="flex items-center gap-x-10">
            <NuxtLink
              to="/cart"
              class="relative flex h-38 w-38 items-center justify-center rounded-full bg-gray md:hidden"
            >
              <span
                v-if="cartStore.cart?.products?.length"
                class="min-w-14 absolute -right-3 -top-3 flex items-center justify-center rounded-full bg-[#F00] px-4 py-2 font-inter leading-none text-white text-extrabold-10"
              >
                {{ cartStore.cart.products.length }}
              </span>
              <LazyCartIcon />
            </NuxtLink>
            <ClientOnly>
              <NuxtLink
                v-if="userStore.isAuth"
                to="/profile"
                class="flex h-38 w-38 items-center justify-center rounded-full bg-gray"
              >
                <LazyUserIcon />
              </NuxtLink>
              <div
                v-else
                class="flex h-38 w-38 cursor-pointer items-center justify-center rounded-full bg-gray"
                @click="() => clientOpenAuthModal()"
              >
                <LazyUserIcon />
              </div>
            </ClientOnly>
          </div>
          <ClientOnly>
            <div
              v-if="!isLgScreen"
              class="ml-auto flex items-center justify-center p-10"
            >
              <img
                :src="IconBurger"
                alt=""
                class="h-30 w-30"
                @click="burgerModal.open()"
              />
            </div>
          </ClientOnly>
        </div>
      </div>
    </AppContainer>
  </div>
</template>
