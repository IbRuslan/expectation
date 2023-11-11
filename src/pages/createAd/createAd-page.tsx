import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'

import { ControlledTextField } from '@/components/controlled'
import { Button, Card, Header, LinearLoader, Select, Typography } from '@/components/ui'
import { useCreateAdMutation } from '@/services/myAds'
import { getFromLocalStorage } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createAd-page.module.scss'

const schema = z.object({
  area: z
    .string()
    .refine(val => !isNaN(Number(val)), {
      message: 'Введите корректное число',
    })
    .transform(val => Number(val))
    .refine(val => val > 0, { message: 'Число должно быть положительным' }),
  city: z.string().min(4, 'Минимум 4 символа'),
  description: z.string().min(40, 'Минимум 40 символов'),
  price: z
    .string()
    .refine(val => !isNaN(Number(val)), {
      message: 'Введите корректное число',
    })
    .transform(val => Number(val))
    .refine(val => val > 0, { message: 'Число должно быть положительным' }),
  rooms: z
    .string()
    .refine(val => !isNaN(Number(val)), {
      message: 'Введите корректное число',
    })
    .transform(val => Number(val))
    .refine(val => val > 0, { message: 'Число должно быть положительным' }),
  title: z.string().min(10, 'Минимум 10 символов'),
})

type FormCreateAd = z.infer<typeof schema>

export const CreateAdPage = () => {
  const [createAd, { isLoading, isSuccess }] = useCreateAdMutation()

  const token = getFromLocalStorage('token')

  const { control, handleSubmit, register } = useForm<FormCreateAd>({
    defaultValues: { area: 0, city: '', description: '', price: 0, rooms: 1, title: '' },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const [sell, setSell] = useState('Аренда')
  const [house, setHouse] = useState('Квартира')

  const optionalType = [
    { title: 'Аренда', value: 'Аренда' },
    { title: 'Продажа', value: 'Продажа' },
  ]
  const optionalHouse = [
    { title: 'Квартира', value: 'Квартира' },
    { title: 'Дом', value: 'Дом' },
  ]

  const onSubmit = (formData: FormCreateAd) => {
    let ad_type = 1

    if (sell === 'Аренда') {
      ad_type = 1
    } else {
      ad_type = 2
    }

    createAd({
      ad_type: ad_type,
      apartment_size: formData.area,
      city_id: 1,
      coordinates: '1234.3334.1234.1234',
      count_of_rooms: formData.rooms,
      description: formData.description,
      price: formData.price,
      title: formData.title,
      token,
    })
  }

  const handleFormSubmitted = handleSubmit(onSubmit)

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
        <form onSubmit={handleFormSubmitted}>
          <div>
            <Card className={s.wrapper}>
              <div>
                <div className={s.title_type_container}>
                  <div className={s.title_type_wrapper}>
                    <div>
                      <ControlledTextField
                        control={control}
                        label={'Название'}
                        name={'title'}
                        placeholder={'Название'}
                      />
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </Card>
            <Card className={s.wrapper}>
              <div>
                <div>
                  <Typography as={'h4'} className={s.title} variant={'h2'}>
                    Фото
                  </Typography>
                  <Typography as={'p'} variant={'body2'}>
                    Минимум две фотографии
                  </Typography>
                  <div></div>
                </div>
              </div>
            </Card>
            <Card className={s.wrapper}>
              <div>
                <div>
                  <Typography as={'h4'} className={s.title} variant={'h2'}>
                    Описание
                  </Typography>
                  <Typography as={'p'} variant={'body2'}>
                    Минимум 40 символов
                  </Typography>
                  <div className={s.text_wrapper}>
                    <textarea
                      className={s.textarea}
                      id={'description'}
                      placeholder={'Описание'}
                      {...register('description')}
                    />
                  </div>
                </div>
              </div>
            </Card>
            <Card className={s.wrapper}>
              <div>
                <Typography as={'h4'} className={s.title} variant={'h2'}>
                  Дополнительная информация
                </Typography>
                <div className={s.city_number_container}>
                  <div className={s.city_number_wrapper}>
                    <div>
                      <ControlledTextField
                        control={control}
                        label={'Количество комнат'}
                        name={'rooms'}
                        placeholder={'Количество комнат'}
                        type={'number'}
                      />
                    </div>
                    <div>
                      <ControlledTextField
                        control={control}
                        label={'Общая площадь'}
                        name={'area'}
                        placeholder={'m2'}
                        type={'number'}
                      />
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </Card>
            <Card className={s.wrapper}>
              <div>
                <Typography as={'h4'} className={s.title} variant={'h2'}>
                  Местоположение
                </Typography>
                <div className={s.city_number_container}>
                  <div className={s.city_number_wrapper}>
                    <div>
                      <ControlledTextField
                        control={control}
                        label={'Местоположение'}
                        name={'city'}
                        placeholder={'город'}
                      />
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </Card>
            <Card className={s.wrapper}>
              <div>
                <Typography as={'h4'} className={s.title} variant={'h2'}>
                  Ваша сумма
                </Typography>
                <div className={s.city_number_container}>
                  <div className={s.price_wrapper}>
                    <div>
                      <ControlledTextField
                        control={control}
                        label={'Сумма'}
                        name={'price'}
                        placeholder={'сумма'}
                        type={'number'}
                      />
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </Card>
            <Card className={s.wrapper}>
              <div className={s.button_wrapper}>
                <Button as={Link} className={s.button} to={'/'} variant={'link'}>
                  Вернуться
                </Button>
                <Button className={s.button} type={'submit'}>
                  Создать
                </Button>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </>
  )
}
