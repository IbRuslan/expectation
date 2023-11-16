import { Link, Navigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'

import { Avatar, Button, Card, Header, LinearLoader, Typography } from '@/components/ui'
import { useGetRoomByIdQuery } from '@/services/rooms'

import s from './room-page.module.scss'
export const RoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const { data: room, isError, isLoading } = useGetRoomByIdQuery({ roomId: roomId || '' })

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
              <Typography variant={'h1'}>{room?.title}</Typography>
              <Typography variant={'h3'}>{room?.price}</Typography>
              <div className={s.types}>
                <div>{room?.ad_type.description}</div>
                <div>Количество комнайт: {room?.count_of_rooms}</div>
                <div>Общая площадь: {room?.apartment_size} м²</div>
              </div>
            </Card>
            <Card className={s.description_wrapper}>
              <Typography variant={'h3'}>{'Описание'}</Typography>
              <div>
                <Typography variant={'body1'}>{room?.description}</Typography>
              </div>
            </Card>
            <Card className={s.user_ad}>
              <Typography variant={'h3'}>{'Описание'}</Typography>
              <div>
                <div>
                  <Avatar src={room?.user.avatar} />
                </div>
                <div>
                  <Typography variant={'h3'}>{room?.user.login}</Typography>
                  <Typography variant={'h3'}>{room?.user.phone}</Typography>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
