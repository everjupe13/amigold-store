<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close', key: string): void
}>()

const onCloseModal = () => {
  emit('close', 'success')
}
</script>

<template>
  <div>
    <div class="mb-40 leading-tight text-extrabold-32">
      Спасибо за оформление заказа!
    </div>
    <div class="mb-20 leading-tight text-medium-20">
      С вами свяжется наш менеджер для уточнения заказа, после чего вы сможете
      произвести оплату!
    </div>
    <div class="leading-tight text-regular-16">
      Мы работаем с 8 до 17 часов, поэтому если вы оформите заказ позднее - мы
      свяжемся с вами на следующий день после 10 часов! :)
    </div>
    <AppButton
      theme="default"
      class="mt-30 h-55 w-full !rounded-[5px]"
      type="submit"
      @click="onCloseModal"
    >
      Закрыть
    </AppButton>
  </div>
</template>

<style lang="scss"></style>
