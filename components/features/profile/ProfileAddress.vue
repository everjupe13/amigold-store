<script lang="ts" setup></script>

<template>
  <div>
    <AppButton class="mb-20">Добавить новый адрес</AppButton>

    <div class="grid grid-cols-1 gap-y-20">
      <ProfileAddressCard
        v-bind="{
          title: 'Иванов Иван',
          city: 'г. Москва 450078',
          street: 'ул. Тверская 12, кв-2'
        }"
      ></ProfileAddressCard>
      <ProfileAddressCard
        v-bind="{
          title: 'Иван Иваныч',
          city: 'г. Санкт-Петербург 570078 ',
          street: 'ул. Пушкина 12, кв-2'
        }"
      ></ProfileAddressCard>
    </div>
  </div>
</template>
