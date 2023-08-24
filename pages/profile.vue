<script lang="ts" setup>
import { useAuthStore } from '@/store/auth/useAuthStore'

useHead({
  title: 'Профиль'
})

const authStore = useAuthStore()
const isLoading = ref(true)
onMounted(async () => {
  await authStore.setSavedToken()

  if (!authStore.isAuth) {
    return navigateTo('/?signin-form=true')
  }

  isLoading.value = false
})

watch(
  () => authStore.isAuth,
  () => {
    if (!authStore.isAuth) {
      navigateTo('/?signin-form=true')
    }
  }
)
</script>

<template>
  <section class="py-40">
    <AppContainer>
      <AppBreadcrumbs :crumbs="[{ label: 'Новости' }]"></AppBreadcrumbs>
    </AppContainer>
  </section>

  <section class="pb-100">
    <AppContainer v-if="!isLoading">
      <h1 class="title mb-40 md:mb-30">Мой профиль</h1>
      <ProfileConfig></ProfileConfig>
    </AppContainer>
  </section>
</template>
