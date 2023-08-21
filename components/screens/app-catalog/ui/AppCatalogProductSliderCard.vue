<script lang="ts" setup>
import { computed, type Ref } from 'vue'
import { type RouteLocationRaw, useRoute } from 'vue-router'

// import { ForwardLinkArrowIcon } from '@/components/shared/icons'

interface IProductSliderCard {
  productName: string
  image: string
  productId: number
}

const route = useRoute()
const props = withDefaults(defineProps<IProductSliderCard>(), {
  productName: ''
})
const linkToProduct: Ref<RouteLocationRaw> = computed(() => ({
  name: 'product',
  params: {
    dropSlug: route.params.dropSlug,
    dropId: props.productId
  }
}))
</script>

<template>
  <div class="group w-full max-w-[460px]">
    <div
      class="mb-40 block aspect-square max-w-[460px] overflow-hidden opacity-10 transition-all group-hover:opacity-100"
    >
      <router-link :to="linkToProduct" class="relative block h-auto w-full">
        <img
          :src="image"
          class="z-1 relative block w-full select-none object-fill"
        />
      </router-link>
    </div>
    <RouterLink
      :to="linkToProduct"
      class="flex cursor-pointer items-center justify-between gap-x-10 border-b-2 border-solid border-b-white/20 pb-20 transition-all group-hover:border-b-white"
    >
      <div
        class="font-hnd select-none text-[36px] font-bold uppercase leading-none tracking-[0.64px] text-white"
      >
        {{ props.productName }}
      </div>
      <div class="flex-shrink-0 flex-grow-0">
        <ForwardLinkArrowIcon
          width="36"
          height="36"
          class="opacity-20 transition-all group-hover:opacity-100"
        />
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.heading {
  font-size: 64px;
  letter-spacing: 2.56px;

  @apply font-extrabold uppercase leading-none;

  @media (max-width: 767px) {
    font-size: 48px;
  }
}
</style>
