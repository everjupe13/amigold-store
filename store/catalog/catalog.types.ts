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
  discount: number
  category: number
  tabs: { id: number; label: string; text: string; product: number }[] | []
  feedbacks:
    | {
        id: number
        images: [
          {
            id: number
            image: string
            feedback: number
          }
        ]
        text: string
        name: string
        product: number
      }[]
    | []
}

export type IFilter = {
  id: number
  name: string
  slug: string
  categories: number[]
}

export type FiltersInterface =
  | 'id'
  | '-id'
  | 'gallery'
  | '-gallery'
  | 'filters'
  | '-filters'
  | 'prices'
  | '-prices'
  | 'tabs'
  | '-tabs'
  | 'feedbacks'
  | '-feedbacks'
  | 'category'
  | '-category'
  | 'isAvailable'
  | '-isAvailable'
  | 'isActive'
  | '-isActive'
  | 'isNew'
  | '-isNew'
  | 'isDiscount'
  | '-isDiscount'
  | 'isPromotionActive'
  | '-isPromotionActive'
  | 'promotionText'
  | '-promotionText'
  | 'vendorCode'
  | '-vendorCode'
  | 'name'
  | '-name'
  | 'slug'
  | '-slug'
  | 'shortDescription'
  | '-shortDescription'
  | 'discount'
  | '-discount'

export type SortItemType = {
  id: number
  label: string
  sortKey: FiltersInterface | ''
}

export type SortListType = SortItemType[]
