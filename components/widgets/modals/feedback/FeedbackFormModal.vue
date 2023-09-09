<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { VueFinalModal } from 'vue-final-modal'

import AppSpinner from '@/components/shared/AppSpinner.vue'
import { useFeedbackStore } from '@/store/feedback/feedback.store'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const formData = reactive({
  email: '',
  phone: '',
  userName: '',
  orderComment: ''
})
const rules = {
  email: { required, email },
  phone: { required },
  userName: { required },
  orderComment: {}
}
const v$ = useVuelidate(rules, formData)
const inputPropsMapper = (props: { [x: string]: any }) => {
  return {
    isValid: props.$dirty ? !props.$invalid : true,
    isDirty: props.$dirty,
    validationMessage: unref(props.$silentErrors[0]?.$message)
  }
}

const isLoading = ref(false)
const isSuccess = ref(false)
const feedbackStore = useFeedbackStore()
const successScreen = ref(false)

const onSubmitForm = async () => {
  if (v$.value.$invalid) {
    v$.value.$validate()
    isLoading.value = false
    return
  }

  isLoading.value = true
  isSuccess.value = false
  const { status, error: _error } = await feedbackStore.feedback({
    phone: formData.phone,
    email: formData.email,
    userName: formData.userName,
    orderComment: formData.orderComment
  })

  isLoading.value = false
  isSuccess.value = true

  if (status) {
    formData.email = ''
    formData.userName = ''
    formData.phone = ''
    formData.orderComment = ''
    v$.value.$reset()

    setTimeout(() => {
      successScreen.value = true
    }, 200)
  }
}

const closeModal = () => {
  emit('confirm')
}
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="px-40 py-50 bg-white rounded-[24px] max-w-[600px] w-full md:px-20 md:py-50 md:rounded-[12px] md:mx-10"
  >
    <form v-if="!successScreen" @submit.prevent="onSubmitForm">
      <h1 class="mb-24 text-extrabold-36">Заполните данные</h1>
      <div class="mb-30 md:mb-40">
        <AppInput
          v-model="v$.email.$model"
          placeholder="E-mail"
          class="mb-15"
          :disabled="isSuccess || isLoading"
          v-bind="inputPropsMapper(v$.email)"
        />
        <AppInput
          v-model="v$.phone.$model"
          placeholder="Телефон"
          class="mb-15"
          :disabled="isSuccess || isLoading"
          v-bind="inputPropsMapper(v$.phone)"
        />
        <AppInput
          v-model="v$.userName.$model"
          placeholder="Имя"
          class="mb-15"
          :disabled="isSuccess || isLoading"
          v-bind="inputPropsMapper(v$.userName)"
        />
        <AppInput
          v-model="v$.orderComment.$model"
          placeholder="Ваш комментарий"
          :disabled="isSuccess || isLoading"
          v-bind="inputPropsMapper(v$.orderComment)"
        />
      </div>
      <ModalFormButton theme="default" class="w-full" type="submit">
        <div v-if="isLoading" class="flex items-center justify-center">
          <AppSpinner :size="18" class="!text-white" />
        </div>
        <template v-else>
          {{ isSuccess ? 'Успешно' : 'Отправить' }}
        </template>
      </ModalFormButton>
    </form>
    <div v-else>
      <div class="mb-40 leading-tight text-extrabold-32">Спасибо!</div>
      <div class="mb-20 leading-tight text-medium-20">
        С вами свяжется наш менеджер!
      </div>
      <ModalFormButton
        theme="default"
        class="mt-30 w-full"
        type="submit"
        @click="closeModal"
      >
        Закрыть
      </ModalFormButton>
    </div>
  </VueFinalModal>
</template>

<style lang="scss" scoped>
.title {
  color: #000;
  text-align: center;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: 1.6px;

  @media (max-width: 767px) {
    font-size: 30px;
  }
}
</style>
