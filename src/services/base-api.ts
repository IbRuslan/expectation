import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://test-backend-server.site/public/api',
    prepareHeaders: headers => {
      headers.append('Referer', 'false')
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['rooms'],
})
