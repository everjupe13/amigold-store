<script lang="ts" setup>
import { ModalsContainer, useModal } from 'vue-final-modal'

import SigninModal from '@/components/widgets/SigninModal.vue'
import SignupModal from '@/components/widgets/SignupModal.vue'
import { useUserStore } from '@/store/user/useUserStore'

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
  const userStore = useUserStore()

  onMounted(async () => await userStore.initializeUser())
  const isLoaded = ref(false)

  const deleteAuthFromQuery = async () => {
    if (authModal.options.modalValue || signupModal.options.modalValue) {
      console.log(
        authModal.options.modalValue || signupModal.options.modalValue
      )
      return
    }

    const domainUrl = new URL(window.location.href)
    domainUrl.searchParams.delete('auth-action-form')
    await navigateTo(domainUrl.pathname + domainUrl.search)
  }

  const authModal = useModal({
    component: SigninModal,
    attrs: {
      async onConfirm() {
        await authModal.close()
        await navigateTo('/catalog')
      },
      async onClose() {
        await authModal.close()
      },
      async onClosed() {
        await deleteAuthFromQuery()
      }
    }
  })

  const signupModal = useModal({
    component: SignupModal,
    attrs: {
      onConfirm() {
        signupModal.close()
      },
      async onClosed() {
        await deleteAuthFromQuery()
      }
    }
  })

  watch(
    () => route.query,
    newQuery => {
      if (!isLoaded.value) {
        return
      }

      if (newQuery instanceof Object && newQuery['auth-action-form']) {
        if (userStore.isAuth) {
          return deleteAuthFromQuery()
        }

        const action = newQuery['auth-action-form'] as string
        if (action === 'signin') {
          nextTick(() => {
            authModal.open()
          })
          return
        }
        if (action === 'signup') {
          nextTick(() => {
            signupModal.open()
          })
        }
      }
    },
    { deep: true }
  )

  onMounted(() => {
    isLoaded.value = true
    if (route.query instanceof Object && route.query['auth-action-form']) {
      if (userStore.isAuth) {
        return deleteAuthFromQuery()
      }

      const action = route.query['auth-action-form'] as string
      if (action === 'signin') {
        nextTick(() => {
          authModal.open()
        })
        return
      }
      if (action === 'signup') {
        nextTick(() => {
          signupModal.open()
        })
      }
    }
  })

  const openAuthModal = async () => {
    const domainUrl = new URL(window.location.href)
    domainUrl.searchParams.set('auth-action-form', 'signin')
    await navigateTo(domainUrl.pathname + domainUrl.search)
  }

  const openSignupModal = async () => {
    const domainUrl = new URL(window.location.href)
    domainUrl.searchParams.set('auth-action-form', 'signup')
    await navigateTo(domainUrl.pathname + domainUrl.search)
  }

  provide('openAuth', openAuthModal)
  provide('openSignup', openSignupModal)
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
