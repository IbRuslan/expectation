import { ChangeEvent, useState } from 'react'

import { ChangeIcon, LogoutIcon } from '@/assets/icons'
import { Avatar, Button, Card, TextField, Typography } from '@/components/ui'
import { AuthTypesData } from '@/services'
import { convertFileToBase64 } from '@/utils'

import s from './profile-info.module.scss'

type ProfileInfoProps = {
  changeAvatar: (file64: string) => void
  changeName: (value: string) => void
  onLogout: () => void
  userInfo: AuthTypesData
}

export const ProfileInfo = ({ changeName, onLogout, userInfo, ...props }: ProfileInfoProps) => {
  const [value, setValue] = useState(userInfo.login)
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

  const onChangeProfilePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          props.changeAvatar(file64)
        })
      } else {
        console.log('Файл слишком большого размера')
      }
    }
  }

  return (
    <Card className={s.wrapper}>
      <Typography as={'h2'} className={s.title} variant={'large'}>
        Персональная информация
      </Typography>
      <div className={s.icon}>
        <Avatar size={'100'} src={userInfo.avatar ? userInfo.avatar : ''} />
        <label className={s.editIconPhoto} htmlFor={'upload'}>
          <ChangeIcon />
          <input
            accept={'image/*'}
            id={'upload'}
            onChange={onChangeProfilePhotoHandler}
            style={{ display: 'none' }}
            type={'file'}
          />
        </label>
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
        <div className={s.name_wrapper}>
          <Typography as={'h3'} className={s.name} variant={'body1'}>
            <>
              {userInfo.login}
              <div className={s.editIcon} onClick={() => setOpen(true)}>
                <ChangeIcon />
              </div>
            </>
          </Typography>
        </div>
      )}
      <Typography className={s.email} variant={'body1'}>
        {userInfo.phone}
      </Typography>
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
