<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { RouterLinkProps } from 'vue-router'

interface IAppLogo {
  toLink?: RouterLinkProps['to']
  height?: number
  width?: number
}

const props = withDefaults(defineProps<IAppLogo>(), {
  toLink: '/'
})
</script>

<template>
  <div>
    <div class="flex items-center">
      <router-link :to="props.toLink" class="flex items-center">
        <img
          src="@/assets/img/logo.png"
          alt=""
          :height="props.height"
          :width="props.width"
          class="pointer-events-none"
          :class="[
            props.height ? `h-[${props.height}px]` : 'h-56',
            props.width ? `w-[${props.width}px]` : ''
          ]"
        />
      </router-link>
    </div>
  </div>
</template>
