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
  title: 'Иван Иваныч',
  city: 'г. Санкт-Петербург 570078 ',
  street: 'ул. Пушкина 12, кв-2'
})

const rules = {
  title: { required },
  city: { required },
  street: { required }
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
            v-model="v$.title.$model"
            placeholder="ФИО"
            class="mb-15"
            v-bind="inputPropsMapper(v$.title)"
          />
          <AppInput
            v-model="v$.city.$model"
            placeholder="Город / Индекс"
            class="mb-15"
            v-bind="inputPropsMapper(v$.city)"
          />
          <AppInput
            v-model="v$.street.$model"
            placeholder="Адрес"
            v-bind="inputPropsMapper(v$.street)"
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
