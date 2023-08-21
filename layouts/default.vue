<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal'

if (process.client) {
  const appWidth = ref(window.innerWidth)
  // eslint-disable-next-line no-inner-declarations
  function setSizing() {
    appWidth.value = window.innerWidth
  }

  const isMdScreen = computed(() => appWidth.value < 768)
  const isLgScreen = computed(() => appWidth.value > 992)

  provide('isMdScreen', isMdScreen)
  provide('isLgScreen', isLgScreen)

  onMounted(() => {
    window.addEventListener('resize', setSizing, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', setSizing)
  })
}
</script>

<template>
  <AppHeader />
  <main class="main-section-layout">
    <slot></slot>
  </main>
  <AppFooter />
  <ModalsContainer />
  <div class="app-modal">
    <div class="app-modal-content"></div>
  </div>
</template>
