<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { v4 as uuidv4 } from 'uuid'
import { useModal, useModalSlot } from 'vue-final-modal'

import AppModal from '@/components/widgets/AppModal.vue'
import FeedbackFormModal from '@/components/widgets/modals/feedback/FeedbackFormModal.vue'
import OrderConfirm from '@/components/widgets/OrderConfirm.vue'
import { type ICart, useCartStore } from '@/store/cart'
import { LOCAL_STORAGE_SESSION_KEY } from '@/store/cart/cart.store'
import { useDeliveryStore } from '@/store/cart/delivery/index'
import { usePaymentStore } from '@/store/cart/payment/index'
import { useUserStore } from '@/store/user/useUserStore'
import { formatRubles } from '@/utils/cost'

const cartStore = useCartStore()
const userStore = useUserStore()
const config = useRuntimeConfig()
const products: Ref<ICart['products'] | never[]> = computed(() =>
  cartStore.cart?.products && cartStore.cart?.products.length > 0
    ? [
        ...cartStore.cart.products.map(product => ({
          ...product,
          isActive: true
        }))
      ].sort((a, b) => a.id - b.id)
    : []
)
const isCartLoading = ref(true)
const isPageLoaded = ref(false)

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
  isPageLoaded.value = true
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

// const isAll = computed(
//   () => !!products.value?.every(product => product.isActive)
// )
// const handleChooseAllChange = (e: boolean) => {
//   products.value?.forEach(product => (product.isActive = e))
// }

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

const { open: _openFeedbackModal, close: closeFeedbackModal } = useModal({
  component: FeedbackFormModal,
  attrs: {
    onConfirm() {
      closeFeedbackModal()
      openConfirmModal()
    }
  }
})

const clientOpenAuth = ref()
onMounted(() => {
  const openAuth = inject('openAuth') as () => void
  clientOpenAuth.value = openAuth
})

const handleOrderCreate = async () => {
  await useScroll('#checkout-user-data', -20)
}

const formData = reactive({
  email: '',
  phone: '',
  customerName: '',
  orderComment: '',
  deliveryTypeId: undefined as undefined | number | string,
  deliveryAddress: '',
  deliveryComment: '',
  paymentTypeId: undefined as undefined | number
})
const rules = {
  email: { required, email },
  phone: { required },
  customerName: { required },
  orderComment: { required },
  deliveryTypeId: { required },
  deliveryAddress: { required },
  deliveryComment: { required },
  paymentTypeId: { required }
}

const v$ = useVuelidate(rules, formData)
const inputPropsMapper = (props: { [x: string]: any }) => {
  return {
    isValid: props.$dirty ? !props.$invalid : true,
    isDirty: props.$dirty,
    validationMessage: unref(props.$silentErrors[0]?.$message)
  }
}

const deliveryStore = useDeliveryStore()
await deliveryStore.fetchDeliveryTypes()

const selfDeliveryType = deliveryStore.deliveryTypes?.find(
  type => type.isSelfDelivery
)
const selfDeliveryTypeId = selfDeliveryType?.id
formData.deliveryTypeId = selfDeliveryTypeId

const deliveryTabTypeId = ref(selfDeliveryTypeId)
const handleDeliveryTypeChange = (idx: number) => {
  if (idx !== -1) {
    formData.deliveryTypeId = idx
  }
  deliveryTabTypeId.value = idx
}

const deliveryCompanyId = ref<number>()
const handleDeliveryCompanyChange = (id: number) => {
  deliveryCompanyId.value = id
}

const paymentStore = usePaymentStore()
await paymentStore.fetchPaymentTypes()

const paymentTypeId = ref(paymentStore.paymentTypes?.[0]?.id || -1)
formData.paymentTypeId = paymentStore.paymentTypes?.[0]?.id
const handlePaymentTypeChange = (idx: number) => {
  formData.paymentTypeId = idx
  paymentTypeId.value = idx
}

const isLgScreen = inject('isLgScreen')
const isCartDisabled = computed(
  () => !Number(cartStore.cart?.totalPrice) || isCartLoading.value
)

const handleOrderSubmit = async () => {
  const { status } = await cartStore.createOrder({
    phone: formData.phone,
    email: formData.email,
    customerName: formData.customerName,
    orderComment: formData.orderComment,
    deliveryTypeId: formData.deliveryTypeId,
    deliveryAddress: formData.deliveryAddress,
    deliveryComment: formData.deliveryComment,
    paymentTypeId: formData.paymentTypeId,
    isNewUser: !userStore.isAuth
  })

  if (status) {
    openConfirmModal()
  }
}
</script>

