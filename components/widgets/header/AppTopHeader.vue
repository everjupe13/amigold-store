<template>
  <div>
    <AppContainer>
      <nav class="flex items-center justify-between">
        <ul class="flex items-center gap-x-20">
          <li>
            <NuxtLink to="/contact" class="tracking-[-0.36px]">
              Контакты
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/pay" class="tracking-[-0.36px]">
              Доставка и оплата
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/partner" class="tracking-[-0.36px]">
              Партнерам
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="tracking-[-0.36px]">О нас</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/news" class="tracking-[-0.36px]">Новинки</NuxtLink>
          </li>
        </ul>
        <ul class="flex items-center gap-x-10">
          <li>
            <a
              href=""
              target="_blank"
              rel="noopener norefferer nofollow"
              class="flex items-center justify-center"
            >
              <img
                src="~/assets/img/icons/dzen.png"
                alt=""
                class="block h-28 w-28"
              />
            </a>
          </li>
          <li>
            <a
              href=""
              target="_blank"
              rel="noopener norefferer nofollow"
              class="flex items-center justify-center"
            >
              <img
                src="~/assets/img/icons/vk.png"
                alt=""
                class="block h-28 w-28"
              />
            </a>
          </li>
          <li>
            <a
              href=""
              target="_blank"
              rel="noopener norefferer nofollow"
              class="flex items-center justify-center"
            >
              <img src="~/assets/img/icons/tg.svg" alt="" class="block" />
            </a>
          </li>
          <li>
            <a
              href=""
              target="_blank"
              rel="noopener norefferer nofollow"
              class="flex items-center justify-center"
            >
              <img src="~/assets/img/icons/yt.svg" alt="" class="block" />
            </a>
          </li>
        </ul>
      </nav>
    </AppContainer>
  </div>
</template>
