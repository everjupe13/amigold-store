<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import ProductCommentsSlider from '@/components/screens/app-product/ProductCommentsSlider.vue'
import { useCartStore } from '@/store/cart'
import { IProduct, useCatalogStore } from '@/store/catalog'
import { formatRubles } from '@/utils/cost'

const route = useRoute()
const catalogStore = useCatalogStore()
const cartStore = useCartStore()
const isProductLoading = ref(true)
const product = ref<IProduct | null>(null)
const pricesArray = ref<IProduct['prices'] | []>([])
const currentPriceIndex = ref()
const tabs = ref<IProduct['tabs']>([])

isProductLoading.value = true
const { data } = await catalogStore.fetchProduct(
  route.params.productSlug as string
)

if (data.value) {
  product.value = data.value as IProduct
} else {
  await navigateTo('/error')
}
// isProductLoading.value = false

pricesArray.value = [...product.value!.prices]?.map(price => ({
  ...price,
  isActive: false
}))
pricesArray.value[0].isActive = true
currentPriceIndex.value = pricesArray.value.findIndex(price => price.isActive)

tabs.value = product.value?.tabs || []

onMounted(() => {
  isProductLoading.value = false
})

const currentPrice = computed(() => {
  const total =
    currentPriceIndex.value >= 0
      ? Number(pricesArray.value[currentPriceIndex.value]?.price)
      : 0
  return formatRubles(total)
})

const onWeightChange = (index: number) => {
  currentPriceIndex.value = index

  for (const price of pricesArray.value) {
    price.isActive = false
  }

  pricesArray.value[index].isActive = true
}

const currentTabId = ref(tabs.value?.length ? tabs.value[0].id : -1)
const onTabChange = (index: number) => (currentTabId.value = index)

const isCartActionLoading = ref(false)
const isCartActionSuccess = ref(true)
const addToCart = async () => {
  try {
    isCartActionLoading.value = true
    isCartActionSuccess.value = false
    const currentWeightId = pricesArray.value[currentPriceIndex.value].id
    await cartStore.addItem(product.value!.id, currentWeightId)
    isCartActionLoading.value = false
    setTimeout(() => {
      isCartActionSuccess.value = true
    }, 1000)
  } finally {
    isCartActionLoading.value = false
    setTimeout(() => {
      isCartActionSuccess.value = true
    }, 1000)
  }
}

onMounted(async () => {
  await cartStore.fetchCartItems()
})

const currentProductCount = computed(() => {
  return (
    cartStore.cart?.products.find(
      cartProduct =>
        cartProduct.product.id === product.value?.id &&
        cartProduct.productPrice.id ===
          pricesArray.value[currentPriceIndex.value].id
    )?.amount || 0
  )
})

async function increaseCount(amount?: number) {
  if (!product.value) {
    return false
  }
  isCartActionLoading.value = true
  isCartActionSuccess.value = false

  try {
    await cartStore.addItem(
      product.value.id,
      pricesArray.value[currentPriceIndex.value].id,
      amount || 1
    )
  } finally {
    isCartActionLoading.value = false
    setTimeout(() => {
      isCartActionSuccess.value = true
    }, 1000)
  }
}
async function decreaseCount(amount?: number) {
  if (!product.value) {
    return false
  }

  isCartActionLoading.value = true

  try {
    await cartStore.removeItem(
      product.value.id,
      pricesArray.value[currentPriceIndex.value].id,
      amount || 1
    )
  } finally {
    isCartActionLoading.value = false
  }
}

function changeCount(count: number, sign: boolean) {
  if (sign) {
    increaseCount(count)
  } else {
    decreaseCount(count)
  }
}
</script>