<template>
  <section class="pb-100 pt-20 md:pb-50">
    <AppContainer>
      <AppBreadcrumbs :crumbs="[{ label: 'Корзина' }]" class="mb-40" />

      <template v-if="!isPageLoaded">
        <div class="flex h-[400px] items-center justify-center">
          <AppSpinner />
        </div>
      </template>
      <template v-else>
        <div
          class="grid grid-cols-[calc(100%-520px)_500px] gap-x-20 xl:grid-cols-[calc(100%-420px)_400px] lg:grid-cols-1 lg:gap-y-20 md:grid-cols-1 md:gap-y-10"
        >
          <div class="flex flex-col gap-y-20">
            <div
              class="rounded-[18px] bg-gray p-30 md:rounded-[12px] md:px-13 md:py-20"
            >
              <div class="mb-20 flex items-center justify-between">
                <div
                  class="leading-none text-black text-extrabold-48 md:text-extrabold-36"
                >
                  Корзина
                </div>
              </div>

              <template v-if="Array.isArray(products) && products.length > 0">
                <template v-for="item in products" :key="item.id">
                  <CartOrder
                    :id="item.id"
                    :name="item.product.name"
                    :image="item.product.image"
                    :price="item.productPrice"
                    :total-price="item.totalPrice"
                    :amount="item.amount"
                    :is-active="item.isActive"
                    :is-disabled="isCartLoading"
                    :slug="item.product.slug"
                    class="mb-20 last:mb-0"
                    @change-active="e => (item.isActive = e)"
                    @increment-count="
                      () =>
                        handleIncrementItem(
                          item.product.id,
                          item.productPrice.id
                        )
                    "
                    @decrement-count="
                      () =>
                        handleDecrementItem(
                          item.product.id,
                          item.productPrice.id
                        )
                    "
                    @delete-item="
                      () =>
                        handleDeleteItem(item.product.id, item.productPrice.id)
                    "
                  ></CartOrder>
                </template>
              </template>

              <template v-else>
                <div class="text-regular-14 py-20 text-center opacity-30">
                  Корзина пуста
                </div>
              </template>
            </div>

            <div
              id="checkout-user-data"
              class="rounded-[18px] bg-gray p-30 md:rounded-[12px] md:p-20"
            >
              <h2
                class="mb-20 leading-none text-black text-extrabold-36 md:text-extrabold-32"
              >
                Ваши данные
              </h2>
              <div class="max-w-[500px]">
                <form @submit.prevent="">
                  <div class="">
                    <AppInput
                      v-model="v$.email.$model"
                      placeholder="E-mail"
                      class="mb-15"
                      :disabled="isCartLoading"
                      v-bind="inputPropsMapper(v$.email)"
                    />
                    <div class="mb-15">
                      <AppInput
                        v-model="v$.phone.$model"
                        placeholder="Телефон"
                        class="mb-5"
                        :disabled="isCartLoading"
                        v-bind="inputPropsMapper(v$.phone)"
                      />
                      <p class="px-5 text-[12px] leading-tight text-[#878686]">
                        Обязательно указывайте действующий номер телефона, так
                        как после оформления заказа с вами свяжется наш менеджер
                      </p>
                    </div>
                    <AppInput
                      v-model="v$.customerName.$model"
                      placeholder="ФИО / Название организации"
                      class="mb-15"
                      :disabled="isCartLoading"
                      v-bind="inputPropsMapper(v$.customerName)"
                    />

                    <div>
                      <AppInput
                        v-model="v$.orderComment.$model"
                        placeholder="Комментарий к заказу"
                        class="mb-5"
                        :disabled="isCartLoading"
                        v-bind="inputPropsMapper(v$.orderComment)"
                      />
                      <p class="px-5 text-[12px] leading-tight text-[#878686]">
                        Напишите ваши пожелания, или заметки к данному заказу!
                        Мы обязательно все учтем :)
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="rounded-[18px] bg-gray p-30 md:rounded-[12px] md:p-20">
              <h2
                class="mb-20 leading-none text-black text-extrabold-36 md:text-extrabold-32"
              >
                Доставка
              </h2>
              <div>
                <div class="mb-20 flex gap-10 md:flex-wrap">
                  <button
                    v-if="selfDeliveryType"
                    class="flex items-center justify-center whitespace-nowrap rounded-[100px] border-2 border-black bg-button px-20 py-16 leading-none transition text-bold-16 active:translate-y-2"
                    :class="{
                      '!bg-black !text-white':
                        deliveryTabTypeId === selfDeliveryTypeId
                    }"
                    @click="
                      handleDeliveryTypeChange(selfDeliveryTypeId as number)
                    "
                  >
                    Самовывоз заказа
                  </button>
                  <button
                    class="flex items-center justify-center whitespace-nowrap rounded-[100px] border-2 border-black bg-button px-20 py-16 leading-none transition text-bold-16 active:translate-y-2"
                    :class="{
                      '!bg-black !text-white': deliveryTabTypeId === -1
                    }"
                    @click="handleDeliveryTypeChange(-1)"
                  >
                    Доставка заказа
                  </button>
                </div>
                <div>
                  <div
                    v-if="
                      deliveryTabTypeId === selfDeliveryTypeId &&
                      selfDeliveryTypeId
                    "
                    :key="0"
                  >
                    <p class="px-5 text-[14px] leading-tight text-black">
                      {{ selfDeliveryType?.description || '' }}
                    </p>
                  </div>
                  <div v-else-if="deliveryTabTypeId === -1" :key="1">
                    <div
                      class="mb-25 grid grid-cols-3 gap-10 md:grid-cols-2 sm:grid-cols-1"
                    >
                      <div
                        v-for="company in deliveryStore.deliveryTypes?.filter(
                          company => company.id !== selfDeliveryTypeId
                        )"
                        :key="company.id"
                        class="flex min-h-[75px] cursor-pointer items-center gap-x-8 rounded-[12px] bg-[#D9D9D9] p-15 pr-13 transition-all"
                        :class="{
                          '!bg-yellow': deliveryCompanyId === company.id
                        }"
                        @click="handleDeliveryCompanyChange(company.id)"
                      >
                        <div
                          v-if="company.image"
                          class="h-40 w-50 flex-shrink-0 flex-grow-0 rounded-[5px] bg-dark"
                        >
                          <img
                            :src="company.image"
                            :alt="company.name"
                            class="pointer-events-none block h-full w-full select-none object-cover"
                          />
                        </div>
                        <div
                          class="select-none text-[14px] leading-tight text-black transition-all"
                          :class="{
                            'text-white': deliveryCompanyId === company.id
                          }"
                        >
                          {{ company.name }}
                        </div>
                      </div>
                    </div>
                    <div class="max-w-[550px]">
                      <p
                        class="mb-30 px-5 text-[12px] leading-tight text-[#878686]"
                      >
                        {{
                          deliveryStore.deliveryTypes?.find(
                            company => company.id === deliveryCompanyId
                          )?.description || ''
                        }}
                      </p>
                      <div>
                        <div class="mb-15">
                          <AppInput
                            v-model="v$.deliveryAddress.$model"
                            placeholder="Адрес доставки \ пункта выдачи"
                            class="mb-5"
                            :disabled="isCartLoading"
                            v-bind="inputPropsMapper(v$.deliveryAddress)"
                          />
                        </div>
                        <div>
                          <AppInput
                            v-model="v$.deliveryComment.$model"
                            placeholder="Комментарий к доставке"
                            class="mb-5"
                            :disabled="isCartLoading"
                            v-bind="inputPropsMapper(v$.deliveryComment)"
                          />
                          <p
                            class="px-5 text-[12px] leading-tight text-[#878686]"
                          >
                            Укажите ваши пожелания: доставку на определеную
                            дату, красивая упаковка заказа...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-[18px] bg-gray p-30 md:rounded-[12px] md:p-20">
              <div class="mb-20">
                <h2
                  class="mb-4 leading-none text-black text-extrabold-36 md:text-extrabold-32"
                >
                  Оплата заказа
                </h2>
                <p class="text-[12px] leading-tight text-[#878686]">
                  Вы выбираете удобный для вас способ оплаты заказа
                </p>
              </div>
              <div class="mb-20 flex flex-wrap gap-10">
                <button
                  v-for="paymentType in paymentStore.paymentTypes"
                  :key="paymentType.id"
                  class="flex items-center justify-center whitespace-nowrap rounded-[100px] border-2 border-black bg-button px-15 py-16 leading-none transition text-bold-16 active:translate-y-2"
                  :class="{
                    '!bg-black !text-white': paymentTypeId === paymentType.id
                  }"
                  @click="handlePaymentTypeChange(paymentType.id)"
                >
                  {{ paymentType.name }}
                </button>
              </div>
              <p class="px-5 text-[14px] leading-tight text-black">
                {{
                  paymentStore.paymentTypes?.find(
                    paymentType => paymentType.id === paymentTypeId
                  )?.description || ''
                }}
              </p>
            </div>

            <div class="flex">
              <AppButton
                v-if="isLgScreen"
                type="submit"
                class="h-65 w-full !rounded-[8px]"
                :disabled="isCartDisabled"
                @click="handleOrderSubmit"
              >
                <div
                  v-if="isCartLoading"
                  class="flex items-center justify-center"
                >
                  <AppSpinner :size="18" class="!text-white" />
                </div>
                <template v-else>
                  {{
                    `К оформлению ${
                      formatRubles(Number(cartStore.cart?.totalPrice)) || ''
                    }`
                  }}
                </template>
              </AppButton>
            </div>
          </div>
          <div class="">
            <CartCheckoutSheet
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
