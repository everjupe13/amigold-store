<script lang="ts" setup>
import { MinusIcon, PlusIcon } from '@/components/shared/icons'

const props = withDefaults(
  defineProps<{
    amount: number
    isDisabled?: boolean
    disabledWhenCount?: number
    buttonClasses?: string
    wrapperClasses?: string
  }>(),
  {
    amount: 1,
    isDisabled: false,
    disabledWhenCount: 1,
    buttonClasses: '',
    wrapperClasses: ''
  }
)

const emits = defineEmits<{
  (e: 'increase'): () => void
  (e: 'decrease'): () => void
  (e: 'change'): () => void
}>()

const decreaseCount = () => {
  emits('decrease')
}

const increaseCount = () => {
  emits('increase')
}

const changeCount = () => {
  emits('change')
}

changeCount()
</script>

<template>
  <div class="flex items-center gap-x-12" :class="wrapperClasses">
    <button
      class="group flex h-24 w-24 items-center justify-center rounded-full border-[2px] border-gray transition disabled:cursor-default disabled:opacity-20"
      :disabled="
        (props.disabledWhenCount !== undefined &&
          props.amount === props.disabledWhenCount) ||
        isDisabled
      "
      :class="[
        props.buttonClasses
          ? props.buttonClasses
          : 'bg-green hover:border-green hover:bg-green'
      ]"
      @click="decreaseCount"
    >
      <MinusIcon class="text-gray transition group-hover:text-white" />
    </button>
    <div class="leading-nonde min-w-[20px] text-center font-inter text-bold-24">
      {{ props.amount }}
    </div>
    <button
      class="group flex h-24 w-24 items-center justify-center rounded-full border-[2px] border-gray transition disabled:cursor-default disabled:opacity-20"
      :disabled="isDisabled"
      :class="[
        props.buttonClasses
          ? props.buttonClasses
          : 'bg-green hover:border-green hover:bg-green'
      ]"
      @click="increaseCount"
    >
      <PlusIcon class="text-gray transition group-hover:text-white" />
    </button>
  </div>
</template>
