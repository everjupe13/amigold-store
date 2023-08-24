<script lang="ts" setup>
type Props = {
  id?: number
  name?: string
  taxLaw?: string
  inn?: string
  bik?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  id: -1,
  name: '',
  taxLaw: '',
  inn: '',
  bik: () => []
})
const emits = defineEmits(['edit', 'delete'])
</script>

<template>
  <form class="rounded-[24px] bg-gray p-20" @submit.prevent>
    <div class="flex">
      <div class="flex-grow flex-col">
        <p class="mb-20 leading-none text-bold-24">{{ `#${props.id + 1}` }}</p>
        <div class="max-w-[500px]">
          <div class="mb-24 flex items-center gap-x-10">
            <h3 class="font-inter leading-none text-medium-16">
              {{ props.name }}
            </h3>
            <div
              class="rounded-full bg-[#2E1C19] px-14 py-3 text-white text-bold-12"
            >
              {{ props.taxLaw }}
            </div>
          </div>
          <p
            v-if="props.inn"
            class="mb-12 font-inter leading-none text-medium-16"
          >
            <span>ИНН:{{ ' ' }}</span>
            <span class="text-black/60">
              {{ props.inn }}
            </span>
          </p>
          <template v-if="props.bik.length > 0">
            <p
              v-for="(bikCode, index) in bik"
              :key="index"
              class="mb-12 font-inter leading-none text-medium-16 last:mb-0"
            >
              <span>БИК:{{ ' ' }}</span>
              <span class="text-black/60">
                {{ bikCode }}
              </span>
            </p>
          </template>
        </div>
      </div>
      <div class="flex-shrink-0">
        <div class="flex gap-x-10">
          <template v-if="props.name">
            <AppButton
              theme="gray"
              class="!px-20 !py-12"
              @click="emits('edit', props.id)"
            >
              Редактировать
            </AppButton>
            <AppButton
              theme="gray"
              class="!h-46 !w-46 !p-16"
              @click="emits('delete', props.id)"
            >
              <CrossIcon></CrossIcon>
            </AppButton>
          </template>
        </div>
      </div>
    </div>
  </form>
</template>
