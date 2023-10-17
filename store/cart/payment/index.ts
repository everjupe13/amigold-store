import { defineStore } from 'pinia'

import { useApiRequest } from '@/composables/useApiRequest'

type PaymentType = {
  id: number
  name: string
  description: string | null
}

type PaymentResponseType = {
  id: number
  name: string
  description: string | null
}

const DeliveryApiMapper = {
  toDomainArray(entities: PaymentResponseType[]): PaymentType[] {
    return entities.map(entity => ({
      id: entity.id,
      name: entity.name,
      description: entity.description
    }))
  }
}

export const usePaymentStore = defineStore('cart-payment', () => {
  const paymentTypes = ref<PaymentType[]>()

  async function fetchPaymentTypes() {
    try {
      const { data, error } = await useApiRequest<PaymentResponseType>(
        `/api/order/payment_type`
      )

      if (Array.isArray(data?.value) && !error.value) {
        paymentTypes.value = DeliveryApiMapper.toDomainArray(data.value)
      }

      return { data, error, status: true }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { error, status: false, data: ref(null) }
    }
  }

  return {
    paymentTypes,
    fetchPaymentTypes
  }
})
