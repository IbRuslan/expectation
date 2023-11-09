import { useState } from 'react'

import { Rooms } from '@/components/rooms'
import { Header, Select, Typography } from '@/components/ui'
import { useGetRoomsQuery } from '@/services/rooms'

import s from './rooms-page.module.scss'

export const RoomsPage = () => {
  const { data: rooms } = useGetRoomsQuery({})

  console.log(rooms)

  const [value, setValue] = useState('Все')
  const [valueBuy, setValueBuy] = useState('Все')
  const [city, setCity] = useState('Вся страна')

  const optionalHouse = [
    { title: 'Все', value: 'Все' },
    { title: 'Квартира', value: 'Квартира' },
    { title: 'Дом', value: 'Дом' },
  ]
  const optionalBuy = [
    { title: 'Все', value: 'Все' },
    { title: 'Покупка', value: 'Покупка' },
    { title: 'Аренда', value: 'Аренда' },
  ]
  const optionalCity = [
    { title: 'Вся страна', value: 'Вся страна' },
    { title: 'Ташкент', value: 'Ташкент' },
    { title: 'Самарканд', value: 'Самарканд' },
  ]
  const onChangeValueType = (value: any) => {
    setValue(value)
  }
  const onChangeValueBuy = (value: any) => {
    setValueBuy(value)
  }
  const onChangeCity = (value: any) => {
    setCity(value)
  }

  const count = 7

  const roomsProto = [
    {
      city: 'Ташкент',
      id: '1',
      photo: [
        'https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg',
        'https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg',
        'https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg',
      ],
      price: '2.000.000',
      title: 'Сдаетсся одно-комнатная квартира',
      type: 'Аренда',
    },
    {
      city: 'Ташкент',
      id: '2',
      photo: [
        'https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg',
        'https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg',
      ],
      price: '300.000.000',
      title: 'Сдаетсся двух-комнатная квартира',
      type: 'Продажа',
    },
    {
      city: 'Ташкент',
      id: '3',
      photo: [
        'https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg',
        'https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg',
      ],
      price: '4.000.000',
      title: 'Сдаетсся двух-комнатная квартира',
      type: 'Аренда',
    },
    {
      city: 'Ташкент',
      id: '4',
      photo: [
        'https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg',
        'https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg',
      ],
      price: '400.000.000',
      title: 'Сдаетсся двух-комнатная квартира',
      type: 'Продажа',
    },
    {
      city: 'Ташкент',
      id: '5',
      photo: [
        'https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg',
        'https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg',
      ],
      price: '4.000.000',
      title: 'Сдаетсся двух-комнатная квартира',
      type: 'Аренда',
    },
    {
      city: 'Самарканд',
      id: '6',
      photo: ['https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg'],
      price: '320.000.000',
      title: 'Двух-комнатная квартира',
      type: 'Продажа',
    },
    {
      city: 'Самарканд',
      id: '7',
      photo: ['https://i.pinimg.com/originals/72/4c/5c/724c5c4c0267b7a3dd9c1ce1e808a505.jpg'],
      price: '3.000.000',
      title: 'Двух-комнатная квартира',
      type: 'Аренда',
    },
  ]

  return (
    <>
      <Header search />
      <div className={s.container}>
        <div className={s.filters}>
          <Typography as={'h3'} className={s.title} variant={'h1'}>
            Фильтры
          </Typography>
          <div className={s.selects}>
            <div>
              <Select
                className={s.typeHouse}
                label={'Тип'}
                options={optionalBuy}
                setValue={onChangeValueBuy}
                value={valueBuy}
              />
            </div>
            <div>
              <Select
                className={s.typeHouse}
                label={'Недвижимость'}
                options={optionalHouse}
                setValue={onChangeValueType}
                value={value}
              />
            </div>
            <div>
              <Select
                className={s.typeHouse}
                label={'Город'}
                options={optionalCity}
                setValue={onChangeCity}
                value={city}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={s.container_item}>
        <div>
          <Typography as={'h3'} className={s.title} variant={'h1'}>
            {`Найдено ${count} обьявлений`}
          </Typography>
          <div className={s.rooms_wrapper}>
            {roomsProto.map(room => (
              <Rooms key={room.id} room={room} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
