export type AuthTypesData = {
  avatar: null | string
  created_at: string
  email: string
  email_verified_at: null | string
  id: number
  login: string
  phone: null | string
  token: string
  updated_at: string
}

export type changeProfileType = {
  avatar?: FormData
  login?: string
  password?: string
  token: string
}
