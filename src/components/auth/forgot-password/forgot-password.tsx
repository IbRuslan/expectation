import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ControlledTextField } from '@/components/controlled'
import { Button, Card, Typography } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgot-password.module.scss'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').min(10),
})

type FormValues = z.infer<typeof forgotPasswordSchema>

type ForgotPasswordProps = {
  onSubmit: (data: FormValues) => void
}

export const ForgotPassword = (props: ForgotPasswordProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '' },
    mode: 'onSubmit',
    resolver: zodResolver(forgotPasswordSchema),
  })

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <Card className={s.wrapper}>
      <Typography as={'h2'} className={s.title} variant={'body1'}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleFormSubmitted}>
        <div className={s.textfields}>
          <ControlledTextField
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'Email'}
          />
        </div>
        <Typography className={s.description} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={s.button} fullWidth type={'submit'}>
          Send Instructions
        </Button>
      </form>
      <Typography className={s.caption} variant={'body2'}>
        {`Did you remember your password?`}
      </Typography>
      <Typography as={Link} className={s.trylogging} to={'/login'} variant={'link1'}>
        Try logging in
      </Typography>
    </Card>
  )
}
