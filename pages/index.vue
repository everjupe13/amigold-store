<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

useHead({
  title: 'as'
})

const store = useCounterStore()
const count = computed(() => store.getCount)

const { increment } = store
const todos = await useFetch('https://jsonplaceholder.typicode.com/todos/1')
console.log(todos.data.value)
</script>

<template>
  <div>
    <h1>Welcome to the homepage</h1>
    {{ todos.data.value }}
    <AppButton type="button" @click="increment">ddd</AppButton>
    <p>Counter: {{ count }}</p>
  </div>
</template>
