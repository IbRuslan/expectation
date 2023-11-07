import { Link, useNavigate } from 'react-router-dom'

import { Ads, Change, HeartTrue, Logo, LogoutIcon } from '@/assets/icons'
import { Avatar, Button, DropDownItem, DropDownMenu, TextField, Typography } from '@/components/ui'
import { authMe } from '@/services/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { removeFromLocalStorage } from '@/utils/removeFromLocalStorage'
import { useWindowSize } from '@/utils/useWindowsSize'

import s from './header.module.scss'

export const Header = () => {
  const data = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const windowSize = useWindowSize()

  const isAuth = data.isAuth

  const navigate = useNavigate()
  const onSelectNavigateLogOut = () => {
    const data = {
      created_at: '',
      email: '',
      email_verified_at: null,
      id: '',
      isAuth: false,
      login: '',
      phone: null,
      token: '',
      updated_at: '',
    }

    removeFromLocalStorage('token')
    dispatch(authMe(data))
    navigate('/')
  }

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.brand}>
          {windowSize > 710 ? (
            <Typography as={Link} className={s.pageName} to={'/'} variant={'h1'}>
              <Logo /> Uzbnb
            </Typography>
          ) : (
            <Logo />
          )}
        </div>
        <div className={s.searchWrapper}>
          <TextField className={s.search} placeholder={'найти жилье'} search />
        </div>
        <div className={s.auth}>
          <div className={s.button}>
            <Button as={Link} className={s.buttonLink} to={'/ads'} variant={'link'}>
              {windowSize > 710 ? 'Сдать жилье на Uzbnb' : <Ads />}
            </Button>
          </div>
          <div className={s.change}>
            <Button className={s.buttonChange}>
              <Change />
            </Button>
          </div>
          <div>
            {isAuth ? (
              <DropDownMenu trigger={<Avatar />} variant={'profiledrop'}>
                <DropDownItem
                  el={{ email: data.email, icon: <Avatar />, title: data.login }}
                  onSelect={() => navigate('/profile')}
                />
                <DropDownItem
                  el={{ icon: <HeartTrue />, title: 'Избранное' }}
                  onSelect={() => navigate('/favorites')}
                />
                <DropDownItem
                  el={{ icon: <Ads />, title: 'Мои Обьявления' }}
                  onSelect={() => navigate('/ads')}
                />
                <DropDownItem
                  el={{ icon: <LogoutIcon />, title: 'Выйти' }}
                  onSelect={onSelectNavigateLogOut}
                />
              </DropDownMenu>
            ) : (
              <DropDownMenu trigger={<Avatar />} variant={'profiledrop'}>
                <DropDownItem
                  el={{ title: 'Зарегистрироваться' }}
                  onSelect={() => navigate('/registration')}
                />
                <DropDownItem el={{ title: 'Войти' }} onSelect={() => navigate('/login')} />
              </DropDownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
