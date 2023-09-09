<script lang="ts" setup>
import ProfileAddress from './ProfileAddress.vue'
import ProfileHistory from './ProfileHistory.vue'
import ProfilePartner from './ProfilePartner.vue'
import ProfileUserForm from './ProfileUserForm.vue'

const categories = reactive([
  {
    title: 'Личные данные',
    component: shallowRef(ProfileUserForm),
    cssClasses: 'max-w-[800px]',
    isActiveTab: true,
    id: 0
  },
  {
    title: 'Адреса доставки',
    component: shallowRef(ProfileAddress),
    cssClasses: 'max-w-[800px]',
    isActiveTab: false,
    id: 1
  },
  {
    title: 'Заказы',
    component: shallowRef(ProfileHistory),
    cssClasses: '',
    isActiveTab: false,
    id: 2
  },
  {
    title: 'Контрагенты',
    component: shallowRef(ProfilePartner),
    cssClasses: 'max-w-[800px]',
    isActiveTab: false,
    id: 3
  }
])

const activeTabData = computed(
  () =>
    categories.find(category => category.isActiveTab) || {
      id: -1,
      cssClasses: '',
      component: shallowRef(ProfileUserForm)
    }
)

const onChangeTab = (id: number) => {
  categories.forEach((category, idx) => {
    if (category.id === id) {
      // eslint-disable-next-line unicorn/prefer-logical-operator-over-ternary
      categories[idx].isActiveTab = category.isActiveTab
        ? category.isActiveTab
        : !category.isActiveTab

      return
    }

    categories[idx].isActiveTab = false
  })
}
</script>

<template>
  <div
    class="scroll-x-hidden mb-45 flex flex-wrap gap-x-6 sm:mb-40 sm:flex-nowrap sm:gap-x-5 sm:overflow-x-scroll sm:px-10 sm:py-10 xs:mx-[-16px]"
  >
    <template
      v-for="category in categories"
      :key="category.id + '-' + Date.now()"
    >
      <div class="w-full min-w-min max-w-max flex-shrink-0 flex-grow">
        <AppButton
          theme="black"
          class="w-full sm:!rounded-[5px]"
          :outlined="!category.isActiveTab"
          @click="onChangeTab(category.id)"
        >
          {{ category.title }}
        </AppButton>
      </div>
    </template>
  </div>
  <div>
    <component
      :is="activeTabData!.component"
      :key="activeTabData!.id"
      :class="activeTabData!.cssClasses"
    ></component>
  </div>
</template>
