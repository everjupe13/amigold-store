<script setup lang="ts">
import { computed } from 'vue'

interface IAppButton {
  theme?: 'default' | 'alternative' | 'black'
  size?: 'sm' | 'md'
  rounded?: boolean
  outlined?: boolean
  fluid?: boolean
}

const props = withDefaults(defineProps<IAppButton>(), {
  theme: 'default',
  fluid: false,
  size: 'md'
})

const componentsClasses = computed(() => {
  const _size = {
    'py-10 px-20': props.size === 'sm',
    'py-16 px-20': props.size === 'md'
  }

  return [
    `app-btn_theme-${props.theme}`,
    _size,
    props.outlined ? 'app-btn_outlined' : '',
    { 'w-full': props.fluid }
  ]
})
</script>

<template>
  <button
    class="app-btn text-white transition text-bold-16"
    :class="componentsClasses"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
.app-btn {
  @apply flex items-center justify-center rounded-full border border-solid border-transparent leading-none active:translate-y-2;
  @apply disabled:opacity-50;

  &_theme-default {
    @apply border-green bg-green;
  }

  &_theme-black {
    @apply border-black bg-black;
  }

  &_theme-alternative {
    @apply bg-[#D9D9D9] text-[#202022];
  }

  &_outlined {
    @apply bg-transparent;

    &.app-btn_theme-default {
      @apply text-green hover:bg-green hover:text-white;
    }
    &.app-btn_theme-black {
      @apply text-black;
    }
  }
}
</style>
