<script setup lang="ts">
interface IAppButton {
  theme?: 'default' | 'alternative' | 'black' | 'gray'
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
  @apply flex items-center justify-center rounded-full border-2 border-solid border-transparent font-inter leading-none active:translate-y-2;
  @apply disabled:opacity-50;

  &_theme-default {
    border-color: rgb(237 118 34) !important;
    background-color: rgb(237 118 34) !important;
  }

  &_theme-black {
    background-color: rgb(0 0 0) !important;
    border-color: rgb(0 0 0) !important;
  }

  &_theme-gray {
    border-color: rgb(226 227 227) !important;
    background-color: rgb(226 227 227) !important;
    color: rgb(0 0 0) !important;
  }

  &_theme-alternative {
    background-color: rgb(217 217 217) !important;
    color: rgb(32 32 34) !important;
  }

  &_outlined {
    background-color: transparent !important;

    &.app-btn_theme-default {
      color: rgb(237 118 34) !important;
      background-color: rgb(237 118 34) !important;
      color: rgb(255 255 255) !important;
    }
    &.app-btn_theme-black {
      color: rgb(0 0 0) !important;
    }
  }
}
</style>
