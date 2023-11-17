import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'

import { ClosedEye, Eye, MessageIcon } from '@/assets/icons'
import { Avatar, Button, Card, Header, LinearLoader, Typography } from '@/components/ui'
import { useGetRoomByIdQuery } from '@/services/rooms'

import s from './room-page.module.scss'
export const RoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const { data: room, isError, isLoading } = useGetRoomByIdQuery({ roomId: roomId || '' })
  const [show, setShow] = useState(false)

  if (isError) {
    return <Navigate to={'/'} />
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
  }

  return (
    <>
      <Header />
      <div className={s.container}>
        <div className={s.link_main}>
          <Button as={Link} className={s.button_link} to={'/'} variant={'link'}>
            На Главную
          </Button>
        </div>
        {isLoading ? (
          <LinearLoader />
        ) : (
          <div className={s.room_info}>
            <Card className={s.slider_wrapper}>
              <Slider {...settings} className={s.slider}>
                {room?.images.map(image => (
                  <div className={s.image_wrapper} key={image.id}>
                    <img
                      alt={'room'}
                      className={s.image}
                      src={`https://test-backend-server.site/public/img/${image.filename}`}
                    />
                  </div>
                ))}
              </Slider>
            </Card>
            <Card className={s.types_wrapper}>
              <Typography className={s.title} variant={'h1'}>
                {room?.title}
              </Typography>
              <Typography variant={'body1'}>Стоимость: {room?.price} сум</Typography>
              <div className={s.types}>
                <div className={s.type}>{room?.ad_type.description}</div>
                <div className={s.type}>Количество комнайт: {room?.count_of_rooms}</div>
                <div className={s.type}>Общая площадь: {room?.apartment_size} м²</div>
              </div>
            </Card>
            <Card className={s.description_wrapper}>
              <Typography className={s.description_title} variant={'h3'}>
                {'Описание'}
              </Typography>
              <div>
                <Typography className={s.description} variant={'body1'}>
                  {room?.description}
                </Typography>
              </div>
            </Card>
            <Card className={s.user_ad}>
              <Typography className={s.description_title} variant={'h3'}>
                {'Описание'}
              </Typography>
              <div className={s.user_wrapper}>
                <div>
                  <Avatar size={'55'} src={room?.user.avatar} />
                </div>
                <div className={s.user}>
                  <Typography variant={'h3'}>{room?.user.login}</Typography>
                  <div className={s.phone_wrapper}>
                    {show ? (
                      <Typography className={s.description} variant={'h3'}>
                        {room?.user.phone}
                      </Typography>
                    ) : (
                      <Typography className={s.description} variant={'h3'}>
                        xxx-xx-xx
                      </Typography>
                    )}
                    <div
                      className={s.showhandler}
                      onClick={() => setShow(!show)}
                      title={show ? 'Скрыть номер' : 'Показать номер'}
                    >
                      {show ? <ClosedEye /> : <Eye />}
                    </div>
                  </div>
                </div>
                <div className={s.message_wrapper} title={'Написать Сообщение'}>
                  <MessageIcon />
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
