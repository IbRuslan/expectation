import { useState } from 'react'

import { Rooms } from '@/components/rooms'
import { Header, LinearLoader, Select, Typography } from '@/components/ui'
import { useGetRoomsQuery } from '@/services/rooms'

import s from './rooms-page.module.scss'

export const RoomsPage = () => {
  const { data: rooms } = useGetRoomsQuery({})

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

  return (
    <>
      <Header search />
      <div>
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
        {!rooms ? (
          <LinearLoader />
        ) : (
          <div className={s.container_item}>
            <div>
              <Typography as={'h3'} className={s.title} variant={'h1'}>
                {rooms.data.length < 4
                  ? `Найдено ${rooms.data.length} обьявления`
                  : `Найдено ${rooms.data.length} обьявлений`}
              </Typography>
              {!rooms.data ? (
                <div>Обьявлений пока нет</div>
              ) : (
                <div className={s.rooms_wrapper}>
                  {rooms?.data.map(room => <Rooms key={room.id} room={room} />)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
