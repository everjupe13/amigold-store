<script lang="ts" setup></script>

<template>
  <section class="pb-100 pt-25">
    <AppContainer>
      <AppBreadcrumbs
        :crumbs="[{ label: 'Главная', toLink: '/' }, { label: 'Контакты' }]"
        class="mb-40"
      />

      <div class="m-auto max-w-[800px]">
        <h1 class="mb-10 leading-tight text-extrabold-64">Контакты</h1>

        <div
          class="my-40 flex h-[300px] items-center justify-center overflow-hidden rounded-[14px] bg-button"
        >
          <iframe
            data-v-503ff790=""
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A91bb12754ddb2e92ee78d722ea52c292853d9c458b6818d4818ca79f5b608e33&amp;source=constructor"
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </div>

        <div
          class="content font-inter leading-normal text-black/80 text-medium-16"
        >
          <p>
            <strong>Забрать товар можно по адресу:</strong>
            г. Москва, Южнобутовская 29
          </p>

          <p><strong>т. 7(991)595-5199,&nbsp;7(977)834-4062</strong></p>

          <p><strong>Режим работы: пн-чт: с 9-00 до 16-30</strong></p>

          <p><strong>по пятницам до 15-30</strong></p>

          <p><strong>Выходные: суббота, воскресенье</strong></p>

          <p>
            <strong>Юр. Адрес:</strong>
            г. Москва, ул Ратная д 10, корп 2, помещение XIII
          </p>

          <p>
            ООО «Компания Амиго»
            <br />
            ИНН 7727316345
            <br />
            КПП 772701001
            <br />
            ОГРН: 1177746387301
            <br />
            ОКПО 15133468
            <br />
            Филиал "Центральный" БАНК ВТБ (ПАО)г Москва
            <br />
            р/сч 40702810210800000148
          </p>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
