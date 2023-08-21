<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="p-30 bg-white rounded-[24px] max-w-[500px] w-full"
  >
    <slot></slot>
    <h1 class="mb-24 text-extrabold-36">Заполните данные</h1>
    <button
      class="ml-auto mt-1 rounded-lg border px-2"
      @click="emit('confirm')"
    >
      Confirm
    </button>
  </VueFinalModal>
</template>

<style lang="scss"></style>
