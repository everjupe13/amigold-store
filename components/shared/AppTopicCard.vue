<script lang="ts" setup>
type Props = {
  image?: string
  afterImageLabel?: string
  title?: string
  textBody?: string
  articleLabel?: string
  toLinkFn?: () => string
}
const props = withDefaults(defineProps<Props>(), {
  image: '',
  afterImageLabel: '5 минут',
  toLinkFn: () => '',
  title: '',
  textBody: '',
  articleLabel: ''
})
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
        :to="props.toLinkFn()"
        class="absolute inset-0 z-[2] block transition duration-500"
        :class="{ 'group-hover:bg-black/20': props.image }"
      ></NuxtLink>
    </div>
    <div>
      <div
        v-if="props.afterImageLabel"
        class="mb-8 flex items-center gap-x-4 font-inter text-dark opacity-60 text-bold-14"
        :class="{ 'pointer-events-none !opacity-0': !props.title }"
      >
        <span class="inline-flex h-18 w-18">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <g clip-path="url(#clip0_75_326)">
              <path
                d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                stroke="#8C8C91"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 4.5V9L12 10.5"
                stroke="#8C8C91"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_75_326">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        <span>
          {{ props.afterImageLabel }}
        </span>
      </div>
      <h3
        :class="[
          'mb-5 text-extrabold-24',
          { '!mb-10 h-32 animate-pulse rounded-[5px] bg-gray': !props.title }
        ]"
      >
        <NuxtLink :to="props.toLinkFn()">{{ props.title }}</NuxtLink>
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
