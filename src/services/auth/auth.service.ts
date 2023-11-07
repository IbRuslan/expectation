import { AuthTypesData } from '@/services/auth/auth.types'
import { baseApi } from '@/services/base-api'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    authMe: builder.mutation<AuthTypesData, string>({
      invalidatesTags: ['Me'],
      query: body => ({
        headers: {
          Authorization: `Bearer ${body}`,
        },
        method: 'POST',
        url: '/user/me',
      }),
    }),
    login: builder.mutation<AuthTypesData, string>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: '/user/login',
      }),
    }),
    registration: builder.mutation<AuthTypesData, string>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: '/user/create',
      }),
    }),
  }),
})

export const { useAuthMeMutation, useLoginMutation, useRegistrationMutation } = authService
