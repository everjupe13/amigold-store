<script lang="ts" setup>
import { computed } from 'vue'

import AppCheckbox from '@/components/shared/AppCheckbox.vue'
import { CrossIcon, MinusIcon, PlusIcon } from '@/components/shared/icons'
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
    cost: string
    product: number
  }
  totalPrice: string
  isActive: boolean
}
const props = withDefaults(defineProps<ICartOrder>(), {
  amount: 0,
  totalPrice: formatRubles(0),
  isActive: true
})
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
  () => `${formatRubles(Number(props.price?.cost || 0))} за 1 шт`
)

const isActive = computed(() => props.isActive)

const incCount = () => {
  emit('incrementCount')
}

const decCount = () => {
  emit('decrementCount')
}

const onDeleteItem = () => {
  emit('deleteItem')
}
</script>

<template>
  <div class="relative rounded-[16px] border border-gray/20 p-20">
    <div
      class="relative flex items-stretch justify-between lg:flex-col lg:gap-y-20"
    >
      <div class="flex items-center gap-x-14 md:flex-col md:gap-y-10">
        <div
          class="flex h-[140px] w-[140px] items-center justify-center rounded-[10px] bg-[#EEEFEF] p-10 lg:h-[100px] lg:w-[100px] lg:flex-shrink-0"
        >
          <img
            :src="props.image"
            alt=""
            class="block h-full w-full object-cover"
          />
        </div>
        <div class="lg:pr-20">
          <p
            class="mb-10 text-extrabold-18 lg:leading-tight lg:text-extrabold-18"
          >
            {{ props.name }}
          </p>
          <div class="text-gray text-regular-18">
            {{ `${props.price?.textLabel}` }}
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between gap-x-20">
        <div class="flex items-center gap-x-12">
          <button
            class="group flex h-24 w-24 items-center justify-center rounded-full border-[2px] border-gray transition hover:border-green hover:bg-green disabled:cursor-default disabled:opacity-20"
            :disabled="props.amount === 1"
            @click="decCount"
          >
            <MinusIcon class="text-gray transition group-hover:text-white" />
          </button>
          <div class="min-w-30 leading-nonde font-inter text-bold-24">
            {{ props.amount }}
          </div>
          <button
            class="group flex h-24 w-24 items-center justify-center rounded-full border-[2px] border-gray transition hover:border-green hover:bg-green"
            @click="incCount"
          >
            <PlusIcon class="text-gray transition group-hover:text-white" />
          </button>
        </div>

        <div>
          <p
            class="whitespace-nowrap text-center leading-none text-green text-extrabold-18"
            :class="{ 'mb-5': props.amount > 1 }"
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

        <div class="grid h-full grid-rows-3 lg:grid-rows-1 lg:items-center">
          <button
            class="flex h-24 w-24 items-center justify-center self-start bg-transparent transition hover:bg-[#EEEFEF] lg:absolute lg:right-0 lg:top-0"
            @click="onDeleteItem"
          >
            <CrossIcon />
          </button>
          <AppCheckbox
            v-model="isActive"
            :value="String(props.id)"
            class="self-center"
            @change="e => emit('changeActive', e)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
