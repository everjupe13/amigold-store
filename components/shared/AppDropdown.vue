<script lang="ts" setup>
import { reactive } from 'vue'

import AppCollapse from '@/components/shared/AppCollapse.vue'

interface IAppDropdown {
  dropdownData: {
    label: string
    body: string
    opened: boolean
  }[]
}
const props = defineProps<IAppDropdown>()

const dropdownData = reactive(props.dropdownData)
const handleDropitemClick = (index: number) => {
  dropdownData.forEach((state, idx) => {
    state.opened = !state.opened

    if (idx !== index && state.opened) {
      state.opened = false
    }
  })
}
</script>

<template>
  <div class="dropdown">
    <div v-for="(state, idx) in dropdownData" :key="idx" class="dropdown__item">
      <div
        class="dropdown__label flex cursor-pointer items-center justify-between gap-x-10 py-18 md:py-28"
        @click="() => handleDropitemClick(idx)"
      >
        <h4
          class="dropdown__label-text grow-1 font-medium"
          v-html="state.label"
        ></h4>
        <div
          class="dropdown__label-badge grow-0"
          :class="{ '--active': state.opened }"
        ></div>
      </div>
      <AppCollapse v-model="state.opened">
        <div class="dropdown__body p-x-28">
          <p class="dropdown__body-text" v-html="state.body"></p>
        </div>
      </AppCollapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  &__item {
    border-top: 1px solid rgba($color: #0b2630, $alpha: 0.15);
    border-left: 0;
    border-right: 0;

    &:last-child {
      border-bottom: 1px solid rgba($color: #0b2630, $alpha: 0.15);
    }
  }

  &__label-text {
    color: var(--color-black);
    font-size: 18px;
    font-weight: 500;
    line-height: 100%;

    @media (min-width: 768px) {
      font-size: 24px;
    }
  }

  &__label-badge {
    position: relative;
    width: 40px;
    min-width: 40px;
    flex-basis: 40px;
    height: 100%;

    @media (min-width: 768px) {
      width: 68px;
      flex-basis: 68px;
      min-width: 68px;
    }

    &:after,
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      width: 20px;
      height: 2px;
      background-color: var(--color-green-darker);

      transition: 0.3s height ease;
    }

    &.--active {
      &:after {
        // transform: translate(-50%, -50%) rotate(90deg);
        width: 2px;
        height: 20px;
      }
    }
  }

  &__body {
    max-width: 800px;
  }

  &__body-text {
    padding-bottom: 28px;
    font-size: 16px;
    line-height: 1.4;
  }
}
</style>
