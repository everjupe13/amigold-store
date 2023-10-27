<!-- eslint-disable import/no-named-as-default-member -->
<script setup lang="ts">
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'

type Props = {
  image?: string
  date?: string
  title?: string
  textBody?: string
  toLinkFn?: () => string
}
const props = withDefaults(defineProps<Props>(), {
  image: '',
  date: new Date().toISOString(),
  toLinkFn: () => '',
  title: '',
  textBody: ''
})

dayjs.locale(ru)
dayjs.extend(localizedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)

const dateStamp = dayjs(props.date).format('D MMMM, YYYY')

const isSkeletonLoaderVisible = computed(
  () => !props.image && !props.title && !props.textBody
)
</script>

<template>
  <article class="article">
    <div
      class="group relative mb-10 flex h-[320px] items-center justify-center overflow-hidden rounded-[24px] bg-[var(--skeleton-loader-bg,_rgb(238,239,239))] transition-all duration-200 hover:shadow-2xl"
      :class="{ 'animate-pulse': !props.image }"
    >
      <img
        v-if="props.image"
        :src="props.image"
        alt=""
        class="pointer-events-none relative z-[1] block h-full w-full select-none object-cover transition duration-200"
      />
      <NuxtLink
        :to="props.toLinkFn()"
        class="absolute inset-0 z-[2] block transition duration-500"
        :class="{ 'group-hover:bg-black/20': props.image }"
      ></NuxtLink>
    </div>
    <div>
      <div
        class="mb-8 font-inter text-dark opacity-60 text-bold-14"
        :class="{ 'pointer-events-none !opacity-0': isSkeletonLoaderVisible }"
      >
        {{ dateStamp }}
      </div>
      <h3
        class="mb-5 text-extrabold-24"
        :class="{
          '!mb-10 h-32 animate-pulse rounded-[5px] bg-[var(--skeleton-loader-bg,_rgb(238,239,239))] leading-[1.1]':
            isSkeletonLoaderVisible
        }"
      >
        <NuxtLink :to="props.toLinkFn()" class="">{{ props.title }}</NuxtLink>
      </h3>
      <p
        class="font-inter text-dark text-medium-16"
        :class="{
          'h-48 animate-pulse rounded-[5px] bg-[var(--skeleton-loader-bg,_rgb(238,239,239))]':
            isSkeletonLoaderVisible
        }"
      >
        {{ props.textBody }}
      </p>
    </div>
  </article>
</template>

<style lang="scss">
.article {
  --skeleton-loader-bg: rgb(238 239 239);
}
</style>
