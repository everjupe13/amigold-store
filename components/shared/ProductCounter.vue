<script lang="ts" setup>
import { MinusIcon, PlusIcon } from '@/components/shared/icons'

const props = withDefaults(
  defineProps<{
    amount: number
    isDisabled?: boolean
    disabledWhenCount?: number
    buttonClasses?: string
    wrapperClasses?: string
  }>(),
  {
    amount: 1,
    isDisabled: false,
    disabledWhenCount: 1,
    buttonClasses: '',
    wrapperClasses: ''
  }
)

const emits = defineEmits<{
  (e: 'increase'): () => void
  (e: 'decrease'): () => void
  (e: 'change', count: number, sign: boolean): () => void
}>()

const decreaseCount = () => {
  emits('decrease')
}

const increaseCount = () => {
  emits('increase')
}

const changeCount = (count = 1, sign = true) => {
  emits('change', count, sign)
}

const amountInput = ref()
const fakeAmount = ref('0')

function setInputFilter(
  textbox: Element,
  inputFilter: (value: string) => boolean,
  _errMsg?: string
): void {
  const events = [
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mouseup',
    'select',
    'contextmenu',
    'drop',
    'focusout'
  ]
  function eventFn(
    this: (HTMLInputElement | HTMLTextAreaElement) & {
      oldValue: string
      oldSelectionStart: number | null
      oldSelectionEnd: number | null
    }
  ) {
    if (inputFilter(this.value)) {
      this.oldValue = this.value
      this.oldSelectionStart = this.selectionStart
      this.oldSelectionEnd = this.selectionEnd
    } else if (Object.prototype.hasOwnProperty.call(this, 'oldValue')) {
      this.value = this.oldValue

      if (this.oldSelectionStart !== null && this.oldSelectionEnd !== null) {
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd)
      }
    } else {
      this.value = ''
    }

    fakeAmount.value = this.value
  }

  for (const event of events) {
    textbox.addEventListener(event, eventFn)
  }

  onUnmounted(() => {
    for (const event of events) {
      textbox.addEventListener(event, eventFn)
    }
  })
}

onMounted(() => {
  fakeAmount.value = String(props.amount)

  if (amountInput.value) {
    setInputFilter(amountInput.value, function (value) {
      return /^\d*$/.test(value)
    })
  }
})

const makeRequestToChangeAmount = (e: Event) => {
  const amount = computed(() => props.amount)
  const localAmount = Number(
    (e.target as HTMLInputElement).value || props.amount
  )

  const difference = Math.abs(amount.value - localAmount)
  if (difference !== 0) {
    changeCount(difference, localAmount > amount.value)
  }
}

const onInputChange = (e: Event) => {
  makeRequestToChangeAmount(e)
}
</script>

<template>
  <div class="flex items-center gap-x-12" :class="wrapperClasses">
    <button
      class="group flex h-24 w-24 items-center justify-center rounded-full border-[2px] border-gray transition disabled:cursor-default disabled:opacity-20"
      :disabled="
        (props.disabledWhenCount !== undefined &&
          props.amount === props.disabledWhenCount) ||
        isDisabled
      "
      :class="[
        props.buttonClasses
          ? props.buttonClasses
          : 'bg-green hover:border-green hover:bg-green'
      ]"
      @click="decreaseCount"
    >
      <MinusIcon class="text-gray transition group-hover:text-white" />
    </button>
    <div
      class="min-w-45 relative text-center font-inter outline-none text-bold-24"
    >
      <span
        class="width-machine text-transparent outline-none"
        aria-hidden="true"
      >
        {{ props.amount }}
      </span>
      <input
        ref="amountInput"
        class="leading-nonde absolute left-0 top-0 block w-full min-w-[20px] max-w-max bg-transparent outline-none"
        :value="props.amount"
        @change="onInputChange"
      />
    </div>
    <button
      class="group flex h-24 w-24 items-center justify-center rounded-full border-[2px] border-gray transition disabled:cursor-default disabled:opacity-20"
      :disabled="isDisabled"
      :class="[
        props.buttonClasses
          ? props.buttonClasses
          : 'bg-green hover:border-green hover:bg-green'
      ]"
      @click="increaseCount"
    >
      <PlusIcon class="text-gray transition group-hover:text-white" />
    </button>
  </div>
</template>
