<script lang="ts" setup>
import { PropType } from 'vue'

import { SortListType } from '@/store/catalog/catalog.types'

import CatalogSortingListItem from './CatalogSortingListItem.vue'

const props = defineProps({
  items: { type: Object as PropType<SortListType>, required: true },
  activeItemId: { type: Number as PropType<number>, required: true }
})

const emit = defineEmits<{
  (event: 'change-active', id: number): void
}>()

const onItemClick = (id: number) => {
  emit('change-active', id)
}

const isItemActive = (id: number) => props.activeItemId === id
</script>

<template>
  <div
    class="absolute right-0 top-[calc(100%+10px)] z-[5] min-h-[78px] w-[270px] rounded-[24px] bg-white p-14 shadow-[0px_5px_80px_0px_rgba(0,0,0,0.08)] md:left-0 md:right-auto"
  >
    <template v-for="item in props.items" :key="item.id">
      <CatalogSortingListItem
        :uuid="item.id"
        :name="item.label"
        :is-active="isItemActive(item.id)"
        @choose="onItemClick"
      />
    </template>
  </div>
</template>
