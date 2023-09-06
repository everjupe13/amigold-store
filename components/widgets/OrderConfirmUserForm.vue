<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

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
  (e: 'close', key: string): void
}>()

const v$ = useVuelidate(rules, formData)
const isLoading = ref(false)
const isSuccess = ref(false)

const cartStore = useCartStore()

const onSubmitForm = () => {
  isLoading.value = true
  isSuccess.value = false
  if (v$.value.$invalid) {
    v$.value.$validate()
    isLoading.value = false
    return
  }

  isLoading.value = false
  isSuccess.value = true
  setTimeout(async () => {
    isSuccess.value = false

    formData.email = ''
    formData.name = ''
    formData.phone = ''
    formData.comment = ''
    v$.value.$reset()
    await cartStore.createOrder()

    emit('close', 'user-form')
  }, 200)
}
</script>

<template>
  <form class="max-w-[580px" @submit.prevent="onSubmitForm">
    <h1 class="mb-24 text-extrabold-36">Заполните данные</h1>
    <div class="mb-30">
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
      />
    </div>
    <AppButton theme="default" class="h-55 w-full !rounded-[5px]" type="submit">
      <div v-if="isLoading" class="flex items-center justify-center">
        <AppSpinner :size="18" class="!text-white" />
      </div>
      <template v-else>
        {{ isSuccess ? 'Успешно' : 'Купить' }}
      </template>
    </AppButton>
  </form>
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
