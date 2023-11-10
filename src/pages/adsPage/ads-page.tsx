import { Button, Header, Typography } from '@/components/ui'

import s from './ads-page.module.scss'
export const AdsPage = () => {
  const rooms = []

  return (
    <>
      <Header />
      <div className={s.container_item}>
        <div className={s.title_button}>
          <Typography as={'h1'} className={s.title} variant={'h1'}>
            Мои Обьявления
          </Typography>
          <div>
            <Button className={s.button_ads}>Создать Обьявление</Button>
          </div>
        </div>
        <div>
          {rooms.length === 0 ? (
            <div className={s.pusto_wrapper}>
              <div className={s.pusto}>
                <Typography variant={'h1'}>У вас нет обьявлений :(</Typography>
              </div>
            </div>
          ) : (
            <div className={s.rooms_wrapper}>
              {/*{rooms && !loader ? rooms.map(room => <Rooms key={room.id} room={room} />) : ''}*/}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
