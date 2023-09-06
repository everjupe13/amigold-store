<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router'

interface IAppBreadcrumbLink {
  label: string
  toLink?: RouteLocationRaw
}

interface IAppBreadcrumbsComponent {
  crumbs?: IAppBreadcrumbLink[]
}

const baseBreadcrumb: IAppBreadcrumbLink = {
  label: 'Главная',
  toLink: '/'
}

const props = withDefaults(defineProps<IAppBreadcrumbsComponent>(), {
  crumbs: () => []
})

const breads = computed<IAppBreadcrumbLink[]>(() => {
  return [baseBreadcrumb, ...props.crumbs]
})

const isLastCrumb = (index: number) => {
  return index === breads.value.length - 1
}

const determineCrumbsComponent = (index: number) => {
  return !isLastCrumb(index) && breads.value.length !== 1
    ? defineNuxtLink({})
    : 'span'
}
</script>

<template>
  <div class="tw-flex">
    <span class="!leading-none text-bold-16">
      <span v-for="(crumb, index) in breads" :key="crumb.label">
        <component
          :is="determineCrumbsComponent(index)"
          :to="!isLastCrumb(index) ? crumb?.toLink : ''"
          :class="[{ 'text-black/50': !isLastCrumb(index) }]"
        >
          {{ crumb.label }}
        </component>
        <span v-if="!isLastCrumb(index)" class="px-3 text-black/50">
          {{ ' – ' }}
        </span>
      </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.bread-link {
  color: #808e95;

  &_pured {
    color: #0b2630;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
  }
}
</style>
