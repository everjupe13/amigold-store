<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { useCartStore } from '@/store/cart'
import { IProduct, useCatalogStore } from '@/store/catalog'
import { formatRubles } from '@/utils/cost'

const route = useRoute()
const catalogStore = useCatalogStore()
const cartStore = useCartStore()
const isProductLoading = ref(true)
const product = ref<IProduct | null>(null)
const pricesArray = ref<IProduct['prices'] | []>([])
const currentPriceIndex = ref()
const tabs = ref<string[]>([])

isProductLoading.value = true
const { data } = await catalogStore.fetchProduct(
  route.params.productSlug as string
)

if (data.value) {
  product.value = data.value as IProduct
} else {
  await navigateTo('/error')
}
// isProductLoading.value = false

pricesArray.value = [...product.value!.prices]?.map(price => ({
  ...price,
  isActive: false
}))
pricesArray.value[0].isActive = true
currentPriceIndex.value = pricesArray.value.findIndex(price => price.isActive)

tabs.value = [
  product.value!.description,
  product.value!.feedingRate,
  product.value!.delivery
]

onMounted(() => {
  isProductLoading.value = false
})

const currentPrice = computed(() => {
  const total =
    currentPriceIndex.value >= 0
      ? Number(pricesArray.value[currentPriceIndex.value]?.price)
      : 0
  return formatRubles(total)
})

const onWeightChange = (index: number) => {
  currentPriceIndex.value = index

  for (const price of pricesArray.value) {
    price.isActive = false
  }

  pricesArray.value[index].isActive = true
}

const currentTabIndex = ref(0)
const onTabChange = (index: number) => (currentTabIndex.value = index)

const isCartActionLoading = ref(false)
const isCartActionSuccess = ref(true)
const addToCart = async () => {
  try {
    isCartActionLoading.value = true
    isCartActionSuccess.value = false
    const currentWeightId = pricesArray.value[currentPriceIndex.value].id
    await cartStore.addItem(product.value!.id, currentWeightId)
    isCartActionLoading.value = false
    setTimeout(() => {
      isCartActionSuccess.value = true
    }, 1000)
  } finally {
    isCartActionLoading.value = false
    setTimeout(() => {
      isCartActionSuccess.value = true
    }, 1000)
  }
}

const currentProductCount = computed(() => {
  return (
    cartStore.cart?.products.find(
      cartProduct =>
        cartProduct.product.id === product.value?.id &&
        cartProduct.productPrice.id ===
          pricesArray.value[currentPriceIndex.value].id
    )?.amount || 0
  )
})
async function increaseCount() {
  if (!product.value) {
    return false
  }
  isCartActionLoading.value = true
  isCartActionSuccess.value = false

  try {
    await cartStore.addItem(
      product.value.id,
      pricesArray.value[currentPriceIndex.value].id
    )
  } finally {
    isCartActionLoading.value = false
    setTimeout(() => {
      isCartActionSuccess.value = true
    }, 1000)
  }
}
async function decreaseCount() {
  if (!product.value) {
    return false
  }

  isCartActionLoading.value = true

  try {
    await cartStore.removeItem(
      product.value.id,
      pricesArray.value[currentPriceIndex.value].id
    )
  } finally {
    isCartActionLoading.value = false
  }
}
</script>

