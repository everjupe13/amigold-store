<script setup lang="ts">
import OrderConfirmSuccess from './OrderConfirmSuccess.vue'
import OrderConfirmUserForm from './OrderConfirmUserForm.vue'

const SCREENS = [
  {
    key: 'user-form',
    component: OrderConfirmUserForm
  },
  {
    key: 'success',
    component: OrderConfirmSuccess
  }
]
const currentScreen = ref(SCREENS[1].key)
const currentContent = computed(
  () =>
    SCREENS.find(screen => screen.key === currentScreen.value)?.component ||
    SCREENS[0].component
)

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const onCloseScreen = (key: string) => {
  const currentScreenIndex = SCREENS.findIndex(screen => screen.key === key)

  if (currentScreenIndex < 0) {
    return
  }

  if (currentScreenIndex + 1 < SCREENS.length) {
    currentScreen.value = SCREENS[currentScreenIndex + 1].key
  } else {
    emit('confirm')
  }
}
</script>

<template>
  <component :is="currentContent" @close="onCloseScreen"></component>
</template>

<style lang="scss"></style>
