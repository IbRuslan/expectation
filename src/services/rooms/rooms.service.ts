import { baseApi } from '@/services'
import { RoomObject, RoomsResponce } from '@/services/rooms/rooms.types'

export const RoomsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getRoomById: builder.query<RoomObject, { roomId: string }>({
      providesTags: ['room'],
      query: ({ roomId }) => ({
        url: `/ad/getById/${roomId}`,
      }),
    }),
    getRooms: builder.query<RoomsResponce, any>({
      providesTags: ['rooms'],
      query: args => ({
        params: args ?? undefined,
        url: '/ad/getList',
      }),
    }),
  }),
})

export const { useGetRoomByIdQuery, useGetRoomsQuery } = RoomsService
