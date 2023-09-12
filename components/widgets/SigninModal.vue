<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { VueFinalModal } from 'vue-final-modal'

import { useUserStore } from '@/store/user/useUserStore'

const userStore = useUserStore()

onMounted(() => {
  nextTick(() => {
    const bodyElement = document.querySelector('body') as HTMLElement
    bodyElement.style.removeProperty('padding-right')
  })
})

const formData = reactive({
  email: '',
  password: ''
})

const rules = {
  email: { required, email },
  password: { required }
}

const v$ = useVuelidate(rules, formData)
const isLoading = ref(false)

onMounted(() => {
  isLoading.value = true
  if (Object.values(unref(formData)).every(field => !!field)) {
    v$.value.$validate()
  }
  isLoading.value = false
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'close'): void
}>()

const isSuccess = ref(false)
const onSubmitForm = async () => {
  await userStore.authUser({
    login: formData.email,
    password: formData.password
  })
  isSuccess.value = true
}

const onSuccessClose = () => {
  emit('close')
}

const clientModal = ref()
onMounted(() => {
  const openSignupModal = inject('openSignup') as () => void
  clientModal.value = openSignupModal
})

const openSignupModalUrl = () => {
  emit('confirm')
}

const inputPropsMapper = (props: { [x: string]: any }) => {
  return {
    isValid: props.$dirty ? !props.$invalid : true,
    isDirty: props.$dirty,
    validationMessage: unref(props.$silentErrors[0]?.$message)
  }
}
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="px-40 py-50 bg-white rounded-[24px] max-w-[600px] w-full md:px-20 md:py-50 md:rounded-[12px] md:mx-10"
  >
    <div>
      <template v-if="!isSuccess">
        <h2 class="mb-40 leading-none text-extrabold-36 md:text-extrabold-28">
          Авторизация
        </h2>
        <form @submit.prevent="onSubmitForm">
          <div class="mb-30">
            <ProfileFormInput
              v-model="v$.email.$model"
              placeholder="Е-mail"
              class="mb-15"
              :disabled="isLoading"
              v-bind="inputPropsMapper(v$.email)"
            />
            <ProfileFormInput
              v-model="v$.password.$model"
              placeholder="Пароль"
              type="password"
              :disabled="isLoading"
              v-bind="inputPropsMapper(v$.password)"
            />
          </div>
          <div class="flex flex-col items-center">
            <AppButton class="h-65 w-full !rounded-[5px]" type="submit">
              Отправить
            </AppButton>
          </div>
          <div class="flex justify-center">
            <p class="mt-15 text-center text-medium-16">
              Еще нет аккаунта? Совершите первую покупку и мы вас зарегистрируем
              <button
                type="button"
                class="text-[rgb(44,82,255)] transition-all hover:drop-shadow-xl"
                @click="openSignupModalUrl"
              >
                Сделать заказ
              </button>
            </p>
          </div>
        </form>
      </template>
      <template v-else>
        <h2 class="mb-40 leading-none text-extrabold-36 md:text-extrabold-28">
          Вы авторизованы
        </h2>
        <AppButton class="h-65 w-full !rounded-[5px]" @click="onSuccessClose">
          Закрыть
        </AppButton>
      </template>
    </div>
  </VueFinalModal>
</template>
