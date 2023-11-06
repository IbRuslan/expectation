import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { Button, Card, Typography } from '@/components/ui/'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './login.module.scss'

const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(10),
  password: z.string().min(3, 'Too short password'),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

type LoginFormProps = {
  onSubmit: (data: FormValues) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '', password: '', rememberMe: false },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <Card className={s.wrapper}>
      <Typography as={'h1'} className={s.title} variant={'large'}>
        Вход
      </Typography>
      <form onSubmit={handleFormSubmitted}>
        <div className={s.textfields}>
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
        </div>
        <ControlledCheckbox control={control} label={'Запомнить меня'} name={'rememberMe'} />
        <Typography
          as={Link}
          className={s.forgotpassword}
          to={'/password-recovery'}
          variant={'body2'}
        >{`Забыли пароль?`}</Typography>
        <Button className={s.button} fullWidth type={'submit'}>
          Войти
        </Button>
      </form>
      <Typography className={s.caption} variant={'body2'}>
        {`Нету аккаунта?`}
      </Typography>
      <Typography as={Link} className={s.signup} to={'/registration'} variant={'link1'}>
        Зарегистрироваться
      </Typography>
    </Card>
  )
}
