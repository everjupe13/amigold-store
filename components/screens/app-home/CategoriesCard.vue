<script lang="ts" setup>
type Props = {
  image?: string
  title?: string
  toLinkFn?: () => string
}
const props = withDefaults(defineProps<Props>(), {
  image: '',
  title: '',
  toLinkFn: () => ''
})
</script>

<template>
  <article
    class="group relative flex aspect-square flex-col gap-y-20 overflow-hidden rounded-[24px] bg-white p-20 md:aspect-auto md:h-[180px]"
    :class="{
      'animate-pulse !bg-[var(--skeleton-loader-bg,_rgb(238,239,239))]':
        !props.title || !props.image,
      'transition hover:bg-yellow': props.title || props.image
    }"
  >
    <NuxtLink
      :to="props.toLinkFn()"
      class="absolute inset-0 z-[2] block transition duration-500"
    ></NuxtLink>
    <div
      class="relative z-[1] mx-auto flex max-h-[150px] flex-shrink items-center justify-center p-10 md:max-h-[100px]"
    >
      <img
        v-if="props.image"
        :src="props.image"
        alt=""
        class="pointer-events-none relative z-[1] block h-full select-none object-contain transition duration-200 group-hover:scale-110"
      />
    </div>
    <div class="relative z-[1] mt-auto flex-shrink-0 flex-grow-0">
      <h3
        class="text-center leading-tight text-black transition text-bold-18 group-hover:text-white"
      >
        {{ props.title }}
      </h3>
    </div>
  </article>
</template>

<style lang="scss">
.article {
  --skeleton-loader-bg: rgb(238 239 239);
}
</style>
