import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { type Ref, ref } from 'vue'

import { useApiRequest } from '@/composables/useApiRequest'

import { ICart } from './cart.types'

export const LOCAL_STORAGE_CART_KEY = 'x-cart-product'
export const LOCAL_STORAGE_SESSION_KEY = 'x-user-session'

const cartStorageProvider = {
  add(id: number, size: string): boolean {
    const _items = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CART_KEY) || '[]'
    )

    if (!Array.isArray(_items)) {
      return false
    }

    if (_items.length === 0) {
      localStorage.setItem(
        LOCAL_STORAGE_CART_KEY,
        JSON.stringify([{ id, size, count: 1 }])
      )
      return true
    }

    const existedItemIdx = _items.findIndex(
      item => item.id === id && item.size === size
    )
    if (existedItemIdx >= 0) {
      _items[existedItemIdx].count += 1
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(_items))
      return true
    }

    _items.push({ id, size, count: 1 })
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(_items))
    return true
  },
  decrease(id: number, size: string): boolean {
    const _items = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CART_KEY) || '[]'
    )

    if (!Array.isArray(_items)) {
      return false
    }

    const existedItemIdx = _items.findIndex(
      item => item.id === id && item.size === size
    )
    if (existedItemIdx >= 0 && _items[existedItemIdx].count > 1) {
      _items[existedItemIdx].count -= 1
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(_items))
      return true
    }

    return false
  },
  delete(id: number, size: string): boolean {
    const _items = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CART_KEY) || '[]'
    )

    if (!Array.isArray(_items)) {
      return false
    }

    const existedItemIdx = _items.findIndex(
      item => item.id === id && item.size === size
    )

    if (existedItemIdx >= 0) {
      _items.splice(existedItemIdx, 1)
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(_items))
      return true
    }

    return false
  },
  deleteAll() {
    localStorage.removeItem(LOCAL_STORAGE_CART_KEY)
  },
  getAll() {
    const _items = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CART_KEY) || '[]'
    )
    return _items
  },

  getSession() {
    const session = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)
    if (!session) {
      const hash = uuidv4()
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, hash)
      return hash
    }

    return session
  }
}

export const useCartStore = defineStore('cart', () => {
  const cart: Ref<ICart | undefined> = ref()
  const userSession = process.server ? '' : cartStorageProvider.getSession()

  async function fetchCartItems() {
    if (!userSession) {
      return { data: ref(undefined), error: true }
    }
    try {
      const { data, error, refresh, execute } = await useApiRequest<ICart>(
        `/api/cart/${userSession}`
      )

      if (data?.value && !error.value) {
        cart.value = data.value as ICart
      }

      return { error, refresh, execute }
    } catch (error) {
      console.log(error)
      return { error }
    }
  }

  async function addItem(id: number, weightId: number, amount = 1) {
    try {
      await useApiRequest(`/api/cart/update`, {
        method: 'POST',
        body: {
          session_id: userSession,
          amount,
          action: 'add_amount',
          product_id: id,
          productPrice_id: weightId
        }
      })

      await fetchCartItems()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function removeItem(id: number, weightId: number, amount = 1) {
    try {
      await useApiRequest(`/api/cart/update`, {
        method: 'POST',
        body: {
          session_id: userSession,
          amount,
          action: 'remove_amount',
          product_id: id,
          productPrice_id: weightId
        }
      })

      await fetchCartItems()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function deleteItem(id: number, weightId: number, amount = 1) {
    try {
      await useApiRequest(`/api/cart/update`, {
        method: 'POST',
        body: {
          session_id: userSession,
          amount,
          action: 'delete_product',
          product_id: id,
          productPrice_id: weightId
        }
      })

      await fetchCartItems()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function createOrder({
    phone,
    email,
    customerName,
    orderComment,
    deliveryTypeId,
    deliveryAddress,
    deliveryComment,
    paymentTypeId,
    isNewUser
  }: {
    phone: string
    email: string
    customerName: string
    orderComment: string
    deliveryTypeId: number | string | undefined
    deliveryAddress: string
    deliveryComment: string
    paymentTypeId: number | string | undefined
    isNewUser: boolean
  }) {
    try {
      const { error } = await useApiRequest('/api/order/create', {
        method: 'POST',
        body: {
          session_id: userSession,
          phone,
          email,
          customer_name: customerName,
          order_comment: orderComment,
          delivery_type_id: deliveryTypeId,
          delivery_address: deliveryAddress,
          delivery_comment: deliveryComment,
          payment_type_id: paymentTypeId,
          new_user: isNewUser
        }
      })

      if (error.value) {
        return { status: false, error }
      }

      cart.value = undefined
      return { status: true, error }
    } catch (error) {
      console.log(error)

      return { error, status: false }
    }
  }

  return {
    cart,
    addItem,
    removeItem,
    deleteItem,
    createOrder,
    fetchCartItems
  }
})
