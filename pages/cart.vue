<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { useModal, useModalSlot } from 'vue-final-modal'

import AppCheckbox from '@/components/shared/AppCheckbox.vue'
import AppModal from '@/components/widgets/AppModal.vue'
import OrderConfirm from '@/components/widgets/OrderConfirm.vue'
import { type ICart, useCartStore } from '@/store/cart'
import { LOCAL_STORAGE_SESSION_KEY } from '@/store/cart/cart.store'
import { useUserStore } from '@/store/user/useUserStore'

const cartStore = useCartStore()
const userStore = useUserStore()
const config = useRuntimeConfig()
const products: Ref<ICart['products'] | never[]> = computed(
  () =>
    cartStore.cart?.products?.map(product => ({
      ...product,
      isActive: true
    })) || []
)
const isCartLoading = ref(true)

const updateCartAction = async (mutateFn: any) => {
  isCartLoading.value = true

  await mutateFn()

  if (!cartStore.cart?.products) {
    isCartLoading.value = false
    return
  }

  isCartLoading.value = false
}

function getSession() {
  const session = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)
  if (!session) {
    const hash = uuidv4()
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, hash)
    return hash
  }

  return session
}

onMounted(async () => {
  isCartLoading.value = true

  const data = await $fetch<ICart>(`/api/cart/${getSession()}`, {
    baseURL: config.public.baseUrl as string
  })
  cartStore.cart = data as ICart

  isCartLoading.value = false
})

const handleIncrementItem = async (itemId: number, weightId: number) => {
  await updateCartAction(() => cartStore.addItem(itemId, weightId))
}

const handleDecrementItem = async (itemId: number, weightId: number) => {
  await updateCartAction(() => cartStore.removeItem(itemId, weightId))
}

const handleDeleteItem = async (itemId: number, weightId: number) => {
  await updateCartAction(() => cartStore.deleteItem(itemId, weightId))
}

const isAll = computed(
  () => !!products.value?.every(product => product.isActive)
)
const handleChooseAllChange = (e: boolean) => {
  products.value?.forEach(product => (product.isActive = e))
}

const { open: openConfirmModal, close: closeConfirmModal } = useModal({
  component: AppModal,
  attrs: {
    onConfirm() {
      closeConfirmModal()
    }
  },
  slots: {
    default: useModalSlot({
      component: OrderConfirm,
      attrs: {
        onConfirm() {
          closeConfirmModal()
          navigateTo('/catalog')
        }
      }
    })
  }
})

const clientOpenAuth = ref()
onMounted(() => {
  const openAuth = inject('openAuth') as () => void
  clientOpenAuth.value = openAuth
})

const handleOrderCreate = async () => {
  if (!userStore.isAuth) {
    clientOpenAuth.value()
    return
  }

  await cartStore.createOrder()
  openConfirmModal()
}
</script>

<template>
  <section class="pb-60 pt-20">
    <AppContainer>
      <AppBreadcrumbs :crumbs="[{ label: 'Корзина' }]" class="mb-40" />
      <template v-if="isCartLoading">
        <div class="flex h-[400px] items-center justify-center">
          <AppSpinner />
        </div>
      </template>
      <template v-else>
        <div
          class="grid grid-cols-[calc(100%-520px)_500px] gap-x-20 xl:grid-cols-[calc(100%-420px)_400px] lg:grid-cols-1 lg:gap-y-20 md:grid-cols-1 md:gap-y-10"
        >
          <div class="rounded-[24px] bg-gray p-40 md:rounded-[12px] md:p-20">
            <div class="mb-20 flex items-center justify-between">
              <div
                class="leading-none text-black text-extrabold-48 md:text-extrabold-36"
              >
                Корзина
              </div>
              <AppCheckbox
                v-model="isAll"
                label="Выбрать все"
                @change="handleChooseAllChange"
              ></AppCheckbox>
            </div>

            <template v-if="Array.isArray(products) && products.length > 0">
              <template v-for="item in products" :key="item.id">
                <AppCartOrder
                  :id="item.id"
                  :name="item.product.name"
                  :image="item.product.image"
                  :price="item.productPrice"
                  :total-price="item.totalPrice"
                  :amount="item.amount"
                  :is-active="item.isActive"
                  class="mb-20 last:mb-0"
                  @change-active="e => (item.isActive = e)"
                  @increment-count="
                    () =>
                      handleIncrementItem(item.product.id, item.productPrice.id)
                  "
                  @decrement-count="
                    () =>
                      handleDecrementItem(item.product.id, item.productPrice.id)
                  "
                  @delete-item="
                    () =>
                      handleDeleteItem(item.product.id, item.productPrice.id)
                  "
                ></AppCartOrder>
              </template>
            </template>
            <template v-else>
              <div class="text-regular-14 py-20 text-center opacity-30">
                Корзина пуста
              </div>
            </template>
          </div>
          <div class="rounded-[24px] bg-gray md:rounded-[12px]">
            <AppCartCheckoutSheet
              :is-loading="isCartLoading"
              :total-price="cartStore.cart?.totalPrice"
              @create-order="handleOrderCreate"
            />
          </div>
        </div>
      </template>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped></style>
