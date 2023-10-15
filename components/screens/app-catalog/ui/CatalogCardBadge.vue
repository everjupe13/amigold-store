<script lang="ts" setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isDiscount: {
    type: Boolean,
    default: false
  },
  isPromotionActive: {
    type: Boolean,
    default: false
  }
})

const labels = [
  {
    key: 'isNew',
    label: 'Новинка'
  },
  {
    key: 'isDiscount',
    label: 'Скидка'
  },
  {
    key: 'isPromotionActive',
    label: 'Акция'
  }
]

const badgeColor = {
  isNew: '#00B597',
  isDiscount: '#F74FE5',
  isPromotionActive: '#7786FF'
}

const currentBadgeData: Ref<
  | {
      key: string
      label: string
    }
  | undefined
> = computed(() => {
  switch (true) {
    case props.isNew: {
      return labels.find(label => label.key === 'isNew')
    }
    case props.isDiscount: {
      return labels.find(label => label.key === 'isDiscount')
    }
    case props.isPromotionActive: {
      return labels.find(label => label.key === 'isPromotionActive')
    }
    default: {
      return labels[0]
    }
  }
})

const currentColor = computed(() =>
  currentBadgeData.value?.key
    ? badgeColor[currentBadgeData.value.key as keyof typeof badgeColor]
    : badgeColor.isNew
)
const currentLabel = computed(() => currentBadgeData.value?.label)

const isLocalVisible = computed(
  () => props.isNew || props.isDiscount || props.isPromotionActive
)
</script>

<template>
  <span
    v-if="props.isVisible && isLocalVisible"
    :class="[
      'inline-flex h-23 items-center justify-center rounded-[6px] px-10 pb-3 pt-5',
      'text-[14px] font-extrabold uppercase leading-none text-white',
      currentColor ? `bg-[${currentColor}]` : ''
    ]"
    :style="{ backgroundColor: currentColor }"
  >
    {{ currentLabel }}
  </span>
</template>
