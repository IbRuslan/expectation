import { baseApi } from '@/services'

export const RoomsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getRooms: builder.query<any, any>({
      providesTags: ['rooms'],
      query: args => ({
        params: args ?? undefined,
        url: '/ad/getList',
      }),
    }),
  }),
})

export const { useGetRoomsQuery } = RoomsService
