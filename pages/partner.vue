<script lang="ts" setup></script>

<template>
  <section class="pb-100 pt-25">
    <AppContainer>
      <AppBreadcrumbs :crumbs="[{ label: 'Партнерам' }]" class="mb-40" />

      <div class="m-auto max-w-[800px]">
        <h1 class="mb-10 leading-tight text-extrabold-64 md:text-extrabold-48">
          Партнерам
        </h1>

        <div class="font-inter leading-normal text-black/80 text-medium-16">
          <h2 class="mb-20 text-[20px] font-bold md:text-[18px]">
            Рационы AmiGold - полнорационные корма супер-премиум класса для
            кошек и собак.
          </h2>

          <div class="mb-30">
            <div class="mb-20">
              <p class="mb-5">Наши рационы это:</p>
              <ul class="mb-10 list-disc [&>li]:ml-15">
                <li>качественное сырье;</li>
                <li>
                  современное оборудование, отвечающее всем необходимым
                  стандартам;
                </li>
                <li>
                  сбалансированная рецептура, разработанная с учетом всех
                  потребностей питомцев;
                </li>
                <li>оптимальное соотношение цены и качества;</li>
              </ul>
            </div>

            <p class="text-[20px] font-bold md:text-[18px]">
              Мы рады новым друзьям!
            </p>
          </div>

          <div>
            <h3 class="mb-20 text-[26px] font-bold">
              Варианты сотрудничества:
            </h3>

            <div class="grid grid-cols-2 gap-x-30 gap-y-20 md:grid-cols-1">
              <article>
                <div
                  class="mb-10 flex aspect-[calc(800/400)] max-h-[450px] items-center justify-center overflow-hidden rounded-[8px] bg-button"
                >
                  <img
                    src="/images/news/dog.jpg"
                    alt="dog"
                    class="pointer-events-none relative z-[1] block h-full w-full select-none object-cover transition duration-200 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h3 class="mb-20 text-[24px] font-bold">
                    Создадим корм под вашей торговой маркой(СТМ)
                  </h3>
                  <p class="mb-5">
                    Хотите запустить свой продукт на рынок? Мы поможем избежать
                    хлопот и излишних денежных затрат! Просто свяжитесь с нами,
                    и мы построим производственный процесс от создания рецептуры
                    до упаковки под любой ваш запрос:
                  </p>
                  <ul class="mb-10 list-disc [&>li]:ml-15">
                    <li>Разработаем уникальную рецептуру;</li>
                    <li>
                      Изготовим корм, соответствующий всем мировым стандартам;
                    </li>
                    <li>
                      Обеспечим контроль качества на всех этапах производства;
                    </li>
                    <li>Разработаем дизайн упаковки;</li>
                    <li>Проконсультируем в вопросах продвижения продукта;</li>
                  </ul>
                </div>
              </article>

              <article>
                <div
                  class="mb-10 flex aspect-[calc(800/400)] max-h-[450px] items-center justify-center overflow-hidden rounded-[8px] bg-button"
                >
                  <img
                    src="/images/news/dog.jpg"
                    alt="dog"
                    class="pointer-events-none relative z-[1] block h-full w-full select-none object-cover transition duration-200 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h3 class="mb-20 text-[24px] font-bold">
                    Станьте амбассадорами нашего бренда!
                  </h3>
                  <p class="mb-5">
                    Приглашаем четверолапых звезд Интернета, активных
                    пользователей социальных сетей и блогеров:
                  </p>
                  <ul class="mb-10 list-disc [&>li]:ml-15">
                    <li>
                      от нас: индивидуальная система скидок на рационы и
                      комплементарная продукция
                    </li>
                    <li>от вас: честные отзывы о наших рационах.</li>
                  </ul>
                  <p>Скорее пишите нам, будем рады сотрудничеству!</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
