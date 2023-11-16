import { Link, Navigate } from 'react-router-dom'

import { Rooms } from '@/components/rooms'
import { Button, Header, LinearLoader, Typography } from '@/components/ui'
import { useGetMyAdsQuery } from '@/services/myAds'
import { getFromLocalStorage } from '@/utils'

import s from './ads-page.module.scss'
export const AdsPage = () => {
  const token = getFromLocalStorage('token')

  const { data: myAds, isError, isLoading } = useGetMyAdsQuery(token)

  console.log(myAds)

  if (isError && token === 0) {
    return <Navigate replace to={'/login'} />
  } else if (isError) {
    console.log('Ошибка')
  } else {
    /* empty */
  }

  return (
    <>
      <Header />
      <div className={s.container_item}>
        <div className={s.title_button}>
          <Typography as={'h1'} className={s.title} variant={'h1'}>
            Мои Обьявления
          </Typography>
          <div>
            <Button as={Link} className={s.button_ads} to={'/createad'}>
              Создать Обьявление
            </Button>
          </div>
        </div>
        {isLoading ? (
          <LinearLoader />
        ) : (
          <div>
            {myAds === undefined || myAds.data.length === 0 ? (
              <div className={s.pusto_wrapper}>
                <div className={s.pusto}>
                  <Typography variant={'h1'}>У вас нет обьявлений :(</Typography>
                </div>
              </div>
            ) : (
              <div className={s.rooms_wrapper}>
                {myAds.data.map(room => (
                  <Rooms key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
