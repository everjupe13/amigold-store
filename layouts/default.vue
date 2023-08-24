<script lang="ts" setup>
import { ModalsContainer, useModal } from 'vue-final-modal'

import SigninModal from '@/components/widgets/SigninModal.vue'
import { useAuthStore } from '@/store/auth/useAuthStore'

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

  const route = useRoute()
  const authStore = useAuthStore()
  await authStore.setSavedToken()
  const isLoaded = ref(false)

  const deleteAuthFromQuery = () => {
    const domainUrl = new URL(window.location.href)
    domainUrl.searchParams.delete('signin-form')
    navigateTo(domainUrl.pathname + domainUrl.search)
  }

  const authModal = useModal({
    component: SigninModal,
    attrs: {
      onConfirm() {
        authModal.close()
      },
      onClosed() {
        deleteAuthFromQuery()
      }
    }
  })

  watch(
    () => route.query,
    () => {
      if (!isLoaded.value) {
        return
      }

      if (route.query instanceof Object && route.query['signin-form']) {
        if (authStore.isAuth) {
          return deleteAuthFromQuery()
        }

        try {
          const isOpen = JSON.parse(
            (route.query['signin-form'] as string) || 'false'
          )

          if (isOpen && !authStore.isAuth) {
            authModal.open()
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    { deep: true }
  )

  onMounted(() => {
    isLoaded.value = true
    nextTick(() => {
      if (route.query instanceof Object && route.query['signin-form']) {
        if (authStore.isAuth) {
          return deleteAuthFromQuery()
        }

        try {
          const isOpen = JSON.parse(
            (route.query['signin-form'] as string) || 'false'
          )

          if (isOpen && !authStore.isAuth) {
            authModal.open()
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  })

  const openAuthModal = () => {
    const domainUrl = new URL(window.location.href)
    domainUrl.searchParams.set('signin-form', 'true')
    navigateTo(domainUrl.pathname + domainUrl.search)
  }

  provide('openAuth', openAuthModal)
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
