<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { CheckIcon } from '@/components/shared/icons'

interface IAppCheckbox {
  modelValue?: any
  trueValue?: boolean
  falseValue?: boolean
  label?: string
  value?: string
}
const props = withDefaults(defineProps<IAppCheckbox>(), {
  trueValue: true,
  falseValue: false,
  modelValue: '',
  value: undefined,
  label: undefined
})
const emit = defineEmits(['change', 'update:modelValue'])

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }

  return props.modelValue === props.trueValue
})

const updateInput = (event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked
  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue]

    if (isChecked) {
      newValue.push(props.value)
    } else {
      newValue.splice(newValue.indexOf(props.value), 1)
    }

    emit('update:modelValue', newValue)
  } else {
    emit('change', isChecked ? props.trueValue : props.falseValue)
  }
}
</script>

<template>
  <label class="group relative flex select-none items-center gap-x-10">
    <span v-if="label" class="leading-none text-black text-bold-14">
      {{ label }}
    </span>
    <input
      class="peer absolute h-0 w-0 cursor-pointer opacity-0"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
    />
    <span
      class="bg-button-dark flex h-24 w-24 items-center justify-center rounded-[8px] border-2 border-[#E2E3E3] transition group-hover:border-yellow group-hover:bg-transparent peer-checked:border-yellow peer-checked:bg-yellow"
    >
      <CheckIcon
        class="opacity-0 transition group-hover:fill-yellow group-hover:opacity-100"
        :class="{ 'fill-white opacity-100 group-hover:fill-white': isChecked }"
      />
    </span>
  </label>
</template>

<style lang="scss" scoped></style>
