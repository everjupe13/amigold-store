<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

onMounted(() => {
  nextTick(() => {
    const bodyElement = document.querySelector('body') as HTMLElement
    bodyElement.style.removeProperty('padding-right')
  })
})

const formData = reactive({
  organization: 'ИП Иванов Иван',
  inn: '937118153215',
  bik: '4613 5361 5367 1289',
  bik2: '4616179'
})

const rules = {
  organization: { required },
  inn: { required },
  bik: { required },
  bik2: { required }
}

const v$ = useVuelidate(rules, formData)
const isLoading = ref(false)
const isSuccess = ref(false)

onMounted(() => {
  isLoading.value = true
  isSuccess.value = false
  v$.value.$validate()
  isLoading.value = false
  isSuccess.value = true
})

const inputPropsMapper = (props: { [x: string]: any }) => {
  return {
    isValid: props.$dirty ? !props.$invalid : true,
    isDirty: props.$dirty,
    validationMessage: unref(props.$silentErrors[0]?.$message)
  }
}
const onSubmitForm = () => {
  emit('confirm')
}
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="px-40 py-50 bg-white rounded-[24px] max-w-[600px] w-full md:px-20 md:py-50 md:rounded-[12px] md:mx-10"
  >
    <div>
      <h2 class="mb-40 leading-none text-extrabold-36 md:text-extrabold-28">
        Введите новые данные
      </h2>
      <form @submit.prevent="onSubmitForm">
        <div class="mb-20">
          <AppInput
            v-model="v$.organization.$model"
            placeholder="Название организации"
            class="mb-15"
            v-bind="inputPropsMapper(v$.organization)"
          />
          <AppInput
            v-model="v$.inn.$model"
            placeholder="ИНН"
            class="mb-15"
            v-bind="inputPropsMapper(v$.inn)"
          />
          <AppInput
            v-model="v$.bik.$model"
            placeholder="БИК"
            class="mb-15"
            v-bind="inputPropsMapper(v$.bik)"
          />
          <AppInput
            v-model="v$.bik2.$model"
            placeholder="БИК"
            class="mb-15"
            v-bind="inputPropsMapper(v$.bik2)"
          />
        </div>
        <div class="flex flex-col items-center">
          <AppButton class="w-full max-w-[250px]" type="submit">
            Изменить
          </AppButton>
        </div>
      </form>
    </div>
  </VueFinalModal>
</template>
