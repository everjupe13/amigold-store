<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  vendorCode: {
    type: String,
    default: 'Артикул 561326771'
  },
  toLink: {
    type: [String],
    default: ''
  }
})
</script>

<template>
  <article>
    <div
      class="group relative mb-15 flex aspect-square items-center justify-center overflow-hidden rounded-[24px] bg-gray p-15"
      :class="{ 'animate-pulse': !props.image }"
    >
      <img
        v-if="props.image"
        :src="props.image"
        alt=""
        class="pointer-events-none relative z-[1] block h-full select-none object-cover transition duration-200 group-hover:scale-110"
      />
      <NuxtLink
        :to="props.toLink"
        class="absolute inset-0 z-[2] block transition duration-500"
        :class="{ 'group-hover:bg-black/5': props.image }"
      ></NuxtLink>
    </div>
    <div class="mb-15">
      <p class="font-bold-16 mb-8 leading-none text-yellow">от 300 ₽</p>
      <h3 class="mb-8 font-inter leading-tight text-medium-16">
        <NuxtLink :to="props.toLink">Royal Canin - Mini Puppy</NuxtLink>
      </h3>
      <div
        class="mb-8 font-inter leading-none text-dark opacity-60 text-medium-12"
      >
        {{ props.vendorCode }}
      </div>
    </div>
  </article>
</template>
