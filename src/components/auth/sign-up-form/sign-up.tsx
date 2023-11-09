import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ControlledTextField } from '@/components/controlled'
import { Button, Card, Typography } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up.module.scss'

const phoneRegex = /\+998\d{9}/

const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address').min(10),
    login: z.string().min(4, 'Too short name'),
    password: z.string().min(3, 'Too short password'),
    passwordConfirm: z.string().nonempty('Confirm your password'),
    phone: z.string().regex(phoneRegex, 'Wrong number').optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
      })
    }

    return data
  })

export type FormSignUpValues = z.infer<typeof signUpSchema>

type SignUpProps = {
  onSubmit: (dataForm: FormSignUpValues) => void
}

export const SignUp = (props: SignUpProps) => {
  const { control, handleSubmit } = useForm<FormSignUpValues>({
    defaultValues: { email: '', password: '', passwordConfirm: '' },
    mode: 'onSubmit',
    resolver: zodResolver(signUpSchema),
  })

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <Card className={s.wrapper}>
      <Typography as={'h1'} className={s.title} variant={'large'}>
        Регистрация
      </Typography>
      <form onSubmit={handleFormSubmitted}>
        <div className={s.textfields}>
          <ControlledTextField
            control={control}
            label={'Имя'}
            name={'login'}
            placeholder={'Name'}
          />
          <ControlledTextField
            control={control}
            label={'Номер Телефона'}
            name={'phone'}
            placeholder={'+998(12)345-67-89 '}
          />
          <ControlledTextField
            control={control}
            label={'Почта'}
            name={'email'}
            placeholder={'Email'}
          />
          <ControlledTextField
            control={control}
            label={'Пароль'}
            name={'password'}
            placeholder={'Password'}
            type={'password'}
          />
          <ControlledTextField
            control={control}
            label={'Повторите пароль'}
            name={'passwordConfirm'}
            placeholder={'Confirm Password'}
            type={'password'}
          />
        </div>
        <Button className={s.button} fullWidth type={'submit'}>
          Зарегистрироваться
        </Button>
      </form>
      <Typography className={s.caption} variant={'body2'}>
        {`У вас уже есть аккаунт?`}
      </Typography>
      <Typography as={Link} className={s.signup} to={'/login'} variant={'link1'}>
        Войти
      </Typography>
    </Card>
  )
}
