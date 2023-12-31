import { RoomObject } from '@/services/rooms'

export type GetMyAdsResponce = {
  current_page: number
  data: RoomObject[]
  first_page_url: string
  from?: any
  last_page: number
  last_page_url: string
  links: RootObjectLinks[]
  next_page_url?: any
  path: string
  per_page: number
  prev_page_url?: any
  to?: any
  total: number
}
export type RootObjectLinks = {
  active: boolean
  label: string
  url?: any
}
