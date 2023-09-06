<template>
  <div class="relative h-[580px] py-80 md:h-[580px]">
    <div class="relative z-[2] max-w-[800px]">
      <h1
        class="mb-35 leading-none tracking-[-1.28px] text-black text-extrabold-52 md:text-extrabold-32"
      >
        <slot name="title"></slot>
      </h1>
      <p class="max-w-[500px] leading-tight text-bold-22 md:text-bold-16">
        <slot name="text"></slot>
      </p>
    </div>
    <div
      class="absolute right-0 top-1/2 z-[1] block -translate-y-1/2 md:hidden"
    >
      <slot name="image"></slot>
    </div>
  </div>
</template>
