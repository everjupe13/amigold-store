<script lang="ts" setup>
import { formatRubles } from '@/utils/cost'

type PropsType = {
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
  isLoading?: boolean
  isFinished?: boolean
}

const props = withDefaults(defineProps<PropsType>(), {
  image: '',
  vendorCode: '',
  slug: undefined,
  name: '',
  prices: () => []
})

const emits = defineEmits<{
  (e: 'add-product'): () => {}
}>()

const onAddClick = () => {
  emits('add-product')
}

const toLink = computed(() => `/product/${props.slug}`)
const currentPrice = computed(() =>
  props.prices[0]?.price
    ? `от ${formatRubles(Number(props.prices[0]?.price))}`
    : ''
)

const isLoadedInner = computed<boolean>(() => !!props.slug && !!props.name)
</script>

<template>
  <article>
    <div
      class="group relative mb-15 flex aspect-square items-center justify-center overflow-hidden rounded-[24px] bg-button p-15"
      :class="{ 'animate-pulse': !props.image }"
    >
      <img
        v-if="props.image"
        :src="props.image"
        :alt="props.name"
        class="pointer-events-none relative z-[1] block h-full select-none object-cover transition duration-200 group-hover:scale-110"
      />
      <NuxtLink
        :to="toLink"
        class="absolute inset-0 z-[2] block transition duration-500"
        :class="{ 'group-hover:bg-black/5': props.image }"
      ></NuxtLink>
    </div>
    <div class="mb-15" :title="props.name">
      <p
        class="mb-8 leading-none text-yellow text-semibold-16"
        :class="{ 'h-24 animate-pulse rounded-[5px] bg-gray': !isLoadedInner }"
      >
        {{ currentPrice }}
      </p>
      <h3
        class="mb-8 font-inter leading-tight text-medium-16"
        :class="{ 'h-32 animate-pulse rounded-[5px] bg-gray': !isLoadedInner }"
      >
        <NuxtLink :to="toLink">{{ props.name }}</NuxtLink>
      </h3>
      <div
        v-if="props.vendorCode"
        class="mb-8 font-inter leading-none text-dark opacity-60 text-medium-12"
      >
        {{ `Артикул ${props.vendorCode}` }}
      </div>
    </div>
    <div class="flex flex-col">
      <AppButton
        :class="{ 'pointer-events-none invisible': !isLoadedInner }"
        :theme="'default'"
        :disabled="props.isLoading === true || props.isFinished === false"
        @click="onAddClick"
      >
        <div
          v-if="props.isLoading === true"
          class="flex items-center justify-center"
        >
          <AppSpinner :size="18" class="!text-white" />
        </div>
        <template v-else>
          {{ props.isFinished === false ? 'Товар добавлен' : 'В корзину' }}
        </template>
      </AppButton>
    </div>
  </article>
</template>
