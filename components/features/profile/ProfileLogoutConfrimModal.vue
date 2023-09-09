<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const emits = defineEmits<{
  (e: 'confirm'): () => void
  (e: 'cancel'): () => void
}>()

const onConfirmClick = () => {
  emits('confirm')
}
const onCancelClick = () => {
  emits('cancel')
}
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="px-40 py-50 bg-white rounded-[24px] max-w-[600px] w-full md:px-20 md:py-50 md:rounded-[12px] md:mx-10"
  >
    <div>
      <div class="mb-40 md:mb-30">
        <h2
          class="md:md-15 mb-20 leading-none text-extrabold-36 md:text-extrabold-28"
        >
          Выйти
        </h2>
      </div>
      <div class="flex flex-col gap-x-20 gap-y-10">
        <AppButton
          class="h-65 w-full !rounded-[8px]"
          type="submit"
          theme="black"
          outlined
          @click="onCancelClick()"
        >
          Отменить
        </AppButton>
        <AppButton
          class="h-65 w-full !rounded-[8px]"
          type="submit"
          @click="onConfirmClick()"
        >
          Подтвердить
        </AppButton>
      </div>
    </div>
  </VueFinalModal>
</template>

<style lang="scss"></style>
