import { defineStore } from 'pinia'

import { useApiRequest } from '@/composables/useApiRequest'

export type TopBanner = {
  id: number
  image: string
  accentTitleText: string
  secondaryTitleText: string
  description: string
  isButtonActionHyperlink: boolean
  url: string
  buttonLabel: string
}

type TopBannerResponseType = {
  id: number
  image: string
  orange_title: string
  black_title: string
  text: string
  url: string
  button_text: string
}

const ApiMapper = {
  toDomain(entity: TopBannerResponseType): TopBanner {
    return {
      id: entity.id,
      image: entity.image,
      accentTitleText: entity.orange_title,
      secondaryTitleText: entity.black_title,
      description: entity.text,
      isButtonActionHyperlink: !!entity.url,
      url: entity?.url || '',
      buttonLabel: entity.button_text
    }
  }
}

const TopBannerService = {
  async getAll() {
    try {
      const { data, error } = await useApiRequest<TopBannerResponseType[]>(
        `/api/data/top_banners`
      )

      if (Array.isArray(data?.value) && !error.value) {
        return {
          data: ref(data.value.map(banner => ApiMapper.toDomain(banner))),
          error,
          status: true
        }
      }

      return { data: ref(null), error, status: false }
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return { error, data: ref(null), status: false }
    }
  }
}

export const useTopBanners = defineStore('home-top-banners', () => {
  const data = ref<TopBanner[] | null>(null)

  const fetchBanners = async () => {
    const { data: bannerData, status } = await TopBannerService.getAll()

    if (status && bannerData.value) {
      data.value = bannerData.value
      return { data, status }
    }

    return { data, status }
  }

  return { data, fetchBanners }
})
