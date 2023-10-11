<script lang="ts" setup>
type Props = {
  id: number
  images: [
    {
      id: number
      image: string
      feedback: number
    }
  ]
  text: string
  name: string
}

const props = defineProps<Props>()
</script>

<template>
  <article class="min-h-[120px] rounded-[20px] bg-[#E7ECEE] p-32 md:p-20">
    <div class="mb-14 flex items-center justify-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="22"
        viewBox="0 0 26 22"
        fill="none"
      >
        <path
          d="M9.5 2.2457C9.5 2.69218 9.19176 3.07055 8.81579 3.31138C6.85854 4.56514 6.16883 8.42806 6.02857 11.002C5.99852 11.5534 6.44772 12 7 12H9C9.55229 12 10 12.4477 10 13V21C10 21.5523 9.55228 22 9 22H1C0.447715 22 0 21.5523 0 21V12.0042C0 12.0019 0.00190031 12 0.00424446 12C0.00653312 12 0.00841178 11.9981 0.00848929 11.9958C0.236719 5.2611 5.0167 1.71961 8.27203 0.411917C8.88045 0.167511 9.5 0.641531 9.5 1.2972V2.2457Z"
          fill="#0E3D4D"
        />
        <path
          d="M25.5 2.2457C25.5 2.69218 25.1918 3.07055 24.8158 3.31138C22.8585 4.56514 22.1688 8.42806 22.0286 11.002C21.9985 11.5534 22.4477 12 23 12H25C25.5523 12 26 12.4477 26 13V21C26 21.5523 25.5523 22 25 22H17C16.4477 22 16 21.5523 16 21V12.0042C16 12.0019 16.0019 12 16.0042 12C16.0065 12 16.0084 11.9981 16.0085 11.9958C16.2367 5.2611 21.0167 1.71961 24.272 0.411917C24.8804 0.167511 25.5 0.641531 25.5 1.2972V2.2457Z"
          fill="#0E3D4D"
        />
      </svg>
    </div>
    <div>
      <p
        v-if="props.text"
        class="mb-24 text-[15px] font-medium text-[#3C5159]"
        v-html="props.text"
      ></p>
      <div
        v-if="props.images && props.images.length > 0"
        class="mb-25 flex w-full items-center justify-between gap-x-10"
      >
        <div
          v-for="image in props.images"
          :key="image.id || Date.now()"
          class="flex-shrink"
        >
          <img
            :src="image.image"
            class="block aspect-square rounded-[10px] object-cover"
            alt=""
          />
        </div>
      </div>
      <div class="flex items-center gap-x-12 first-letter:mb-22">
        <div
          class="flex h-56 w-56 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#3C5159]/50"
        >
          <!-- <img v-if="props.avatar" :src="props.avatar" alt="" /> -->
        </div>
        <div class="flex flex-col justify-center gap-y-5">
          <h3 class="text[16px] font-semibold leading-none text-[#172A04]">
            {{ props.name || '' }}
          </h3>
          <p class="text-[14px] font-medium leading-none text-[#3C5159]">
            <!-- {{ props.tour || '' }} -->
            {{ '' }}
          </p>
        </div>
      </div>
    </div>
  </article>
</template>
