<script lang="ts" setup>
import { formatRubles } from '@/utils/cost'

type PropsType = {
  productId?: string | number
  image?: string
  name?: string
  vendorCode?: string
  slug?: string
  prices?: {
    id?: number
    weight?: string
    vendorCode?: number
    textLabel?: string
    product?: number
    volume?: string
    price?: string
    at_store?: number
  }[]
  isNew?: boolean
  isDiscount?: boolean
  isPromotionActive?: boolean
  isLoading?: boolean
  isFinished?: boolean
  isLabelVisible?: boolean
}

const props = withDefaults(defineProps<PropsType>(), {
  productId: '',
  image: '',
  vendorCode: '',
  slug: undefined,
  name: '',
  prices: () => []
})

const emits = defineEmits<{
  (e: 'add-product'): () => {}
}>()

const actionDisabled = true
const onAddClick = () => {
  if (!actionDisabled) {
    emits('add-product')
  }
}

const toLink = computed(() => `/product/${props.productId}`)
const currentPrice = computed(() =>
  props.prices[0]?.price
    ? `от ${formatRubles(Number(props.prices[0]?.price))}`
    : ''
)

const isLoadedInner = computed<boolean>(() => !!props.productId && !!props.name)
</script>

<template>
  <article class="flex flex-col">
    <div
      class="group relative mb-15 flex aspect-square items-center justify-center overflow-hidden rounded-[24px] bg-button p-15 transition-all duration-200 hover:shadow-lg"
      :class="{ 'animate-pulse': !props.image }"
    >
      <img
        v-if="props.image"
        :src="props.image"
        :alt="props.name"
        class="pointer-events-none relative z-[1] block h-full select-none object-cover transition duration-200"
      />
      <span class="absolute bottom-20 left-20 z-[2] flex items-center">
        <CatalogCardBadge
          :is-new="props.isNew"
          :is-discount="props.isDiscount"
          :is-promotion-active="props.isPromotionActive"
          :is-visible="props.isLabelVisible"
        />
      </span>
      <NuxtLink
        :to="toLink"
        class="absolute inset-0 z-[3] block transition duration-500"
        :class="{ 'group-hover:bg-black/5': props.image }"
      ></NuxtLink>
    </div>
    <div class="mb-10" :title="props.name">
      <p
        class="mb-8 leading-none text-yellow text-semibold-16"
        :class="{ 'h-24 animate-pulse rounded-[5px] bg-gray': !isLoadedInner }"
      >
        {{ currentPrice }}
      </p>
      <h3
        class="font-inter leading-tight text-medium-16"
        :class="{ 'h-32 animate-pulse rounded-[5px] bg-gray': !isLoadedInner }"
      >
        <NuxtLink :to="toLink">{{ props.name }}</NuxtLink>
      </h3>
    </div>
    <div class="mt-auto flex flex-col">
      <div
        v-if="props.vendorCode"
        class="mb-15 font-inter leading-none text-dark opacity-60 text-medium-12"
      >
        {{ `Артикул ${props.vendorCode}` }}
      </div>
      <AppButton
        class="relative"
        :class="{ 'pointer-events-none invisible': !isLoadedInner }"
        :theme="'default'"
        :disabled="props.isLoading === true || props.isFinished === false"
        @click="onAddClick"
      >
        <template v-if="actionDisabled">
          <NuxtLink :to="toLink" class="absolute inset-0"></NuxtLink>
          <span>Подробнее</span>
        </template>
        <template v-else>
          <div
            v-if="props.isLoading === true"
            class="flex items-center justify-center"
          >
            <AppSpinner :size="18" class="!text-white" />
          </div>
          <template v-else>
            {{ props.isFinished === false ? 'Товар добавлен' : 'В корзину' }}
          </template>
        </template>
      </AppButton>
    </div>
  </article>
</template>
