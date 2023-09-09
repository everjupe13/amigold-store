export interface INews {
  id: number
  category: {
    id: number
    name: string
    slug: string
  }
  name: string
  slug: string
  shortDescription: string
  description: string
  image: string
  is_news_item: boolean
  readTime: string
  createdAt: string
}
