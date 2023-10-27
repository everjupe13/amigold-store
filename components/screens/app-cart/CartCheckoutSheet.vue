<script lang="ts" setup>
import { computed } from 'vue'

import AppSpinner from '@/components/shared/AppSpinner.vue'
import { formatRubles } from '@/utils/cost'

interface Props {
  isLoading?: boolean
  totalPrice?: string
}
const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  totalPrice: '0'
})
const emits = defineEmits(['createOrder'])

const totalPrice = computed(() => formatRubles(Number(props.totalPrice || 0)))

const onCreateOrder = () => {
  emits('createOrder')
}
</script>

<template>
  <form
    class="rounded-[18px] bg-gray p-30 md:rounded-[12px] md:p-20"
    @submit.prevent
  >
    <div class="mb-24">
      <p class="leading-none text-extrabold-32 md:text-extrabold-32">Итого</p>
    </div>

    <div class="rounded-[16px] bg-button-dark p-28 md:rounded-[15px] md:p-20">
      <div>
        <div class="mb-18 flex items-center justify-between">
          <p class="leading-none text-black/80 text-regular-18">
            Товара на сумму:
          </p>
          <div v-if="props.isLoading" class="flex items-center justify-center">
            <AppSpinner :size="18" />
          </div>
          <div v-else class="leading-none text-black text-bold-18">
            {{ totalPrice }}
          </div>
        </div>

        <div class="mb-18 flex items-center justify-between">
          <p class="leading-none text-black/80 text-regular-18">Доставка:</p>
          <div v-if="props.isLoading" class="flex items-center justify-center">
            <AppSpinner :size="18" />
          </div>
          <div
            v-else
            class="text-right text-[14px] font-medium leading-none text-black"
          >
            рассчитывается после
            <br />
            оформления заказа
          </div>
        </div>

        <!-- <div class="flex items-center justify-between">
          <p class="leading-none text-gray/80 text-regular-18">Скидка:</p>
          <div class="flex items-center justify-center" v-if="props.isLoading">
            <AppSpinner :size="18" />
          </div>
          <div v-else class="leading-none text-black text-bold-18">
            -20.00 ₽
          </div>
        </div> -->

        <hr class="my-18 h-1 border-none bg-gray/20" />

        <div class="flex items-center justify-between">
          <p class="leading-none text-black text-bold-18">Итого:</p>
          <div v-if="props.isLoading" class="flex items-center justify-center">
            <AppSpinner :size="18" />
          </div>
          <div v-else class="leading-none text-black text-bold-18">
            {{ totalPrice }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-24">
      <AppButton
        type="submit"
        class="h-65 w-full !rounded-[8px]"
        :disabled="!Number(props.totalPrice) || props.isLoading"
        @click="onCreateOrder"
      >
        <div v-if="props.isLoading" class="flex items-center justify-center">
          <AppSpinner :size="18" class="!text-white" />
        </div>
        <template v-else>
          {{ `К оформлению ${totalPrice}` }}
        </template>
      </AppButton>
    </div>
  </form>
</template>
