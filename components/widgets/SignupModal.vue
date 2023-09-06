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
const isSuccess = ref(false)

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

const onSubmitForm = async () => {
  await userStore.createUser({
    password: formData.password,
    login: formData.email
  })
  emit('confirm')
}

const clientModal = ref()
onMounted(() => {
  const openAuthModal = inject('openAuth') as () => void
  clientModal.value = openAuthModal
})

const openAuthModal = () => {
  emit('confirm')
  clientModal.value()
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
      <h2 class="mb-40 leading-none text-extrabold-36 md:text-extrabold-28">
        Регистрация
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
            v-model="v$.password.$model"
            placeholder="Пароль"
            type="password"
            class="mb-15"
            :disabled="isSuccess || isLoading"
            v-bind="inputPropsMapper(v$.password)"
          />
        </div>
        <div class="flex flex-col items-center">
          <AppButton class="h-65 w-full !rounded-[5px]" type="submit">
            Отправить
          </AppButton>
        </div>
        <div class="flex justify-center">
          <p class="mt-15 text-medium-16">
            Есть аккаунт?
            <button class="text-[#2c52ff]" type="button" @click="openAuthModal">
              Войдите
            </button>
          </p>
        </div>
      </form>
    </div>
  </VueFinalModal>
</template>
