import { Button, Header, Typography } from '@/components/ui'

import s from './ads-page.module.scss'
export const AdsPage = () => {
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
        <div className={s.rooms_wrapper}>
          {/*{rooms && !loader ? rooms.map(room => <Rooms key={room.id} room={room} />) : ''}*/}
        </div>
      </div>
    </>
  )
}
