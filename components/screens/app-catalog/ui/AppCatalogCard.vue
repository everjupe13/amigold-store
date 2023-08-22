<script lang="ts" setup>
import { ICatalogProducts } from '@/store/catalog/catalog.types'

const props = defineProps<ICatalogProducts>()
</script>

<template>
  <div class="rounded-[24px] bg-white p-40 md:p-25">
    <div class="mb-24 flex h-[330px] items-center justify-center">
      <RouterLink
        :to="`/product/${props.slug}`"
        class="flex h-full w-full items-center justify-center"
      >
        <img
          :src="props.image"
          :alt="props.name"
          class="block max-h-full max-w-full select-none object-fill"
        />
      </RouterLink>
    </div>
    <div>
      <p class="mb-24 text-black text-regular-20">
        {{ props.name }}
      </p>
      <div class="flex items-center gap-x-10">
        <RouterLink
          :to="`/product/${props.slug}`"
          class="flex h-max w-max flex-grow items-center"
        >
          <AppButton theme="default" outlined class="flex-grow" @click.stop>
            Подробнее
          </AppButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
