<script lang="ts" setup>
interface ICollapse {
  modelValue?: boolean
}

const props = defineProps<ICollapse>()
const contentRef = ref<HTMLElement>()
const contentHeight = ref<number | undefined | null>(null)
let componentClasses = reactive({
  'app-collapse': true,
  show: false
})

onMounted(() => {
  componentClasses = {
    'app-collapse': true,
    show: props.modelValue
  }
})

watch(
  () => props.modelValue,
  () => {
    componentClasses = {
      'app-collapse': true,
      show: props.modelValue
    }
  }
)

const changeState = (state: boolean) => {
  if (!contentRef.value) {
    return
  }

  if (state) {
    contentRef.value.style.setProperty(
      '--content-height',
      `${contentHeight.value}px`
    )
    return
  }

  contentRef.value.style.setProperty('--content-height', `0px`)
}

const useChangeState = () => {
  changeState(props.modelValue)
}

onMounted(() => {
  contentHeight.value = contentRef.value?.getBoundingClientRect().height
  useChangeState()
})

watch(
  () => props.modelValue,
  () => {
    changeState(props.modelValue)
  }
)
</script>

<template>
  <div ref="contentRef" :class="componentClasses">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.app-collapse {
  height: var(--content-height);
  transition-property: height, opacity;
  transition-timing-function: ease;
  transition-duration: 350ms;
  overflow: hidden;

  opacity: 0;

  --content-height: auto;

  &.show {
    opacity: 1;
  }
}
</style>
