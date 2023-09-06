export interface ICategory {
  id: number
  name: string
  image: string
  slug: string
  isActive: boolean
  sub_categories: {
    name: string
    slug: string
    id: number
  }[]
}

export interface ICatalogProducts {
  id: number
  name: string
  slug: string
  shortDescription: string
  productType: ICategory[]
  image: string
  prices: {
    id: number
    weight: string
    textLabel: string
    cost: string
    product: 0
  }[]
}

export interface IProduct {
  id: number
  gallery: {
    id: number
    image: string
    imageThumb: string
    is_main: boolean
    product: 0
  }[]
  productType: {
    id: number
    name: string
    slug: string
    category: number
  }[]
  prices: {
    isActive: unknown
    id: number
    weight: string
    textLabel: string
    cost: string
    product: 0
  }[]
  isActive: boolean
  isPromotionActive: boolean
  promotionText: string
  vendorCode: string
  name: string
  slug: string
  shortDescription: string
  description: string
  feedingRate: string
  delivery: string
}
