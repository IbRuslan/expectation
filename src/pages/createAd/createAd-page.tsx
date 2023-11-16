import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { CreateAdForm, FormCreateAd } from '@/components/createRoom'
import { Card, Header, LinearLoader, Select, Typography } from '@/components/ui'
import { useCreateAdMutation } from '@/services/myAds'
import { getFromLocalStorage } from '@/utils'

import s from './createAd-page.module.scss'

export const CreateAdPage = () => {
  const [createAd, { isLoading, isSuccess }] = useCreateAdMutation()

  const token = getFromLocalStorage('token')

  const [sell, setSell] = useState(1)
  const [house, setHouse] = useState('Квартира')

  const optionalType = [
    { title: 'Аренда', value: 1 },
    { title: 'Продажа', value: 2 },
  ]
  const optionalHouse = [
    { title: 'Квартира', value: 'Квартира' },
    { title: 'Дом', value: 'Дом' },
  ]

  const onSubmit = (formData: FormCreateAd, photos: string[]) => {
    createAd({
      ad_type: sell,
      apartment_size: formData.area,
      city_id: 1,
      coordinates: '1234.3334.1234.1234',
      count_of_rooms: formData.rooms,
      description: formData.description,
      images: photos,
      price: formData.price,
      title: formData.title,
      token,
    })
  }

  const onChangeValueType = (value: any) => {
    setSell(value)
  }
  const onChangeValueBuy = (value: any) => {
    setHouse(value)
  }

  if (isSuccess) {
    return <Navigate to={'/adsPage'} />
  }

  return (
    <>
      <Header />
      {isLoading ? <LinearLoader /> : ''}
      <div className={s.container}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Создать обьявление
        </Typography>
        <Card className={s.wrapper}>
          <Typography as={'h4'} className={s.title} variant={'h2'}>
            Укажите название и категорию
          </Typography>
          <div className={s.selects}>
            <div>
              <Select
                className={s.typeHouse}
                label={'Тип'}
                options={optionalType}
                setValue={onChangeValueType}
                value={sell}
              />
            </div>
            <div>
              <Select
                className={s.typeHouse}
                label={'Категория'}
                options={optionalHouse}
                setValue={onChangeValueBuy}
                value={house}
              />
            </div>
          </div>
        </Card>
        <CreateAdForm onSubmit={onSubmit} />
      </div>
    </>
  )
}
