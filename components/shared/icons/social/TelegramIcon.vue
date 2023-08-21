<script lang="ts" setup>
type Props = {
  size?: number
}
const props = withDefaults(defineProps<Props>(), {
  size: 28
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14Z"
      fill="white"
    />
    <path
      d="M9.91833 15.5364L6.63964 14.513C5.93101 14.2957 5.92679 13.8081 6.79831 13.4578L19.5729 8.52336C20.3138 8.22004 20.7351 8.60326 20.4949 9.55875L18.3191 19.8242C18.1676 20.5545 17.7271 20.7284 17.1171 20.3913L13.769 17.914L12.2086 19.4199C12.0482 19.5747 11.9178 19.7076 11.6721 19.741C11.4262 19.7742 11.2236 19.7015 11.0763 19.2939L9.93493 15.5259L9.91833 15.5364Z"
      fill="#336F3F"
    />
  </svg>
</template>
