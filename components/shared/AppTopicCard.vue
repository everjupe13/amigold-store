<script lang="ts" setup>
type Props = {
  image?: string
  readTime?: string
  title?: string
  textBody?: string
  articleLabel?: string
  slug: string
}
const props = withDefaults(defineProps<Props>(), {
  image: '',
  readTime: '5 минут',
  slug: '',
  title: '',
  textBody: '',
  articleLabel: ''
})

const toLink = computed(() => `/topic/${props.slug}`)
</script>

<template>
  <article>
    <div
      class="group relative mb-10 flex h-[320px] items-center justify-center overflow-hidden rounded-[24px] bg-gray"
      :class="{ 'animate-pulse': !props.image }"
    >
      <img
        v-if="props.image"
        :src="props.image"
        alt=""
        class="pointer-events-none relative z-[1] block h-full w-full select-none object-cover transition duration-200 group-hover:scale-110"
      />
      <p
        v-if="props.articleLabel"
        class="absolute left-30 top-30 z-[3] rounded-full bg-yellow px-14 py-10 leading-none text-white text-extrabold-16"
      >
        {{ props.articleLabel }}
      </p>
      <NuxtLink
        :to="toLink"
        class="absolute inset-0 z-[2] block transition duration-500"
        :class="{ 'group-hover:bg-black/20': props.image }"
      ></NuxtLink>
    </div>
    <div>
      <div
        class="mb-8 flex items-center gap-x-4 font-inter text-dark opacity-60 text-bold-14"
        :class="[
          { 'pointer-events-none !opacity-0': !props.title },
          { 'h-21': !props.readTime }
        ]"
      >
        <template v-if="props.readTime">
          <span class="inline-flex h-18 w-18">
            <BlogReadTimeIcon />
          </span>
          <span>
            {{ props.readTime }}
          </span>
        </template>
      </div>
      <h3
        :class="[
          'mb-5 text-extrabold-24',
          { '!mb-10 h-32 animate-pulse rounded-[5px] bg-gray': !props.title }
        ]"
      >
        <NuxtLink :to="toLink">{{ props.title }}</NuxtLink>
      </h3>
      <p
        :class="[
          'font-inter text-dark text-medium-16',
          { 'h-48 animate-pulse rounded-[5px] bg-gray': !props.textBody }
        ]"
      >
        {{ props.textBody }}
      </p>
    </div>
  </article>
</template>
