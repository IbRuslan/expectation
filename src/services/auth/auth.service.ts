import { baseApi } from '@/services/base-api'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<any, any>({
      query: body => ({
        body,
        method: 'POST',
        url: '/user',
      }),
    }),
    registration: builder.mutation<any, string>({
      query: body => ({
        body,
        method: 'POST',
        url: '/user/create',
      }),
    }),
  }),
})

export const { useLoginMutation, useRegistrationMutation } = authService
