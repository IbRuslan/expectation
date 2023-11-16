import { MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import { HeartFalse, HeartTrue } from '@/assets/icons'
import { Card, Typography } from '@/components/ui'
import { RoomObject } from '@/services/rooms'

import s from './rooms.module.scss'

type RoomsProps = {
  room: RoomObject
}

export const Rooms = ({ room }: RoomsProps) => {
  const [favorite, setFavorite] = useState(false)

  const handleFavoriteClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setFavorite(!favorite)
  }

  return (
    <Card>
      <Typography as={Link} className={s.block_wrapper} to={`/rooms/${room.id}`} variant={'link1'}>
        <div className={s.block}>
          <div className={s.photo_wrapper}>
            <img
              alt={'photo'}
              className={s.photo}
              src={`https://test-backend-server.site/public/img/${room.images[0].filename}`}
            />
            <div className={s.type}>
              <Typography variant={'body2'}>{room.ad_type.description}</Typography>
            </div>
          </div>
          <Typography as={'h4'} className={s.title_room} variant={'h2'}>
            {room.title}
          </Typography>
          <div className={s.direction}>
            <Typography variant={'body2'}>{`г.${room.city.title}`}</Typography>
          </div>
          <div className={s.price}>
            <div>
              <Typography variant={'body1'}>{`${room.price} сум`}</Typography>{' '}
            </div>
            <div
              onClick={handleFavoriteClick}
              title={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              {favorite ? <HeartTrue /> : <HeartFalse />}
            </div>
          </div>
        </div>
      </Typography>
    </Card>
  )
}
