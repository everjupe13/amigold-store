<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
  uuid: { type: Number as PropType<number>, required: true },
  name: { type: String as PropType<string>, required: true },
  isActive: { type: Boolean as PropType<boolean>, default: false }
})

const emit = defineEmits<{
  (event: 'choose', id: number): void
}>()

const onClick = () => {
  if (!props.isActive) {
    emit('choose', props.uuid)
  }
}
</script>

<template>
  <li
    :class="[
      'cursor-pointer select-none rounded-[14px] bg-transparent px-14 py-10 transition-all hover:bg-[#EEEFEF]/70',
      'tracking-none font-hnd text-[16px]',
      'mb-5 flex min-h-[40px] items-center justify-start last:mb-0',
      { '!bg-[#EEEFEF]': isActive }
    ]"
    @click="onClick"
  >
    {{ props.name }}
  </li>
</template>
