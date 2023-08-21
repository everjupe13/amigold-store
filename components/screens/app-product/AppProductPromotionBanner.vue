<template>
  <div class="overflow-hidden rounded-[24px] bg-pale">
    <div
      class="grid place-items-center bg-[url(@/assets/img/product-page/banner-bg.png)] bg-cover bg-center bg-no-repeat p-20"
    >
      <p class="!leading-none text-extrabold-18">
        <slot></slot>
      </p>
    </div>
  </div>
</template>
