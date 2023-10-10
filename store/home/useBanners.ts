import { defineStore } from 'pinia'

import { useApiRequest } from '@/composables/useApiRequest'

export type TopBanner = {
  id: number
  image: string
  url: string
}

type BannerResponseType = {
  id: number
  image: string
  url: string
}

const ApiMapper = {
  toDomain(entity: BannerResponseType): TopBanner {
    return {
      id: entity.id,
      image: entity.image,
      url: entity?.url || ''
    }
  }
}

const BannerService = {
  async getAll() {
    try {
      const { data, error } = await useApiRequest<BannerResponseType[]>(
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

export const useBanners = defineStore('home-banners', () => {
  const data = ref<TopBanner[] | null>(null)

  const fetchBanners = async () => {
    const { data: bannerData, status } = await BannerService.getAll()

    if (status && bannerData.value) {
      data.value = bannerData.value
      return { data, status }
    }

    return { data, status }
  }

  return { data, fetchBanners }
})
