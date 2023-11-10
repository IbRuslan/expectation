import { AuthTypesData, baseApi } from '@/services'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    authMe: builder.query<AuthTypesData, string>({
      providesTags: ['user'],
      query: body => ({
        headers: {
          Authorization: `Bearer ${body}`,
        },
        url: '/user/me',
      }),
    }),
    changeProfile: builder.mutation<any, any>({
      invalidatesTags: ['user'],
      query: ({ token, ...body }) => ({
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        url: '/user/updateUser',
      }),
    }),
    login: builder.mutation<AuthTypesData, string>({
      query: body => ({
        body,
        method: 'POST',
        url: '/user/login',
      }),
    }),
    registration: builder.mutation<AuthTypesData, string>({
      query: body => ({
        body,
        method: 'POST',
        url: '/user/create',
      }),
    }),
  }),
})

export const {
  useAuthMeQuery,
  useChangeProfileMutation,
  useLoginMutation,
  useRegistrationMutation,
} = authService
