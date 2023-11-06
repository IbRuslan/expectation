import { ChangeEvent, useState } from 'react'

import { ChangeIcon, LogoutIcon } from '@/assets/icons'
import { Avatar, Button, Card, TextField, Typography } from '@/components/ui'

import s from './profile-info.module.scss'

type ProfileInfoProps = {
  changeAvatar: (value: string) => void
  changeName: (value: string) => void
  onLogout: () => void
  userInfo: { avatar: string; email: string; userName: string; userPhone: string }
}

export const ProfileInfo = ({ changeName, onLogout, userInfo }: ProfileInfoProps) => {
  const [value, setValue] = useState(userInfo.userName)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  const onLogoutHandler = () => {
    onLogout()
  }

  const changeNameHandler = () => {
    setOpen(false)
    setError('')
    changeName(value)
  }

  const onChangeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (value.length > 2) {
      setError('')
    } else {
      setError('Too short name')
    }
    setValue(event.currentTarget.value)
  }

  return (
    <Card className={s.wrapper}>
      <Typography as={'h2'} className={s.title} variant={'large'}>
        Персональная информация
      </Typography>
      <div className={s.icon}>
        <Avatar size={'100'} src={userInfo.avatar ? userInfo.avatar : ''} />
        <ChangeIcon />
      </div>
      {open ? (
        <>
          <TextField onChange={onChangeValueHandler} value={value} />
          {error && (
            <Typography className={s.error} variant={'caption'}>
              {error}
            </Typography>
          )}
        </>
      ) : (
        <Typography as={'h3'} className={s.name} variant={'body1'}>
          <>
            {userInfo.userName}
            <div className={s.editIcon} onClick={() => setOpen(true)}>
              <ChangeIcon />
            </div>
          </>
        </Typography>
      )}

      <Typography className={s.email} variant={'body2'}>
        {userInfo.email}
      </Typography>
      <div className={s.buttons}>
        <Button
          className={s.button}
          disabled={error.trim() !== ''}
          onClick={open ? changeNameHandler : onLogoutHandler}
          variant={open ? 'primary' : 'secondary'}
        >
          {open ? (
            'Save Changes'
          ) : (
            <>
              <LogoutIcon /> Выйти
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
