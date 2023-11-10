import { baseApi } from '@/services'
import { RoomsResponce } from '@/services/rooms/rooms.types'

export const RoomsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getRooms: builder.query<RoomsResponce, any>({
      providesTags: ['rooms'],
      query: args => ({
        params: args ?? undefined,
        url: '/ad/getList',
      }),
    }),
  }),
})

export const { useGetRoomsQuery } = RoomsService
