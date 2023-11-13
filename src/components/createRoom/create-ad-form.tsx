import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ImageIcon } from '@/assets/icons'
import { ControlledTextField } from '@/components/controlled'
import { Button, Card, Typography } from '@/components/ui'
import { convertFileToBase64 } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './create-ad-form.module.scss'

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
  photos: z.array(z.any()).refine(photos => photos.length >= 2 && photos.length <= 10, {
    message: 'Количество фотографий должно быть от 2 до 10',
  }),
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

export type FormCreateAd = z.infer<typeof schema>

type CreateAdFormProps = {
  onSubmit: (data: FormCreateAd) => void
}

export const CreateAdForm = (props: CreateAdFormProps) => {
  const { control, handleSubmit, register } = useForm<FormCreateAd>({
    defaultValues: {
      area: 0,
      city: '',
      description: '',
      photos: [],
      price: 0,
      rooms: 1,
      title: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setSelectedPhotos([...selectedPhotos, file64])
        })
      } else {
        console.log('Файл слишком большого размера')
      }
    }
  }

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
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
                Количество фотографий должно быть от 2 до 10
              </Typography>
              <div className={s.photos_wrapper}>
                {selectedPhotos.length < 10 ? (
                  <div className={s.photo_wrapper}>
                    <label className={s.adphoto} htmlFor={'adphoto'}>
                      <ImageIcon />
                      <input
                        id={'adphoto'}
                        multiple
                        style={{ display: 'none' }}
                        type={'file'}
                        {...register('photos', {
                          validate: (value: any) => {
                            return value.length > 0 && value.length <= 10
                              ? true
                              : 'Количество фотографий должно быть от 1 до 10'
                          },
                        })}
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                ) : (
                  ''
                )}
                {selectedPhotos.map((photo, index) => (
                  <div className={s.photo_wrapper} key={index}>
                    <img alt={`Photo ${index}`} className={s.photo} src={photo} />
                  </div>
                ))}
              </div>
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
  )
}
