<script lang="ts" setup>
import { useModal } from 'vue-final-modal'

import ProdileAddressEditModal from '@/components/features/profile/ProdileAddressEditModal.vue'

const addressesList = [
  {
    id: 0,
    title: 'Иванов Иван',
    city: 'г. Москва 450078',
    street: 'ул. Тверская 12, кв-2'
  },
  {
    id: 1,
    title: 'Иван Иваныч',
    city: 'г. Санкт-Петербург 570078 ',
    street: 'ул. Пушкина 12, кв-2'
  }
]

const onPartnerEdit = (_id: number) => {
  const { open, close } = useModal({
    component: ProdileAddressEditModal,
    attrs: {
      onConfirm() {
        close()
      }
    }
  })
  open()
}
const onPartnerDelete = () => {}

const onPartnerAdd = () => {
  const { open, close } = useModal({
    component: ProdileAddressEditModal,
    attrs: {
      onConfirm() {
        close()
      }
    }
  })
  open()
}
</script>

<template>
  <div>
    <AppButton class="mb-20" @click="onPartnerAdd">
      Добавить новый адрес
    </AppButton>

    <div class="grid grid-cols-1 gap-y-20">
      <ProfileAddressCard
        v-for="address in addressesList"
        :key="address.id"
        v-bind="address"
        @edit="onPartnerEdit"
        @delete="onPartnerDelete"
      ></ProfileAddressCard>
    </div>
  </div>
</template>
