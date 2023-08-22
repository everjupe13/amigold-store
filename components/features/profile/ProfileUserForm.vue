<!-- eslint-disable no-unreachable -->
<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

import { useCartStore } from '@/store/cart'

const formData = reactive({
  email: 'example@mailbox.io',
  name: 'John',
  phone: '8 999 999 99 99',
  password: '12113123'
})

const rules = {
  email: { required, email },
  name: { required },
  phone: { required },
  password: { required }
}

// const emit = defineEmits<{
//   (e: 'confirm'): void
// }>()

const v$ = useVuelidate(rules, formData)
const cartStore = useCartStore()
const isLoading = ref(false)
const isSuccess = ref(false)

const successScreen = ref(false)

onMounted(() => {
  isLoading.value = true
  isSuccess.value = false
  v$.value.$validate()
  isLoading.value = false
  isSuccess.value = true
})

const onSubmitForm = async () => {
  return
  isLoading.value = true
  isSuccess.value = false
  if (v$.value.$invalid) {
    v$.value.$validate()
    isLoading.value = false
    return
  }

  await cartStore.createOrder({
    email: formData.email,
    name: formData.name,
    phone: formData.phone,
    comment: formData.password
  })

  isLoading.value = false
  isSuccess.value = true
  setTimeout(() => {
    isSuccess.value = false

    formData.email = ''
    formData.name = ''
    formData.phone = ''
    formData.password = ''
    v$.value.$reset()

    successScreen.value = true
  }, 200)
}

// const closeModal = () => {
//   emit('confirm')
// }
const inputPropsMapper = (props: { [x: string]: any }) => {
  return {
    isValid: props.$dirty ? !props.$invalid : true,
    isDirty: props.$dirty,
    validationMessage: unref(props.$silentErrors[0]?.$message)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmitForm">
    <ProfileFormInput
      v-model="v$.email.$model"
      placeholder="Е-mail"
      class="mb-15"
      :disabled="isSuccess || isLoading || true"
      v-bind="inputPropsMapper(v$.email)"
    />
    <ProfileFormInput
      v-model="v$.phone.$model"
      placeholder="Номер телефона"
      class="mb-15"
      :disabled="isSuccess || isLoading || true"
      v-bind="inputPropsMapper(v$.phone)"
    />
    <ProfileFormInput
      v-model="v$.name.$model"
      placeholder="ФИО"
      class="mb-15"
      :disabled="isSuccess || isLoading || true"
      v-bind="inputPropsMapper(v$.name)"
    />
    <ProfileFormInput
      v-model="v$.password.$model"
      placeholder="Пароль"
      type="password"
      class="mb-15"
      :disabled="isSuccess || isLoading || true"
      v-bind="inputPropsMapper(v$.password)"
    />
  </form>
</template>
