import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://test-backend-server.site/public/api',
    prepareHeaders: headers => {
      headers.append('Referer', 'false')
      headers.append('Accept', '*/*')
      headers.append('Content-Type', 'application/json')
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['rooms', 'user'],
})
