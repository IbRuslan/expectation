export type RoomsResponce = {
  current_page: number
  data: RoomObject[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: RoomsLinks[]
  next_page_url?: any
  path: string
  per_page: number
  prev_page_url?: any
  to: number
  total: number
}
export type RoomType = {
  description: string
  id: number
}
export type RoomCityCountry = {
  id: number
  title: string
}
export type RoomCity = {
  country: RoomCityCountry
  country_id: number
  id: number
  title: string
}
export type RoomUser = {
  avatar?: any
  created_at: string
  email: string
  email_verified_at?: any
  id: number
  login: string
  phone?: any
  token: string
  updated_at: string
}
export type RoomObject = {
  ad_type: RoomType
  apartment_size: string
  booked_id?: any
  city: RoomCity
  city_id: number
  contact?: any
  coordinates: string
  count_of_rooms: number
  created_at: string
  description: string
  id: number
  images: RoomImagesData[]
  is_hidden: number
  price: string
  title: string
  updated_at: string
  user: RoomUser
  user_id: number
}
export type RoomsLinks = {
  active: boolean
  label: string
  url?: any
}

export type RoomImagesData = {
  created_at: string
  filename: string
  id: number
  pivot: { ad_id: number; image_id: number }
  updated_at: string
}
