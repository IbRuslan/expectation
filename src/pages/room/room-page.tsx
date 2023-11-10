import { Link, useParams } from 'react-router-dom'

import { Avatar, Button, Card, Header, Typography } from '@/components/ui'

import s from './room-page.module.scss'
export const RoomPage = () => {
  const { roomsId } = useParams()

  console.log(roomsId)

  return (
    <>
      <Header />
      <div className={s.container}>
        <div className={s.link_main}>
          <Button as={Link} className={s.button_link} to={'/'} variant={'link'}>
            На Главную
          </Button>
        </div>
        <Card className={s.room_info}>
          <div className={s.photo_wrapper}>
            <img
              alt={'photo'}
              className={s.photo}
              src={`https://domtut.uz/resources/uploads/post/kakuyu-kvartiru-mozhno-kupit-v-tashkente-za-50000-v-novostroyke.jpg`}
            />
          </div>
          <div>
            <Typography variant={'h1'}>{''}</Typography>
            <Typography variant={'h3'}>{''}</Typography>
            <div className={s.types}>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className={s.user_ad}>
            <div>
              <Avatar />
            </div>
            <div className={s.name_data}>
              <div className={s.user_name}>
                <Typography variant={'body2'}>{''}</Typography>
              </div>
              <div className={s.user_data}>
                <Typography variant={'caption'}>{''}</Typography>
              </div>
            </div>
            <div className={s.phone}>
              <Typography variant={'body2'}>{''}</Typography>
            </div>
          </div>
          <div className={s.description_wrapper}>
            <Typography variant={'body1'}>{''}</Typography>
          </div>
        </Card>
      </div>
    </>
  )
}
