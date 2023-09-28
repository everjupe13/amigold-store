export interface ICategory {
  id: number
  name: string
  image: string
  slug: string
  isActive: boolean
  filters: {
    id: number
    name: string
    slug: string
    categories: number[]
  }[]
}

export interface ICategoryProducts {
  id: number
  name: string
  slug: string
  vendorCode: string
  shortDescription: string
  image: string
  prices: {
    id: number
    vendorCode: number
    weight: string
    volume: string
    textLabel: string
    price: string
    at_store: number
    product: number
    isActive: boolean
  }[]
  filters: {
    id: number
    name: string
    slug: string
    category: number
  }[]
  isNew: boolean
  isDiscount: boolean
  discount: number
}

export interface IProduct {
  id: number
  gallery: {
    id: number
    image: string
    imageThumb: string
    is_main: boolean
    product: number
  }[]
  filters: {
    id: number
    name: string
    slug: string
    category: number
  }[]
  prices: {
    id: number
    vendorCode: number
    weight: string
    volume: string
    textLabel: string
    price: string
    at_store: number
    product: number
    isActive: boolean
  }[]
  isActive: boolean
  isNew: boolean
  isDiscount: boolean
  isPromotionActive: boolean
  promotionText: string
  vendorCode: string
  name: string
  slug: string
  shortDescription: string
  description: string
  feedingRate: string
  delivery: string
  discount: number
  category: number
}

export type IFilter = {
  id: number
  name: string
  slug: string
  categories: number[]
}
