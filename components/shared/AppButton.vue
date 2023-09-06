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
    @apply border-yellow bg-yellow !important;
  }

  &_theme-black {
    @apply border-black bg-black !important;
  }

  &_theme-gray {
    @apply border-button-dark bg-button-dark text-black !important;
  }

  &_theme-alternative {
    @apply bg-[#D9D9D9] text-[#202022] !important;
  }

  &_outlined {
    @apply bg-transparent !important;

    &.app-btn_theme-default {
      @apply text-yellow hover:bg-yellow hover:text-white !important;
    }
    &.app-btn_theme-black {
      @apply text-black !important;
    }
  }
}
</style>
