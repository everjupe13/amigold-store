<script lang="ts" setup>
const cardData = {
  image: '/images/news/img_plug.jpg',
  date: new Date().toISOString(),
  toLinkFn: (id: string | number = 0) => `/news/${id}`
}
</script>

<template>
  <section class="py-40">
    <AppContainer>
      <AppBreadcrumbs :crumbs="[{ label: 'Новости' }]"></AppBreadcrumbs>
    </AppContainer>
  </section>

  <section class="pb-100">
    <AppContainer>
      <div class="mb-20 grid grid-cols-3">
        <h1 class="title">Новости</h1>
        <div class="flex items-center justify-center gap-10">
          <button
            class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-black px-20 py-16 leading-none text-white transition text-bold-16"
          >
            Собаки
          </button>
          <button
            class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16"
          >
            Кошки
          </button>
          <button
            class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16"
          >
            Попугаи
          </button>
        </div>
        <div class="self-center justify-self-end"></div>
      </div>
      <div class="grid grid-cols-3 gap-x-20 gap-y-60">
        <AppCard v-bind="cardData"></AppCard>
        <AppCard v-bind="cardData"></AppCard>
        <AppCard v-bind="cardData"></AppCard>
        <AppCard v-bind="cardData"></AppCard>
        <AppCard v-bind="cardData"></AppCard>
        <AppCard v-bind="cardData"></AppCard>
      </div>
    </AppContainer>
  </section>
</template>
