<script lang="ts" setup>
import { useModal } from 'vue-final-modal'

import FeedbackFormModal from '@/components/widgets/modals/feedback/FeedbackFormModal.vue'

type Props = {
  isLinked: boolean
  link: string
}

const props = withDefaults(defineProps<Props>(), {
  isLinked: false,
  link: ''
})

const { open: openFeedbackModal, close: closeFeedbackModal } = useModal({
  component: FeedbackFormModal,
  attrs: {
    onConfirm() {
      closeFeedbackModal()
    }
  }
})

const handleButtonClick = () => {
  if (props.isLinked) {
    openFeedbackModal()
  }
}
</script>

<template>
  <div class="relative h-[580px] py-80 md:h-[580px]">
    <div class="relative z-[2] flex h-full max-w-[800px] flex-col">
      <h1
        class="mb-35 leading-none tracking-[-1.28px] text-black text-extrabold-52 md:text-extrabold-32"
      >
        <slot name="title"></slot>
      </h1>
      <p class="max-w-[500px] leading-tight text-bold-22 md:text-bold-16">
        <slot name="text"></slot>
      </p>
      <div class="mt-auto">
        <AppButton theme="default" class="relative" @click="handleButtonClick">
          <span class="relative z-[1]">
            <slot name="buttonLabel"></slot>
          </span>
          <a
            v-if="props.isLinked"
            :href="props.link"
            class="absolute inset-0 block h-full w-full"
          ></a>
        </AppButton>
      </div>
    </div>
    <div
      class="absolute right-0 top-1/2 z-[1] block -translate-y-1/2 md:hidden"
    >
      <slot name="image"></slot>
    </div>
  </div>
</template>
