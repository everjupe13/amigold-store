<script lang="ts" setup>
import dayjs, { extend, locale } from 'dayjs'
import ru from 'dayjs/locale/ru'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'

const pageData = {
  date: new Date().toISOString(),
  image: '/images/news/dog.jpg'
}

locale(ru)
extend(localizedFormat)
extend(customParseFormat)
extend(advancedFormat)
const dateStamp = dayjs(pageData.date).format('D MMM, YYYY')
</script>

<template>
  <section class="pb-100 pt-25">
    <AppContainer>
      <div class="m-auto max-w-[800px]">
        <div class="mb-5 font-inter text-dark opacity-60 text-bold-14">
          {{ dateStamp }}
        </div>

        <h1 class="mb-10 leading-tight text-extrabold-64">Enim convallis</h1>

        <p class="max-w-[350px] font-inter text-dark text-medium-16">
          Eu leo pellentesque sit aliquet scelerisque mauris. Enim convallis sed
          est dolor.
        </p>

        <div
          class="my-40 flex aspect-[calc(800/450)] max-h-[450px] items-center justify-center overflow-hidden rounded-[14px] bg-button"
        >
          <img
            :src="pageData.image"
            alt=""
            class="pointer-events-none relative z-[1] block h-full w-full select-none object-cover transition duration-200 group-hover:scale-110"
          />
        </div>

        <div
          class="content font-inter leading-normal text-black/80 text-medium-16"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur. Erat orci sem non luctus sit
            sit. Hendrerit at tincidunt molestie orci. Sit fringilla gravida
            adipiscing dictum dui egestas eu vitae. Consequat donec odio ipsum
            mauris diam. Aliquam elementum aliquet risus augue augue venenatis
            vitae.
          </p>
          <p>
            Faucibus quam molestie vel ac pretium morbi amet duis scelerisque.
            Lectus erat tellus aliquet neque risus nisl. Nisl sagittis duis
            convallis dictum rutrum faucibus lobortis.
          </p>
          <p>
            Faucibus quam molestie vel ac pretium morbi amet duis scelerisque.
            Lectus erat tellus aliquet neque risus nisl. Nisl sagittis duis
            convallis dictum rutrum faucibus lobortis.
          </p>
          <p>
            Hendrerit vitae quis at ultrices faucibus porttitor diam. Volutpat
            sollicitudin dictum velit etiam mattis. Pretium nibh pharetra
            elementum cras. Mauris consectetur nunc mauris semper vivamus est
            vulputate tincidunt. Lorem convallis mauris non tortor suspendisse
            pellentesque cras.
          </p>
          <p>
            Pharetra aliquet tempus egestas nunc viverra. At amet etiam nibh
            auctor. Et convallis leo amet egestas laoreet amet pellentesque
            dignissim. Imperdiet laoreet nibh a consectetur cum auctor
            condimentum. Hac eu diam viverra ac nec orci ultrices bibendum
            vestibulum.
          </p>
          <p class="">
            <strong>
              <em>
                Tincidunt eu pretium ultrices sociis. Nec quam aliquam phasellus
                vitae faucibus etiam. Pellentesque ultrices nam phasellus vel
                dui suspendisse faucibus ipsum. Ultricies odio lectus nec
                natoque. Pellentesque et id facilisis sed purus ullamcorper
                quisque id.
              </em>
            </strong>
          </p>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.content {
  p:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
