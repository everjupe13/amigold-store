<!-- eslint-disable no-unreachable -->
<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { useModal } from 'vue-final-modal'

import ProfileUserEditModal from '@/components/features/profile/ProfileUserEditModal.vue'

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

const v$ = useVuelidate(rules, formData)
const isLoading = ref(false)
const isSuccess = ref(false)

const { open, close } = useModal({
  component: ProfileUserEditModal,
  attrs: {
    onConfirm() {
      close()
    }
  }
})

onMounted(() => {
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
const handleOpenModal = () => {
  open()
  close()
}
</script>

<template>
  <form @submit.prevent="">
    <ProfileFormInput
      v-model="v$.email.$model"
      placeholder="Е-mail"
      class="mb-15"
      :readonly="true"
      v-bind="inputPropsMapper(v$.email)"
      @click="handleOpenModal"
    />
    <ProfileFormInput
      v-model="v$.phone.$model"
      placeholder="Номер телефона"
      class="mb-15"
      :readonly="true"
      v-bind="inputPropsMapper(v$.phone)"
      @click="handleOpenModal"
    />
    <ProfileFormInput
      v-model="v$.name.$model"
      placeholder="ФИО"
      class="mb-15"
      :readonly="true"
      v-bind="inputPropsMapper(v$.name)"
      @click="handleOpenModal"
    />
    <ProfileFormInput
      v-model="v$.password.$model"
      placeholder="Пароль"
      type="password"
      :readonly="true"
      v-bind="inputPropsMapper(v$.password)"
      @click="handleOpenModal"
    />
  </form>
</template>
