<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { VueFinalModal } from 'vue-final-modal'

import { useAuthStore } from '@/store/auth/useAuthStore'

const authStore = useAuthStore()

onMounted(() => {
  nextTick(() => {
    const bodyElement = document.querySelector('body') as HTMLElement
    bodyElement.style.removeProperty('padding-right')
  })
})

const formData = reactive({
  email: 'example@mailbox.io',
  name: 'John',
  phone: '8 999 999 99 99',
  password: '12113123'
})

const rules = {
  email: { required, email },
  phone: { required },
  name: { required },
  password: { required }
}

const v$ = useVuelidate(rules, formData)
const isLoading = ref(false)
const isSuccess = ref(false)

onMounted(() => {
  isLoading.value = true
  v$.value.$validate()
  isLoading.value = false
})

const inputPropsMapper = (props: { [x: string]: any }) => {
  return {
    isValid: props.$dirty ? !props.$invalid : true,
    isDirty: props.$dirty,
    validationMessage: unref(props.$silentErrors[0]?.$message)
  }
}

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const onSubmitForm = async () => {
  await authStore.signUp()
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
        Авторизация
      </h2>
      <form @submit.prevent="onSubmitForm">
        <div>
          <ProfileFormInput
            v-model="v$.email.$model"
            placeholder="Е-mail"
            class="mb-15"
            :disabled="isSuccess || isLoading"
            v-bind="inputPropsMapper(v$.email)"
          />
          <ProfileFormInput
            v-model="v$.phone.$model"
            placeholder="Номер телефона"
            class="mb-15"
            :disabled="isSuccess || isLoading"
            v-bind="inputPropsMapper(v$.phone)"
          />
          <ProfileFormInput
            v-model="v$.name.$model"
            placeholder="ФИО"
            class="mb-15"
            :disabled="isSuccess || isLoading"
            v-bind="inputPropsMapper(v$.name)"
          />
          <ProfileFormInput
            v-model="v$.password.$model"
            placeholder="Пароль"
            type="password"
            class="mb-15"
            :disabled="isSuccess || isLoading"
            v-bind="inputPropsMapper(v$.password)"
          />
        </div>
        <div class="flex flex-col items-center">
          <AppButton class="w-full max-w-[250px]" type="submit">
            Отправить
          </AppButton>
        </div>
      </form>
    </div>
  </VueFinalModal>
</template>