<template>
  <section class="pb-60 pt-20">
    <AppContainer>
      <AppBreadcrumbs
        :crumbs="[
          { label: 'Каталог', toLink: '/catalog' },
          { label: product?.name || '' }
        ]"
        class="mb-40"
      />
      <template v-if="isProductLoading">
        <div class="flex justify-center">
          <AppSpinner />
        </div>
      </template>
      <template v-else>
        <AppProductPromotionBanner v-if="product?.isPromotionActive">
          {{
            product?.promotionText ||
            'Данный товар участвует в акции! При покупке 2х товаров - третий бесплатно!'
          }}
        </AppProductPromotionBanner>

        <div class="mt-25">
          <div
            class="mb-60 grid grid-cols-[600px_calc(100%-600px-40px)] gap-x-40 lg:grid-cols-1"
          >
            <div class="lg:mb-20">
              <AppProductSlider :gallery="product?.gallery" />
            </div>
            <div class="flex flex-col justify-between">
              <div class="mb-70 lg:mb-30">
                <p
                  class="mb-25 font-inter !leading-none text-green text-semibold-14"
                >
                  Артикул: {{ product?.vendorCode || 'Артикул: 561326771' }}
                </p>
                <h1 class="mb-15 leading-none text-extrabold-24">
                  {{
                    product?.name ||
                    'Амиголд Сухой корм для кошек для выведения шерсти с индейкой с овощами'
                  }}
                </h1>
                <p class="font-inter leading-normal text-medium-16">
                  {{
                    product?.shortDescription ||
                    'Послужит отличной едой для милых собакенов всех возрастов! Корм сделан полностью из натуральных ингридиентов, проверен в нашей лаборатории.'
                  }}
                </p>
              </div>
              <div class="mt-auto rounded-[24px] bg-gray p-30">
                <div class="mb-24">
                  <p class="mb-10 text-bold-18">Фасовка:</p>
                  <div class="flex flex-wrap gap-8">
                    <AppButton
                      v-for="(price, index) in pricesArray"
                      :key="price.id"
                      size="sm"
                      :theme="price.isActive ? 'default' : 'black'"
                      :outlined="!price.isActive && true"
                      @click="() => onWeightChange(index)"
                    >
                      {{ price.textLabel }}
                    </AppButton>
                  </div>
                </div>
                <div
                  class="mb-24 leading-none text-extrabold-36 md:text-extrabold-24"
                >
                  {{ currentPrice }}
                </div>
                <div class="flex flex-wrap items-center gap-10">
                  <div class="flex w-[130px] items-center">
                    <div class="rounded-full border-2 border-black/20 p-12">
                      <ProductCounter
                        :amount="currentProductCount"
                        :disabled-when-count="0"
                        :is-disabled="
                          isCartActionLoading || !isCartActionSuccess
                        "
                        button-classes="bg-yellow hover:border-yellow hover:bg-yellow"
                        wrapper-classes="h-24"
                        @decrease="decreaseCount"
                        @increase="increaseCount"
                      />
                    </div>
                  </div>
                  <AppButton
                    class="h-52 w-[200px] whitespace-nowrap"
                    theme="black"
                    :disabled="isCartActionLoading || !isCartActionSuccess"
                    @click="addToCart"
                  >
                    <div
                      v-if="isCartActionLoading"
                      class="flex items-center justify-center"
                    >
                      <AppSpinner :size="18" class="text-white" />
                    </div>
                    <template v-else>
                      {{
                        !isCartActionSuccess
                          ? 'Товар добавлен'
                          : 'Добавить в корзину'
                      }}
                    </template>
                  </AppButton>
                  <AppButton class="h-52 whitespace-nowrap" theme="default">
                    <RouterLink to="/cart" class="block h-full w-full">
                      Перейти в корзину
                    </RouterLink>
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </AppContainer>
  </section>

  <section class="bg-waved-t bg-waved-b">
    <AppContainer>
      <div class="rounded-[24px]">
        <div class="max-w-max">
          <div
            class="flex max-w-max items-center gap-x-10 rounded-full lg:rounded-[24px] md:flex-wrap"
          >
            <AppButton
              theme="black"
              :outlined="currentTabIndex !== 0"
              class="!border-transparent"
              @click="() => onTabChange(0)"
            >
              Описание товара, состав
            </AppButton>
            <AppButton
              theme="black"
              :outlined="currentTabIndex !== 1"
              class="!border-transparent"
              @click="() => onTabChange(1)"
            >
              Норма кормления
            </AppButton>
            <AppButton
              theme="black"
              :outlined="currentTabIndex !== 2"
              class="!border-transparent"
              @click="() => onTabChange(2)"
            >
              Доставка и оплата
            </AppButton>
          </div>
        </div>
        <div
          class="tab-field min-h-[200px] max-w-[800px] pt-40"
          v-html="tabs[currentTabIndex] || ''"
        ></div>
      </div>
    </AppContainer>
  </section>

  <hr class="invisible py-10" aria-hidden />
</template>

<style lang="scss">
.tab-field {
  p {
    @apply mb-30 font-inter font-medium last-of-type:mb-0;
  }
  strong {
    @apply mb-8 block;
  }

  img {
    @apply block w-full;
  }
}
</style>
