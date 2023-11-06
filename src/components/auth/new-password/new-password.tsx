import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled'
import { Button, Card, Typography } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './new-password.module.scss'

const newPasswordSchema = z.object({
  password: z.string().min(3, 'Too short password'),
})

type FormValues = z.infer<typeof newPasswordSchema>

type NewPasswordProps = {
  onSubmit: (data: FormValues) => void
}

export const NewPassword = (props: NewPasswordProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { password: '' },
    mode: 'onSubmit',
    resolver: zodResolver(newPasswordSchema),
  })

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <Card className={s.wrapper}>
      <Typography as={'h2'} className={s.title} variant={'large'}>
        Create new password
      </Typography>
      <form onSubmit={handleFormSubmitted}>
        <div className={s.textfields}>
          <ControlledTextField
            control={control}
            label={'Password'}
            name={'password'}
            password
            placeholder={'Password'}
          />
        </div>
        <Typography className={s.description} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button className={s.button} fullWidth type={'submit'}>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
