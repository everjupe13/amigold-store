<script lang="ts" setup>
import { useModal } from 'vue-final-modal'

import ProfilePartnerEditModal from '@/components/features/profile/ProfilePartnerEditModal.vue'

const partnersList = [
  {
    id: 0,
    name: 'ИП Иванов Иван',
    taxLaw: 'Физлицо',
    inn: '937118153215',
    bik: ['4613 5361 5367 1289', '4616179']
  },
  {
    id: 1,
    name: 'ИП Роман Романов',
    taxLaw: 'Юрлицо',
    inn: '937118153215',
    bik: ['4613 5361 5367 1289', '4616179']
  }
]

const onPartnerEdit = (_id: number) => {
  const { open, close } = useModal({
    component: ProfilePartnerEditModal,
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
    component: ProfilePartnerEditModal,
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
    <AppButton class="mb-20" @click="onPartnerAdd">Добавить</AppButton>

    <div class="grid grid-cols-1 gap-y-20">
      <ProfilePartnerCard
        v-for="partner in partnersList"
        :key="partner.id"
        v-bind="partner"
        @edit="onPartnerEdit"
        @delete="onPartnerDelete"
      ></ProfilePartnerCard>
    </div>
  </div>
</template>
