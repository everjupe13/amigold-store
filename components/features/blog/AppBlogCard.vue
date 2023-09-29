<script lang="ts" setup>
import AppCard from '@/components/shared/AppCard.vue'
import { INews } from '@/store/blog/blog.types'

type Props = Partial<INews>

const props = defineProps<Props>()
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
