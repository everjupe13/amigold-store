<script lang="ts" setup>
type Props = {
  size?: number
}
const props = withDefaults(defineProps<Props>(), {
  size: 60
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
    :viewBox="`0 0 90 90`"
    class="animate-spin text-yellow"
    fill="none"
  >
    <g clip-path="url(#clip0_314_34)">
      <path
        opacity="0.5"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M45 15C28.4315 15 15 28.4315 15 45C15 61.5685 28.4315 75 45 75C61.5685 75 75 61.5685 75 45C75 28.4315 61.5685 15 45 15ZM0 45C0 20.1472 20.1472 0 45 0C69.8528 0 90 20.1472 90 45C90 69.8528 69.8528 90 45 90C20.1472 90 0 69.8528 0 45Z"
        fill="currentColor"
      />
      <path
        d="M15 45C15 37.0435 18.1607 29.4129 23.7868 23.7868C29.4129 18.1607 37.0435 15 45 15V0C20.1488 0 0 20.1488 0 45H15ZM22.5 64.8413C17.6558 59.3684 14.9873 52.3088 15 45H0C0 56.4075 4.25625 66.84 11.25 74.7675L22.5 64.8413Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_314_34">
        <rect width="90" height="90" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
</template>
