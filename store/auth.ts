import { defineStore } from 'pinia'

export const useAuthStore = defineStore('store', () => {
  console.log(localStorage.getItem('x-token'))
  const token = ref(null)
  const isAuth = computed(() => token !== null)

  return { token, isAuth }
})
