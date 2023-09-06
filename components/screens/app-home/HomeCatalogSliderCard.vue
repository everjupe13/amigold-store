<script setup lang="ts">
import { formatRubles } from '@/utils/cost'

type Props = {
  image?: string
  prices?: {
    id: number
    weight: string
    textLabel: string
    cost: string
    product: number
  }[]
  name?: string
  slug?: string
  vendorCode?: string
}
const props = withDefaults(defineProps<Props>(), {
  image: '',
  vendorCode: '',
  prices: () => [],
  name: '',
  slug: undefined
})

const toLink = computed(() => `/product/${props.slug}`)
const currentPrice = computed(() =>
  props.prices[0]?.cost
    ? `от ${formatRubles(Number(props.prices[0]?.cost))}`
    : ''
)

const isLoaded = computed<boolean>(() => !!props.slug && !!props.name)
</script>

<template>
  <article>
    <div
      class="group relative mb-15 flex aspect-square items-center justify-center overflow-hidden rounded-[24px] bg-gray p-15"
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
        :class="{ 'h-24 animate-pulse rounded-[5px] bg-gray': !isLoaded }"
      >
        {{ currentPrice }}
      </p>
      <h3
        class="mb-8 font-inter leading-tight text-medium-16"
        :class="{
          'h-32 animate-pulse rounded-[5px] bg-gray': !isLoaded
        }"
      >
        <NuxtLink :to="toLink">{{ props.name }}</NuxtLink>
      </h3>
      <div
        v-if="props.vendorCode"
        class="mb-8 font-inter leading-none text-dark opacity-60 text-medium-12"
      >
        Артикул: {{ props.vendorCode }}
      </div>
    </div>
  </article>
</template>
