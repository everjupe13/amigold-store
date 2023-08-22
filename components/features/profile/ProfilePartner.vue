<script lang="ts" setup></script>

<template>
  <div>
    <AppButton class="mb-20">Добавить</AppButton>

    <div class="grid grid-cols-1 gap-y-20">
      <ProfilePartnerCard
        v-bind="{
          id: 0,
          name: 'ИП Иванов Иван',
          taxLaw: 'Физлицо',
          inn: '937118153215',
          bik: ['4613 5361 5367 1289', '4616179']
        }"
      ></ProfilePartnerCard>
      <ProfilePartnerCard
        v-bind="{
          id: 1,
          name: 'ИП Роман Романов',
          taxLaw: 'Юрлицо',
          inn: '937118153215',
          bik: ['4613 5361 5367 1289', '4616179']
        }"
      ></ProfilePartnerCard>
    </div>
  </div>
</template>
