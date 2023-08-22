<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { VueFinalModal } from 'vue-final-modal'

import AppSpinner from '@/components/shared/AppSpinner.vue'
import { useCartStore } from '@/store/cart'

const formData = reactive({
  email: '',
  name: '',
  phone: '',
  comment: ''
})

const rules = {
  email: { required, email },
  name: { required },
  phone: { required },
  comment: {}
}

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const v$ = useVuelidate(rules, formData)
const cartStore = useCartStore()
const isLoading = ref(false)
const isSuccess = ref(false)

const successScreen = ref(false)

const onSubmitForm = async () => {
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
    comment: formData.comment
  })

  isLoading.value = false
  isSuccess.value = true
  setTimeout(() => {
    isSuccess.value = false

    formData.email = ''
    formData.name = ''
    formData.phone = ''
    formData.comment = ''
    v$.value.$reset()

    successScreen.value = true
  }, 200)
}

const closeModal = () => {
  emit('confirm')
}
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="p-30 bg-white rounded-[24px] max-w-[500px] w-full md:p-15 md:mx-16"
  >
    <form
      v-if="!successScreen"
      class="mx-auto max-w-[580px] bg-white p-30 pb-30 md:p-20 md:pb-50"
      @submit.prevent="onSubmitForm"
    >
      <h1 class="mb-24 text-extrabold-36">Заполните данные</h1>
      <div class="mb-30 md:mb-40">
        <AppInput
          v-model="v$.name.$model"
          placeholder="Имя"
          class="mb-15"
          :disabled="isSuccess || isLoading"
          :is-valid="v$.name.$dirty ? !v$.name.$invalid : true"
          :is-dirty="v$.name.$dirty"
          :validation-message="unref(v$.name.$silentErrors[0]?.$message)"
        />
        <AppInput
          v-model="v$.phone.$model"
          placeholder="Телефон"
          class="mb-15"
          :disabled="isSuccess || isLoading"
          :is-valid="v$.phone.$dirty ? !v$.phone.$invalid : true"
          :is-dirty="v$.phone.$dirty"
          :validation-message="unref(v$.phone.$silentErrors[0]?.$message)"
        />
        <AppInput
          v-model="v$.email.$model"
          placeholder="E-mail"
          class="mb-15"
          :disabled="isSuccess || isLoading"
          :is-valid="v$.email.$dirty ? !v$.email.$invalid : true"
          :is-dirty="v$.email.$dirty"
          :validation-message="unref(v$.email.$silentErrors[0]?.$message)"
        />
        <AppInput
          v-model="formData.comment"
          :disabled="isSuccess || isLoading"
          placeholder="Комментарий к заказу"
          class="mb-15"
        />
      </div>
      <AppButton theme="default" class="w-full" type="submit">
        <div v-if="isLoading" class="flex items-center justify-center">
          <AppSpinner :size="18" class="!text-white" />
        </div>
        <template v-else>
          {{ isSuccess ? 'Успешно' : 'Купить' }}
        </template>
      </AppButton>
    </form>
    <div v-else class="mx-auto max-w-[580px] bg-white p-30 pb-30 md:p-20">
      <div class="mb-40 leading-tight text-extrabold-32">
        Спасибо за оформление заказа!
      </div>
      <div class="mb-20 leading-tight text-medium-20">
        С вами свяжется наш менеджер для уточнения заказа, после чего вы сможете
        произвести оплату!
      </div>
      <div class="leading-tight text-regular-16">
        Мы работаем с 8 до 17 часов, поэтому если в оформите заказ позднее - мы
        свяжемся с вами на следующий день после 10 часов! :)
      </div>
      <AppButton
        theme="default"
        class="mt-30 w-full"
        type="submit"
        @click="closeModal"
      >
        Закрыть
      </AppButton>
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
