<script lang="ts" setup>
import { PropType } from 'vue'

import { SortListType } from '@/store/catalog/catalog.types'

import CatalogSortingList from './CatalogSortingList.vue'

const props = defineProps({
  items: { type: Object as PropType<SortListType>, required: true },
  activeItemId: { type: Number as PropType<number>, required: true }
})

const emit = defineEmits<{
  (event: 'handle-change', id: number): void
}>()

const handleChangeActive = (id: number) => {
  emit('handle-change', id)
  isVisible.value = false
}

const activeSortingLabel = computed(
  () =>
    props.items
      .find(item => item.id === props.activeItemId)
      ?.label?.toLowerCase?.() || ''
)

const isVisible = ref(false)
const toggleMenuVisibility = () => {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div class="relative">
    <div
      :class="[
        'relative z-[5] flex h-48 cursor-pointer items-center justify-center rounded-full px-20 py-14 transition-all',
        'border-2 border-transparent bg-[#EEEFEF]',
        'hover:border-yellow hover:bg-transparent',
        { '!border-yellow !bg-transparent': isVisible }
      ]"
      @click="toggleMenuVisibility"
    >
      <span
        class="fong-hnd select-none pt-2 text-[16px] font-bold leading-none text-[#6B6C6C]"
      >
        Сортировка по:
        <span class="text-[#000]">{{ activeSortingLabel }}</span>
      </span>
    </div>
    <Transition name="fade-effect">
      <CatalogSortingList
        v-if="isVisible"
        :items="props.items"
        :active-item-id="$props.activeItemId"
        @change-active="handleChangeActive"
      />
    </Transition>
  </div>
</template>
