<script lang="ts" setup>
useHead({
  title: 'Профиль'
})
</script>

<template>
  <section class="py-40">
    <AppContainer>
      <AppBreadcrumbs :crumbs="[{ label: 'Новости' }]"></AppBreadcrumbs>
    </AppContainer>
  </section>

  <section class="pb-100">
    <AppContainer>
      <h1 class="title mb-40 md:mb-30">Мой профиль</h1>
      <ProfileConfig></ProfileConfig>
    </AppContainer>
  </section>
</template>
