import { baseApi } from '@/services'
import { GetMyAdsResponce } from '@/services/myAds/my-ads.types'

export const MyAdsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createAd: builder.mutation<any, any>({
      invalidatesTags: ['myAds'],
      query: ({ token, ...body }) => {
        return {
          body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'Post',
          url: '/ad/create',
        }
      },
    }),
    getMyAds: builder.query<GetMyAdsResponce, any>({
      providesTags: ['myAds'],
      query: body => ({
        headers: {
          Authorization: `Bearer ${body}`,
        },
        url: '/ad/getAll',
      }),
    }),
  }),
})

export const { useCreateAdMutation, useGetMyAdsQuery } = MyAdsService

export type RootObject = {
  ad_type: number
  area: number
  description: string
  price: number
  rooms: number
  title: string
}
