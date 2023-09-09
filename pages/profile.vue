<script lang="ts" setup>
import { useModal } from 'vue-final-modal'

import ProfileLogoutConfrimModal from '@/components/features/profile/ProfileLogoutConfrimModal.vue'
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

const { open: openLogout, close: closeLogout } = useModal({
  component: ProfileLogoutConfrimModal,
  attrs: {
    onCancel() {
      closeLogout()
    },
    async onConfirm() {
      await userStore.forget()
      navigateTo('/?auth-action-form=signin')
    }
  }
})
</script>

<template>
  <section class="py-40 md:pt-0">
    <AppContainer>
      <div
        class="flex items-center justify-between md:flex-col-reverse md:items-start md:justify-start"
      >
        <div>
          <AppBreadcrumbs :crumbs="[{ label: 'Новости' }]"></AppBreadcrumbs>
        </div>
        <div class="md:mb-10 md:ml-auto">
          <AppButton size="sm" class="!rounded-[8px]" @click="openLogout">
            Выйти
          </AppButton>
        </div>
      </div>
    </AppContainer>
  </section>

  <section class="pb-100">
    <AppContainer v-if="!isLoading">
      <h1 class="title mb-40 md:mb-30">Мой профиль</h1>
      <ProfileConfig></ProfileConfig>
    </AppContainer>
  </section>
</template>
