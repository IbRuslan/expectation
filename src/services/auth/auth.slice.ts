import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  initialState: {
    avatar: null,
    created_at: '',
    email: '',
    email_verified_at: null,
    id: '',
    isAuth: false,
    login: '',
    phone: null,
    token: '',
    updated_at: '',
  },
  name: 'auth',
  reducers: {
    authMe: (state, action) => {
      const {
        avatar,
        created_at,
        email,
        email_verified_at,
        id,
        isAuth,
        login,
        phone,
        token,
        updated_at,
      } = action.payload

      state.avatar = avatar
      state.created_at = created_at
      state.email = email
      state.email_verified_at = email_verified_at
      state.id = id
      state.login = login
      state.phone = phone
      state.token = token
      state.updated_at = updated_at
      state.isAuth = isAuth
    },
    isAuth: (state, action) => {
      state.isAuth = action.payload
    },
  },
})

export const { authMe, isAuth } = authSlice.actions