<template>
  <section class="pb-60 pt-20">
    <AppContainer>
      <AppBreadcrumbs
        :crumbs="[
          { label: 'Каталог', toLink: '/catalog' },
          { label: product?.name || '' }
        ]"
        class="mb-40"
      />
      <template v-if="isProductLoading">
        <div class="flex justify-center">
          <AppSpinner />
        </div>
      </template>
      <template v-else>
        <AppProductPromotionBanner v-if="product?.isPromotionActive">
          {{
            product?.promotionText ||
            'Данный товар участвует в акции! При покупке 2х товаров - третий бесплатно!'
          }}
        </AppProductPromotionBanner>

        <div class="mt-25">
          <div
            class="mb-60 grid grid-cols-[600px_calc(100%-600px-40px)] gap-x-40 lg:grid-cols-1"
          >
            <div class="lg:mb-20">
              <AppProductSlider :gallery="product?.gallery" />
            </div>
            <div class="flex flex-col justify-between">
              <div class="mb-70 lg:mb-30">
                <p
                  class="mb-25 font-inter !leading-none text-green text-semibold-14"
                >
                  Артикул: {{ product?.vendorCode || 'Артикул: 561326771' }}
                </p>
                <h1 class="mb-15 leading-none text-extrabold-24">
                  {{
                    product?.name ||
                    'Амиголд Сухой корм для кошек для выведения шерсти с индейкой с овощами'
                  }}
                </h1>
                <p class="font-inter leading-normal text-medium-16">
                  {{
                    product?.shortDescription ||
                    'Послужит отличной едой для милых собакенов всех возрастов! Корм сделан полностью из натуральных ингридиентов, проверен в нашей лаборатории.'
                  }}
                </p>
              </div>
              <div class="mt-auto rounded-[24px] bg-gray p-30">
                <div class="mb-24">
                  <p class="mb-10 text-bold-18">Фасовка:</p>
                  <div class="flex flex-wrap gap-8">
                    <AppButton
                      v-for="(price, index) in pricesArray"
                      :key="price.id"
                      size="sm"
                      :theme="price.isActive ? 'default' : 'black'"
                      :outlined="!price.isActive && true"
                      @click="() => onWeightChange(index)"
                    >
                      {{ price.textLabel }}
                    </AppButton>
                  </div>
                </div>
                <div
                  class="mb-24 leading-none text-extrabold-36 md:text-extrabold-24"
                >
                  {{ currentPrice }}
                </div>
                <div class="flex flex-wrap items-center gap-10">
                  <div v-if="currentProductCount > 0" class="flex items-center">
                    <div class="rounded-full border-2 border-black/20 p-12">
                      <ProductCounter
                        :amount="currentProductCount"
                        :disabled-when-count="0"
                        :is-disabled="
                          isCartActionLoading || !isCartActionSuccess
                        "
                        button-classes="bg-yellow hover:border-yellow hover:bg-yellow"
                        wrapper-classes="h-24"
                        @change="changeCount"
                        @decrease="decreaseCount"
                        @increase="increaseCount"
                      />
                    </div>
                  </div>
                  <AppButton
                    class="h-52 min-w-[200px] whitespace-nowrap"
                    theme="black"
                    :disabled="isCartActionLoading || !isCartActionSuccess"
                    @click="addToCart"
                  >
                    <div
                      v-if="isCartActionLoading"
                      class="flex items-center justify-center"
                    >
                      <AppSpinner :size="18" class="text-white" />
                    </div>
                    <template v-else>
                      <template v-if="!isCartActionSuccess">
                        Товар добавлен
                      </template>
                      <template v-else-if="currentProductCount > 0">
                        <span class="inline-flex flex-col items-center gap-x-5">
                          <span>{{ `В корзине: ${currentProductCount}` }}</span>
                          <span class="text-[14px] opacity-60">Перейти</span>
                        </span>
                      </template>
                      <template v-else>Добавить в корзину</template>
                    </template>
                  </AppButton>
                  <AppButton class="h-52 whitespace-nowrap" theme="default">
                    <RouterLink to="/cart" class="block h-full w-full">
                      Перейти в корзину
                    </RouterLink>
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </AppContainer>
  </section>

  <section class="bg-waved-t bg-waved-b">
    <AppContainer>
      <div class="rounded-[24px]">
        <div class="max-w-max">
          <div
            class="flex max-w-max items-center gap-x-10 rounded-full lg:rounded-[24px] md:flex-wrap"
          >
            <AppButton
              v-for="tab in tabs"
              :key="tab.id"
              theme="black"
              :outlined="currentTabId !== tab.id"
              class="!border-transparent"
              @click="onTabChange(tab.id)"
            >
              {{ tab.label }}
            </AppButton>
            <AppButton
              theme="black"
              :outlined="currentTabId !== -1"
              class="!border-transparent"
              @click="onTabChange(-1)"
            >
              Доставка и оплата
            </AppButton>
          </div>
        </div>
        <div
          v-if="currentTabId !== -1"
          class="tab-field min-h-[200px] max-w-[800px] pt-40"
          v-html="tabs.find(tab => tab.id === currentTabId)?.text || ''"
        ></div>
        <div v-else class="tab-field min-h-[200px] max-w-[800px] pt-40">
          <div
            class="content font-inter leading-normal text-black/80 text-medium-16"
          >
            <p>
              <u><strong>САМОВЫВОЗ СО СКЛАДА</strong></u>
            </p>

            <p>
              Забрать заказ можно самовывозом со склада по адресу: г. Москва,
              Южнобутовская 29, с левой стороны от 3 подьезда жилого дома,
              коммерческое помещение с вывеской "АМИГО"&nbsp;
            </p>

            <p>&nbsp;</p>

            <p>Время работы склада:</p>

            <p>с 9:00 до 16:30 с понедельника по четверг</p>

            <p>с 9:00 до 15:30 в пятницу</p>

            <p>
              <strong>Внимание!</strong>
              &nbsp;СКЛАД И ОФИС НЕ РАБОТАЕТ&nbsp;В ВЫХОДНЫЕ И ПРАЗДНИЧНЫЕ ДНИ
            </p>

            <p>&nbsp;</p>

            <p>
              <u><strong>ДОСТАВКА</strong></u>
            </p>

            <p>
              Доставка заказанного товара по России с учетом наиболее выгодного
              варианта его получения. Расчет стоимости доставки осуществляется
              согласно тарифам транспортных компаний.
            </p>

            <p>
              1. Доставка на пункты выдачи курьерской службой&nbsp;(СДЭК)
              возможна для заказов любой весовой категории.&nbsp;Стоимость
              доставки будет озвучена менеджером&nbsp;при
              подтверждении&nbsp;заказа.
              <br />
              Доставка в постаматы курьерских служб осуществляется при весе
              товара до 1,5&nbsp;кг.
            </p>

            <p>
              2. Заказы с доставкой курьерской службой до двери осуществляются в
              любой город. Заказы с доставкой курьерской службой до двери
              осуществляются только после предоплаты стоимости
              доставки.&nbsp;Курьерская служба не осуществляет проверку работы
              товара. Тарифы будут озвучены&nbsp;при оформлении заказа и зависят
              от веса и дальности.
            </p>

            <p>
              3.&nbsp;&nbsp;Заказы с отправкой Почтой России&nbsp;
              рассчитываются по тарифам Почты России. Стоимость доставки будет
              озвучена в процессе подтверждения вашего заказа. Срок отправки от
              1 до 2 дней со дня отлаты Вашего заказа (если нет сезонных
              ограничений по приему почты для Вашего региона).
            </p>

            <p>
              4.&nbsp;Другие транспортные компании. Доставка возможна для
              заказов на любую сумму, осуществляется индивидуально и по
              договоренности. Транспортную компанию выбирает покупатель. Если
              Вы&nbsp; затрудняетесь с выбором, наши менеджеры подберут
              оптимальный вариант.&nbsp;
            </p>

            <p>
              <strong>Внимание!</strong>
              &nbsp;Отгрузка товаров производится только при 100% предоплате.
            </p>

            <p>&nbsp;</p>

            <p>
              <u><strong>ОПЛАТА</strong></u>
            </p>

            <p>
              -оплата по счету (оплата безналичным расчетом для юридических лиц)
              <br />
              -оплата банковской картой (для физических лиц ).&nbsp;
              <span>
                Для&nbsp; оплаты товара банковской картой клиенту направляется
                ссылка на оплату.
              </span>
            </p>

            <p>
              <strong>
                Оплата банковской картой может не пройти, по нескольким
                причинам:
              </strong>
              <br />
              <br />
              - Вы ввели неверные данные карты
              <br />
              <br />
              - У карты закончился срок действия
              <br />
              <br />
              - На карте недостаточно денег
              <br />
              <br />
              - Нельзя подтвердить операцию по карте одноразовым паролем из СМС
              <br />
              <br />
              - Банк установил запрет на оплату в интернете
              <br />
              <br />
              <strong>Внимание!</strong>
              &nbsp;Если оплата всё же не прошла:
              <br />
              <br />
              - Повторите попытку через 20 минут
              <br />
              <br />
              - Обратитесь в банк, выпустивший карту
              <br />
              <br />
              - Попробуйте оплатить другой картой
            </p>

            <p>&nbsp;</p>

            <p>
              <u><strong>ВОЗВРАТ ТОВАРА</strong></u>
            </p>

            <p>
              Возврат качественного товара: В соответствии с п. 4 ст. 26.1.
              Закона РФ «О защите прав потребителей» от 07.02.1992 N 2300-1
              (далее - Закон о защите прав потребителей). Потребитель вправе
              отказаться от товара в любое время до его передачи, а после
              передачи товара - в течение семи дней.
            </p>

            <p>
              <span style="font-family: arial, sans-serif">
                <strong><u>Непродовольственные товары.</u></strong>
              </span>
            </p>

            <p>
              <span style="font-family: arial, sans-serif">
                Непродовольственные товары надлежающего качества не подлежат
                обмену и возврату, согласно поставновлению Правительства РФ от
                31.12.20202 № 2463.
              </span>
            </p>

            <p>
              <strong>
                Перечень непродовольственных товаров надлежащего качества, не
                подлежащих обмену:
              </strong>
            </p>

            <p>
              1. Товары для профилактики и лечения заболеваний в домашних
              условиях (предметы санитарии и гигиены из металла, резины,
              текстиля и других материалов, медицинские изделия, средства
              гигиены полости рта, линзы очковые, предметы по уходу за детьми),
              лекарственные препараты
            </p>

            <p>
              2. Предметы личной гигиены (зубные щетки, расчески, заколки,
              бигуди для волос, парики, шиньоны и другие аналогичные товары)
            </p>

            <p>3. Парфюмерно-косметические товары&nbsp;</p>

            <p>
              4. Текстильные товары (хлопчатобумажные, льняные, шелковые,
              шерстяные и синтетические ткани, товары из нетканых материалов
              типа тканей - ленты, тесьма, кружево и др.), кабельная продукция
              (провода, шнуры, кабели), строительные и отделочные материалы
              (линолеум, пленка, ковровые покрытия и др.) и другие товары, цена
              которых определяется за единицу длины
            </p>

            <p>
              5. Швейные и трикотажные изделия (изделия швейные и трикотажные
              бельевые, изделия чулочноносочные)
            </p>

            <p>
              6. Изделия и материалы, полностью или частично изготовленные из
              полимерных материалов и контактирующие с пищевыми продуктами
              (посуда и принадлежности столовые и кухонные, емкости и
              упаковочные материалы для хранения и транспортирования пищевых
              продуктов, в том числе для разового использования)
            </p>

            <p>7. Товары бытовой химии, пестициды и агрохимикаты</p>

            <p>8. Мебельные гарнитуры бытового назначения</p>

            <p>
              9. Ювелирные и другие изделия из драгоценных металлов и (или)
              драгоценных камней, ограненные драгоценные камни
            </p>

            <p>
              10. Автомобили и мотовелотовары, прицепы к ним, номерные агрегаты
              (двигатель, блок цилиндров двигателя, шасси (рама), кузов (кабина)
              автотранспортного средства или самоходной машины, а также коробка
              передач и мост самоходной машины) к автомобилям и мотовелотоварам,
              мобильные средства малой механизации сельскохозяйственных работ,
              прогулочные суда и иные плавсредства бытового назначения
            </p>

            <p>
              11. Технически сложные товары бытового назначения, на которые
              установлены гарантийные сроки не менее одного года
            </p>

            <p>
              12. Гражданское оружие, основные части гражданского огнестрельного
              оружия, патроны к гражданскому оружию, а также инициирующие и
              воспламеняющие вещества и материалы для самостоятельного
              снаряжения патронов к гражданскому огнестрельному длинноствольному
              оружию 13. Животные и растения
            </p>

            <p>
              14. Непериодические издания (книги, брошюры, альбомы,
              картографические и нотные издания, листовые изоиздания, календари,
              буклеты, издания, воспроизведенные на технических носителях
              информации)
            </p>

            <p>
              <br />
              <strong><u>Продовольственные товары</u></strong>
            </p>

            <p>
              <u>Корма для животных</u>
              &nbsp;Корм для животных не является непродовольственным товаром,
              вследствие чего потребитель не вправе предъявлять продавцу
              требование обменять такой товар надлежащего качества на
              аналогичный (ст. 502 ГК РФ, ст. 25 Закона N 2300-I), а в случае
              отсутствия аналогичного товара - возвратить его.
            </p>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>

  <hr class="invisible py-10" aria-hidden />

  <section>
    <AppContainer>
      <div class="mt-50">
        <ProductCommentsSlider
          :feedbacks="product?.feedbacks || []"
        ></ProductCommentsSlider>
      </div>
    </AppContainer>
  </section>

  <hr class="invisible py-10" aria-hidden />
</template>

<style lang="scss">
.tab-field {
  p {
    @apply mb-30 font-inter font-medium last-of-type:mb-0;
  }
  strong {
    @apply mb-8 block;
  }

  img {
    @apply block w-full;
  }
}
</style>
