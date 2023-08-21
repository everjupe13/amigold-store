import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { type Ref, ref } from 'vue'

import { useHttp } from '@/composables/useHttp'

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
    try {
      const _fetchReturn = await useHttp(`/cart/${userSession}`, {
        method: 'GET'
      })

      if (_fetchReturn.data?.value) {
        cart.value = _fetchReturn.data?.value as ICart
        return _fetchReturn.data?.value as ICart
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function addItem(id: number, weightId: number) {
    try {
      await useHttp(`/cart/update`, {
        method: 'POST',
        body: {
          session_id: userSession,
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

  async function removeItem(id: number, weightId: number) {
    try {
      await useHttp(`/cart/update`, {
        method: 'POST',
        body: {
          session_id: userSession,
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

  async function deleteItem(id: number, weightId: number) {
    try {
      await useHttp(`/cart/update`, {
        method: 'POST',
        body: {
          session_id: userSession,
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
    email,
    name,
    phone,
    comment
  }: {
    email: string
    name: string
    phone: string
    comment: string
  }) {
    try {
      await useHttp('/order/create', {
        method: 'POST',
        body: {
          session_id: userSession,
          email,
          phone,
          userName: name,
          ...(comment ? { orderComment: comment } : {})
        }
      })

      cart.value = undefined
      return cart.value
    } catch (error) {
      console.log(error)
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
