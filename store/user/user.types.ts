export type IUserData = {
  id: number
  client: number
  pages: {
    id: number
    page: {
      id: number
      name: string
      url: string
    }
    permission: {
      id: 0
      name: string
      can_open: boolean
      can_edit: boolean
    }
    role: number
  }[]
  name: string
  email: string
  phone: string
  comment: string
  is_manager: boolean
}
