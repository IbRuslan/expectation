import { Link } from 'react-router-dom'

import { Button, Header, Typography } from '@/components/ui'

import s from './favorites-page.module.scss'

export const FavoritesPage = () => {
  const rooms = []

  return (
    <>
      <Header />
      <div className={s.container_item}>
        <div className={s.title_button}>
          <Typography as={'h1'} className={s.title} variant={'h1'}>
            Избранное
          </Typography>
        </div>
        {rooms.length === 0 ? (
          <div className={s.pusto_wrapper}>
            <div className={s.pusto}>
              <Typography variant={'h1'}>У вас нет избранных обьявлений :(</Typography>
              <Button as={Link} className={s.button} to={'/'} variant={'link'}>
                Найти Обьявления
              </Button>
            </div>
          </div>
        ) : (
          <div className={s.rooms_wrapper}>
            {/*{rooms && !loader ? rooms.map(room => <Rooms key={room.id} room={room} />) : ''}*/}
          </div>
        )}
      </div>
    </>
  )
}
