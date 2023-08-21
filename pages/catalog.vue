<script lang="ts" setup>
const cardData = [
  {
    id: 0,
    image: '/images/product/image1.png',
    date: new Date().toISOString(),
    toLinkFn: (id: string | number = 0) => `/product/${id}`
  },
  {
    id: 1,
    image: '/images/product/image1.png',
    date: new Date().toISOString(),
    toLinkFn: (id: string | number = 0) => `/product/${id}`
  },
  {
    id: 2,
    image: '/images/product/image1.png',
    date: new Date().toISOString(),
    toLinkFn: (id: string | number = 0) => `/product/${id}`
  },
  {
    id: 3,
    image: '/images/product/image1.png',
    date: new Date().toISOString(),
    toLinkFn: (id: string | number = 0) => `/product/${id}`
  },
  {
    id: 4,
    image: '/images/product/image1.png',
    date: new Date().toISOString(),
    toLinkFn: (id: string | number = 0) => `/product/${id}`
  },
  {
    id: 5,
    image: '/images/product/image1.png',
    date: new Date().toISOString(),
    toLinkFn: (id: string | number = 0) => `/product/${id}`
  },
  {
    id: 6,
    image: '/images/product/image1.png',
    date: new Date().toISOString(),
    toLinkFn: (id: string | number = 0) => `/product/${id}`
  },
  {
    id: 7,
    image: '/images/product/image1.png',
    date: new Date().toISOString(),
    toLinkFn: (id: string | number = 0) => `/product/${id}`
  },
  {
    id: 8,
    image: '/images/product/image1.png',
    date: new Date().toISOString(),
    toLinkFn: (id: string | number = 0) => `/product/${id}`
  },
  {
    id: 9,
    image: '/images/product/image1.png',
    date: new Date().toISOString(),
    toLinkFn: (id: string | number = 0) => `/product/${id}`
  },
  {
    id: 10,
    image: '/images/product/image1.png',
    date: new Date().toISOString(),
    toLinkFn: (id: string | number = 0) => `/product/${id}`
  }
]
</script>

<template>
  <section class="py-40">
    <AppContainer>
      <AppBreadcrumbs
        :crumbs="[{ label: 'Корма для животных' }]"
      ></AppBreadcrumbs>
    </AppContainer>
  </section>

  <section class="pb-100">
    <AppContainer>
      <div class="mb-20 grid grid-cols-3">
        <h1 class="title">Каталог</h1>
        <div class="flex items-center justify-center gap-10">
          <button
            class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-black px-20 py-16 leading-none text-white transition text-bold-16"
          >
            Собакам
          </button>
          <button
            class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16"
          >
            Кошкам
          </button>
          <button
            class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16"
          >
            Попугаем
          </button>
        </div>
        <div class="self-center justify-self-end"></div>
      </div>
      <div class="grid grid-cols-5 gap-x-20 gap-y-60">
        <AppProductCard
          v-for="card in cardData"
          :key="card.id"
          v-bind="{ ...card, toLink: `/product/${card.id}` }"
        ></AppProductCard>
        <AppProductCard></AppProductCard>
      </div>
    </AppContainer>
  </section>
</template>
