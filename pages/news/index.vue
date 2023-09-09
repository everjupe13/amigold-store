<script lang="ts" setup>
import { useBlogStore } from '@/store/blog/blog.store'

const blogStore = useBlogStore()
await blogStore.fetchBlog()
</script>

<template>
  <section class="py-40">
    <AppContainer>
      <AppBreadcrumbs :crumbs="[{ label: 'Новости' }]"></AppBreadcrumbs>
    </AppContainer>
  </section>

  <section class="pb-100">
    <AppContainer>
      <div
        class="header-grid relative z-[2] mb-40 grid grid-cols-3 md:grid-cols-[1fr_auto]"
      >
        <div class="heading-title md:mb-20">
          <h1 class="title">Новости</h1>
        </div>
        <div
          class="filters flex items-center justify-center gap-10 md:flex-col md:items-start md:justify-normal"
        >
          <button
            class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16 active:translate-y-2"
          >
            Собаки
          </button>
          <button
            class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16 active:translate-y-2"
          >
            Кошки
          </button>
          <button
            class="flex items-center justify-center whitespace-nowrap rounded-[100px] bg-button px-20 py-16 leading-none transition text-bold-16 active:translate-y-2"
          >
            Попугаи
          </button>
        </div>
        <div
          class="controls self-center justify-self-end md:self-stretch md:justify-self-auto"
        >
          <div
            class="flex items-center gap-x-20 md:h-full md:flex-col-reverse md:justify-between md:gap-y-10"
          ></div>
        </div>
      </div>

      <div class="mb-20 grid grid-cols-3">
        <div class="self-center justify-self-end"></div>
      </div>
      <template
        v-if="Array.isArray(blogStore.blog) && blogStore.blog.length > 0"
      >
        <div class="grid grid-cols-3 gap-x-20 gap-y-60 md:grid-cols-1">
          <AppBlogCard
            v-for="blog in blogStore.blog"
            :key="blog.id"
            v-bind="blog"
          ></AppBlogCard>
        </div>
      </template>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.header-grid {
  grid-template-areas: 'a a' 'b c';

  .heading-title {
    @media (max-width: 991.99px) {
      grid-area: 'a';
    }
  }
  .filters {
    @media (max-width: 991.99px) {
      grid-area: b;
    }
  }

  .controls {
    @media (max-width: 991.99px) {
      grid-area: c;
    }
  }
}
</style>
