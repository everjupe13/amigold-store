<script lang="ts" setup>
import { computed } from 'vue'

// import AppCheckbox from '@/components/shared/AppCheckbox.vue'
import { CrossIcon } from '@/components/shared/icons'
import { formatRubles } from '@/utils/cost'

interface ICartOrder {
  id: number
  amount: number
  name: string
  image: string
  price: {
    id: number
    weight: string
    textLabel: string
    price: string
    product: number
  }
  totalPrice: string
  isActive: boolean
  slug: string
}
const props = withDefaults(
  defineProps<ICartOrder & { isDisabled?: boolean }>(),
  {
    amount: 0,
    totalPrice: formatRubles(0),
    isActive: true,
    isDisabled: false
  }
)
const emit = defineEmits([
  'incrementCount',
  'decrementCount',
  'deleteItem',
  'changeActive'
])

const totalPrice = computed<string>(() =>
  formatRubles(Number(props.totalPrice))
)
const priceForOne = computed<string>(
  () => `${formatRubles(Number(props.price?.price || 0))} за 1 шт`
)

// const isActive = computed(() => props.isActive)

const incCount = () => {
  emit('incrementCount')
}

const decCount = () => {
  emit('decrementCount')
}

const onDeleteItem = () => {
  emit('deleteItem')
}

const toLink = computed(() => `/product/${props.slug}`)
</script>

<template>
  <div
    class="relative rounded-[16px] border border-gray/20 p-20 md:p-0 md:pb-20"
  >
    <div
      class="relative flex items-stretch justify-between lg:gap-y-20 md:flex-col"
    >
      <div class="flex flex-grow items-center gap-x-14 md:gap-y-10 md:pr-20">
        <div
          class="group relative flex h-[140px] w-[140px] items-center justify-center rounded-[10px] bg-button-dark p-10 lg:h-[100px] lg:w-[100px] lg:flex-shrink-0"
        >
          <div
            class="relative z-[1] h-full w-full overflow-hidden rounded-[5px]"
          >
            <img
              :src="props.image"
              alt=""
              class="block h-full w-full object-cover transition-all group-hover:scale-110"
            />
          </div>

          <NuxtLink :to="toLink" class="absolute inset-0 z-[2]"></NuxtLink>
        </div>
        <div class="pr-20 lg:pr-0">
          <p class="text-[18px] font-extrabold lg:leading-tight md:text-[16px]">
            {{ props.name }}
          </p>
          <div class="text-[16px] text-black md:text-[14px]">
            {{ `${props.price?.textLabel}` }}
          </div>
        </div>
      </div>

      <div
        class="flex flex-shrink-0 flex-grow-0 items-center justify-between gap-x-5 md:flex-grow"
      >
        <div
          class="flex flex-col items-center justify-center gap-y-5 lg:pr-15 md:w-full md:flex-row md:justify-between"
        >
          <ProductCounter
            :amount="props.amount"
            :is-disabled="props.isDisabled"
            @decrease="decCount"
            @increase="incCount"
          />
          <div>
            <p
              class="whitespace-nowrap text-center leading-none text-green text-extrabold-18"
              :class="{ 'mb-2': props.amount > 1 }"
            >
              {{ totalPrice }}
            </p>
            <p
              v-if="props.amount > 1"
              class="whitespace-nowrap text-center leading-none text-bold-14"
            >
              {{ priceForOne }}
            </p>
          </div>
        </div>

        <div
          class="grid h-full grid-rows-1 lg:grid-rows-1 lg:items-center md:flex-grow-0"
        >
          <button
            class="flex h-24 w-24 items-center justify-center self-center justify-self-end bg-transparent transition hover:bg-[#EEEFEF] lg:absolute lg:right-0 lg:top-0"
            @click="onDeleteItem"
          >
            <CrossIcon />
          </button>
          <!-- <AppCheckbox
            v-model="isActive"
            :value="String(props.id)"
            class="self-center"
            @change="e => emit('changeActive', e)"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
