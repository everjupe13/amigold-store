<script lang="ts" setup>
type Props = {
  title?: string
  city?: string
  street?: string
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  city: '',
  street: ''
})
</script>

<template>
  <form class="rounded-[24px] bg-gray p-20" @submit.prevent>
    <div class="flex">
      <div class="flex-grow flex-col gap-y-10">
        <div class="max-w-[300px]">
          <h3
            class="mb-12 font-inter leading-none text-medium-16"
            :class="{ 'h-18 animate-pulse bg-white': !props.title }"
          >
            {{ props.title }}
          </h3>
          <p
            class="mb-12 font-inter leading-none text-medium-16"
            :class="{ 'h-18 animate-pulse bg-white': !props.city }"
          >
            {{ props.city }}
          </p>
          <p
            class="font-inter leading-none text-medium-16"
            :class="{ 'h-18 animate-pulse bg-white': !props.street }"
          >
            {{ props.street }}
          </p>
        </div>
      </div>
      <div class="flex-shrink-0">
        <div class="flex gap-x-10">
          <template v-if="props.title && props.street && props.city">
            <AppButton theme="gray" class="!px-20 !py-12">
              Редактировать
            </AppButton>
            <AppButton theme="gray" class="!h-46 !w-46 !p-16">
              <CrossIcon></CrossIcon>
            </AppButton>
          </template>
        </div>
      </div>
    </div>
  </form>
</template>
