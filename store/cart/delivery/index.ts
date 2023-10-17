import { defineStore } from 'pinia'

import { useApiRequest } from '@/composables/useApiRequest'

type DeliveryType = {
  id: number
  name: string
  description: string | null
  image: string | null
  isSelfDelivery: boolean
}

type DeliveryResponseType = {
  id: number
  name: string
  description: string | null
  image: string | null
  is_self_delivery: boolean
}

const DeliveryApiMapper = {
  toDomainArray(entities: DeliveryResponseType[]): DeliveryType[] {
    return entities.map(entity => ({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      image: entity.image,
      isSelfDelivery: entity.is_self_delivery
    }))
  }
}

export const useDeliveryStore = defineStore('cart-delivery', () => {
  const deliveryTypes = ref<DeliveryType[]>()

  async function fetchDeliveryTypes() {
    try {
      const { data, error } =
        await useApiRequest<DeliveryResponseType>(`/api/order/delivery`)

      if (Array.isArray(data?.value) && !error.value) {
        deliveryTypes.value = DeliveryApiMapper.toDomainArray(data.value)
      }

      return { data, error, status: true }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { error, status: false, data: ref(null) }
    }
  }

  return {
    deliveryTypes,
    fetchDeliveryTypes
  }
})
