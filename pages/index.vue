<script setup lang="ts">
import { useModal } from 'vue-final-modal'

import FeedbackFormModal from '@/components/widgets/modals/feedback/FeedbackFormModal.vue'
import { useBlogStore } from '@/store/blog/blog.store'
import { useCatalogStore } from '@/store/catalog'
import { useBanners } from '@/store/home/useBanners'
import { useTopBanners } from '@/store/home/useTopBanners'

useHead({
  title: 'Главная'
})

const { open: _openFeedbackModal, close: closeFeedbackModal } = useModal({
  component: FeedbackFormModal,
  attrs: {
    onConfirm() {
      closeFeedbackModal()
    }
  }
})

const catalogStore = useCatalogStore()
const isCategoriesFetching = ref(false)

isCategoriesFetching.value = true
await catalogStore.fetchCategories()
isCategoriesFetching.value = false

const blogStore = useBlogStore()
await blogStore.fetchBlog()
await blogStore.fetchTopics()

const news = computed(() => blogStore.blog?.slice(0, 3) || [])
const topics = computed(() => blogStore.topics?.slice(0, 3) || [])

const bannerStore = useTopBanners()
await bannerStore.fetchBanners()

const servicesBannerStore = useBanners()
await servicesBannerStore.fetchBanners()
</script>

<template>
  <div>
    <section class="bg-gray">
      <AppContainer>
        <HomePromoSlider :banners="bannerStore.data" />
      </AppContainer>
    </section>

    <section class="py-[120px]">
      <AppContainer>
        <div
          class="mb-40 flex flex-col-reverse gap-y-40 md:mb-30 md:flex-col md:gap-y-20"
        >
          <HomeCatalogSlider>
            <template #title>
              <h1 class="title">Новинки</h1>
            </template>
          </HomeCatalogSlider>
        </div>
      </AppContainer>
    </section>

    <section class="bg-waved-t bg-waved-b !py-60">
      <AppContainer>
        <h2 class="title relative z-[2] mb-40">Категории</h2>
        <template v-if="isCategoriesFetching">
          <div class="flex justify-center">
            <AppSpinner />
          </div>
        </template>
        <template v-else>
          <div class="mb-40 grid grid-cols-6 gap-20 md:grid-cols-1 md:gap-15">
            <HomeCategoriesCard
              v-for="(category, index) in catalogStore.categories"
              :key="index"
              v-bind="category"
              style="--skeleton-loader-bg: #dbdbdb"
            ></HomeCategoriesCard>
          </div>
        </template>
      </AppContainer>
    </section>

    <section class="py-[120px]">
      <AppContainer>
        <h2 class="title relative z-[2] mb-40">Акции и предложения</h2>
        <div class="mb-40 grid grid-cols-3 gap-20 md:grid-cols-1">
          <div
            v-for="banner in servicesBannerStore.data"
            :key="banner.id"
            class="relative flex h-[340px] overflow-hidden rounded-[24px] bg-[#005246] p-30 text-white md:p-15"
          >
            <div class="relative z-[2] flex flex-grow flex-col justify-between">
              <button
                class="group relative mt-auto flex max-w-max items-center gap-x-8 text-white transition-all duration-500 hover:translate-x-[10px] md:hover:translate-x-0"
              >
                <span class="relative z-[1]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    class="transition-all group-hover:rotate-45"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM13.083 14.3335H15.8986L12.1991 18.0329C11.711 18.5211 11.711 19.3126 12.1991 19.8007C12.6873 20.2889 13.4787 20.2889 13.9669 19.8007L17.6663 16.1013V18.9168C17.6663 19.6072 18.226 20.1668 18.9163 20.1668C19.6067 20.1668 20.1663 19.6072 20.1663 18.9168V13.0835C20.1663 12.752 20.0346 12.434 19.8002 12.1996C19.5658 11.9652 19.2479 11.8335 18.9163 11.8335H13.083C12.3927 11.8335 11.833 12.3931 11.833 13.0835C11.833 13.7739 12.3927 14.3335 13.083 14.3335Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span class="relative z-[1] text-[18px] font-bold leading-none">
                  Подробнее
                </span>
                <a
                  v-if="banner.url"
                  :href="banner.url"
                  class="absolute inset-0 z-[2] block"
                ></a>
              </button>
            </div>

            <img
              class="absolute inset-0 block h-full w-full rounded-[5px] object-cover"
              :src="banner.image"
              alt=""
            />
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="bg-waved-t bg-waved-b !py-60">
      <AppContainer>
        <div class="mb-40 flex items-center justify-between gap-10">
          <h2 class="title relative z-[2]">Новости</h2>
          <NuxtLink
            class="flex rounded-full border-2 border-white bg-white px-20 py-16 font-inter leading-none text-bold-16 active:translate-y-2"
            to="/news"
          >
            Показать все
          </NuxtLink>
        </div>
        <template v-if="Array.isArray(news) && news.length > 0">
          <div class="grid grid-cols-3 gap-x-20 gap-y-60 md:grid-cols-1">
            <AppBlogCard
              v-for="blog in news"
              :key="blog.id"
              v-bind="blog"
              style="--skeleton-loader-bg: #dbdbdb"
            ></AppBlogCard>
          </div>
        </template>
      </AppContainer>
    </section>

    <section class="py-[120px]">
      <AppContainer>
        <h2 class="title relative z-[2] mb-40">Полезное</h2>
        <div
          v-if="Array.isArray(topics) && topics.length > 0"
          class="mb-40 grid grid-cols-3 gap-20 md:grid-cols-1"
        >
          <AppTopicCard
            v-for="data in topics"
            :key="data.id"
            :image="data.image"
            :read-time="data.readTime"
            :title="data.name"
            :text-body="data.shortDescription"
            :article-label="data.category?.name || ''"
            :slug="data.slug"
          ></AppTopicCard>
        </div>
        <div v-else class="flex h-60 items-center justify-center">
          <p class="py-30 text-center text-bold-24">Пусто</p>
        </div>
      </AppContainer>
    </section>
  </div>
</template>
