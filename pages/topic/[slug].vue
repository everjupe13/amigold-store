<!-- eslint-disable import/no-named-as-default-member -->
<script lang="ts" setup>
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { INews } from 'store/blog/blog.types'

import { useBlogStore } from '@/store/blog/blog.store'

// const pageData = {
//   date: new Date().toISOString(),
//   image: '/images/news/dog.jpg'
// }

dayjs.locale(ru)
dayjs.extend(localizedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)

const route = useRoute()
const blogStore = useBlogStore()
const isCartLoading = ref(false)

isCartLoading.value = true
await blogStore.fetchCertainNews(route.params.slug as string)
isCartLoading.value = false

const articleData: Ref<INews | null> = computed(() => blogStore.news)

const dateStamp = computed(() =>
  articleData.value?.createdAt
    ? dayjs(articleData.value.createdAt).format('D MMM, YYYY')
    : ''
)
</script>

<template>
  <section class="pb-100 pt-25">
    <AppContainer>
      <AppBreadcrumbs
        :crumbs="[
          { label: 'Полезное', toLink: '/topics' },
          { label: articleData?.name || '' }
        ]"
        class="mb-40"
      />

      <template v-if="isCartLoading">
        <div class="flex h-[400px] items-center justify-center">
          <AppSpinner />
        </div>
      </template>
      <div class="m-auto max-w-[800px]">
        <div class="mb-5 font-inter text-dark opacity-60 text-bold-14">
          {{ dateStamp }}
        </div>

        <h1 class="mb-10 leading-[1.1] text-extrabold-48">
          {{ articleData?.name || '' }}
        </h1>

        <div
          class="my-40 flex aspect-[calc(800/450)] max-h-[450px] items-center justify-center overflow-hidden rounded-[14px] bg-button"
        >
          <img
            v-if="articleData?.image"
            :src="articleData.image"
            :alt="articleData?.name"
            class="pointer-events-none relative z-[1] block h-full w-full select-none object-cover transition duration-200 group-hover:scale-110"
          />
        </div>

        <div
          v-if="articleData?.description"
          class="content font-inter leading-normal text-black/80 text-medium-16"
          v-html="articleData?.description"
        ></div>
      </div>
    </AppContainer>
  </section>
</template>
