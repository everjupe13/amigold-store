export interface ICart {
  id: number
  products: {
    id: number
    product: {
      id: number
      name: string
      slug: string
      shortDescription: string
      image: string
      prices: [0]
    }
    productPrice: {
      id: number
      weight: string
      textLabel: string
      cost: string
      product: number
    }
    amount: number
    totalPrice: string
    cart: number
    isActive: unknown
  }[]
  sessionID: string
  totalPrice: string
}
