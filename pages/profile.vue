<script lang="ts" setup>
import { useUserStore } from '@/store/user/useUserStore'

useHead({
  title: 'Профиль'
})

const userStore = useUserStore()
const isLoading = ref(true)
onMounted(() => {
  if (!userStore.isAuth) {
    return navigateTo('/?auth-action-form=signin')
  }

  isLoading.value = false
})

watch(
  () => userStore.isAuth,
  () => {
    if (!userStore.isAuth) {
      navigateTo('/?auth-action-form=signin')
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
