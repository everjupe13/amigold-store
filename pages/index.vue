<script setup lang="ts">
import { useModal } from 'vue-final-modal'

import FeedbackFormModal from '@/components/widgets/modals/feedback/FeedbackFormModal.vue'
import { useBlogStore } from '@/store/blog/blog.store'
import { useCatalogStore } from '@/store/catalog'

useHead({
  title: 'Главная'
})

const { open: openFeedbackModal, close: closeFeedbackModal } = useModal({
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
</script>

<template>
  <div>
    <section class="bg-gray">
      <AppContainer>
        <HomePromoSlider>
          <template #controls>
            <AppButton theme="default" @click="openFeedbackModal">
              Получить консультацию
            </AppButton>
          </template>
        </HomePromoSlider>
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
        <h2 class="title relative z-[2] mb-40">Услуги которые мы предлагаем</h2>
        <div class="mb-40 grid grid-cols-4 gap-20 md:grid-cols-1">
          <ServicesCard
            v-bind="{
              image: '/images/home/icons/groom.svg',
              title: 'Стрижка',
              textBody:
                'Lacinia dui est sed sodales nec commodo rhoncus arcu eu. Urna ut at malesuada neque massa.'
            }"
          ></ServicesCard>
          <ServicesCard
            v-bind="{
              image: '/images/home/icons/home.svg',
              title: 'Приют',
              textBody:
                'Blandit nisl elit malesuada elementum. Et fialle urus kut lectus amet pharetra ut.'
            }"
          ></ServicesCard>
          <ServicesCard
            v-bind="{
              image: '/images/home/icons/learning.svg',
              title: 'Дрессировка',
              textBody:
                'Pellentesque nunc tristique et iaculis. Nec arcu tempor praesent odio sed nibh sed aliquet semper.'
            }"
          ></ServicesCard>
          <ServicesCard
            v-bind="{
              image: '/images/home/icons/doctor.svg',
              title: 'Ветеринария',
              textBody:
                'Eu leo pellentesque sit aliquet scelerisque mauris. Enim convallis sed est dolor.'
            }"
          ></ServicesCard>
        </div>
        <div class="flex items-center justify-center">
          <AppButton outlined class="md:w-full" @click="openFeedbackModal">
            Оставить заявку
          </AppButton>
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
        <div class="mb-40 grid grid-cols-3 gap-20 md:grid-cols-1">
          <AppTopicCard
            v-for="data in topics"
            :key="data.id"
            :image="data.image"
            :read-time="data.readTime"
            :title="data.name"
            :text-body="data.shortDescription"
            :article-label="data.category.name"
            :slug="data.slug"
          ></AppTopicCard>
        </div>
      </AppContainer>
    </section>
  </div>
</template>
