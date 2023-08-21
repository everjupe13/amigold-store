<script lang="ts" setup>
import { RouterLink } from 'vue-router'

import { RouteNamesEnum } from '@/router/router.types'
</script>

<template>
  <div class="grid min-h-full place-items-center text-center">
    <p class="text-[18px] font-semibold">404</p>
    <h1 class="mb-20 text-[48px] font-bold">Страница не найдена</h1>
    <RouterLink
      :to="{ name: RouteNamesEnum.home }"
      class="font-hnd text-[22px] font-bold uppercase underline underline-offset-[3px] transition-all hover:underline-offset-[6px] active:underline-offset-[6px]"
    >
      <span aria-hidden="true">&larr;</span>
      На главную
    </RouterLink>
  </div>
</template>
