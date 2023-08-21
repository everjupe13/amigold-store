<script lang="ts" setup>
type Props = {
  image?: string
  title?: string
  textBody?: string
}
const props = withDefaults(defineProps<Props>(), {
  image: '',
  title: '',
  textBody: ''
})
</script>

<template>
  <article class="rounded-[24px] border-2 border-gray px-24 py-40">
    <div
      class="mx-auto mb-24 flex h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-[50px] bg-[#F7F4EE] p-10"
      :class="{ 'animate-pulse bg-gray': !props.image }"
    >
      <img
        v-if="props.image"
        :src="props.image"
        alt=""
        class="pointer-events-none relative z-[1] block h-full w-full select-none object-cover transition duration-200 group-hover:scale-110"
      />
    </div>
    <div>
      <h3
        :class="[
          'mb-10 text-center text-extrabold-24',
          { '!mb-10 h-32 animate-pulse rounded-[5px] bg-gray': !props.title }
        ]"
      >
        {{ props.title }}
      </h3>
      <p
        :class="[
          'text-center font-inter text-dark text-medium-16',
          { 'h-48 animate-pulse rounded-[5px] bg-gray': !props.textBody }
        ]"
      >
        {{ props.textBody }}
      </p>
    </div>
  </article>
</template>
