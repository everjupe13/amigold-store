<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import AppCollapse from '@/components/shared/AppCollapse.vue'
import { CheckIconForm } from '@/components/shared/icons'

function useEvents(context: (e: any, value: any) => void) {
  const handleChange = (e: Event) => {
    context('update:modelValue', (e.target as HTMLTextAreaElement).value)
  }
  const handleInput = (e: Event) => {
    context('update:modelValue', (e.target as HTMLTextAreaElement).value)
  }

  return {
    handleChange,
    handleInput
  }
}

function randomID() {
  return `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`
}

interface Props {
  disabled?: boolean
  placeholder?: string
  readonly?: boolean
  state?: any
  modelValue?: any
  inputWrapperClasses?: string
  type?:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'url'
    | 'tel'
    | 'date'
    | 'time'
    | 'range'
    | 'color'
    | 'search'
  validationMessage?: string
  validatable?: boolean
  isValid?: boolean
  isDirty?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  validationMessage: '',
  modelValue: undefined,
  isValid: undefined,
  isDirty: undefined,
  inputWrapperClasses: '',
  placeholder: '',
  state: ''
})
const emits = defineEmits(['change', 'input', 'update:modelValue'])
const { handleChange, handleInput } = useEvents(emits)

const uuid = ref(randomID())

// TODO add logic for validation shown
const validationFn = computed(() => props.modelValue.length > 0)
const isValidationMessageShown = computed(() => {
  return props.isValid === undefined ? validationFn.value : !props.isValid
})

const slots = useSlots()
const isAfterInputSlotEmpty = computed(
  () => slots?.['after-input'] === undefined
)

const isLoaded = ref(false)

onMounted(() => {
  isLoaded.value = true
})
</script>

<template>
  <div>
    <div
      class="group flex h-75 items-center rounded-[5px] bg-button focus-within:bg-button-dark hover:bg-button-dark"
      :class="[props.inputWrapperClasses]"
    >
      <div class="relative w-full flex-grow">
        <input
          :id="uuid"
          class="input peer block w-full rounded-[5px] bg-transparent px-20 pb-12 pt-28 text-[#555862] outline-none transition placeholder:opacity-0 focus:text-[#000] group-hover:text-[#000]"
          :value="props.modelValue"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
          :readonly="props.readonly"
          :type="props.type"
          @input="handleInput"
          @change="handleChange"
        />
        <label
          class="label absolute left-22 top-12 text-[12px] text-[#848A99] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px] peer-hover:text-[#000] peer-focus:top-11 peer-focus:-translate-y-0 peer-focus:text-[12px] peer-focus:text-[#848A99]"
          :for="uuid"
        >
          {{ placeholder }}
        </label>
      </div>
      <div
        class="flex-shrink-0 flex-grow-0"
        :class="{
          'py-10 pr-10': !isAfterInputSlotEmpty || isValid !== undefined
        }"
      >
        <template v-if="!isAfterInputSlotEmpty">
          <slot name="after-input"></slot>
        </template>
        <template v-else-if="isAfterInputSlotEmpty && isValid !== undefined">
          <div>
            <span
              v-if="isValid && isDirty"
              class="flex items-center justify-center pr-10"
            >
              <CheckIconForm />
            </span>
          </div>
        </template>
      </div>
    </div>
    <AppCollapse
      v-if="props.isValid !== undefined && isLoaded"
      v-model="isValidationMessageShown"
    >
      <div class="validation-message px-5 py-7 pb-0">
        {{ validationMessage }}
      </div>
    </AppCollapse>
  </div>
</template>

<style lang="scss" scoped>
.label {
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
}

.input {
  @apply leading-none text-medium-16;
}

.validation-message {
  @apply leading-none text-red text-bold-12;
}
</style>
