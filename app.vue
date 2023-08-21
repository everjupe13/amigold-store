<script setup lang="ts">
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, minimum-scale=1'
    },
    {
      name: 'author',
      content: 'bkrv | tg: @toomoresouls | email: bkrv.working.diary@gmail.com'
    }
  ],
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} | Amuro` : 'Amuro'
  }
  // script: [{ innerHTML: "console.log('Hello world')" }]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
