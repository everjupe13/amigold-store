<script lang="ts" setup>
import AppCard from '@/components/shared/AppCard.vue'
import { INews } from '@/store/blog/blog.types'

const props = defineProps<INews>()
const componentProps = computed(() => ({
  image: props.image,
  date: props.createdAt,
  title: props.name,
  textBody: props.shortDescription
}))

const toLinkFn = () => `/news/${props.slug}`
</script>

<template>
  <AppCard v-bind="{ ...componentProps, toLinkFn }" />
</template>

<style lang="scss" scoped></style>
