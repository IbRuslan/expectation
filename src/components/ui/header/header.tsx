import { Link, useNavigate } from 'react-router-dom'

import { Ads, Change, HeartTrue, Logo, LogoutIcon } from '@/assets/icons'
import { Avatar, Button, DropDownItem, DropDownMenu, TextField, Typography } from '@/components/ui'
import { getFromLocalStorage, removeFromLocalStorage, useWindowSize } from '@/utils'

import s from './header.module.scss'

type HeaderPropsType = {
  search?: boolean
}

export const Header = ({ search = false }: HeaderPropsType) => {
  const windowSize = useWindowSize()

  const getInfoFromLocalStorage = () => {
    const avatar = getFromLocalStorage('avatar')
    const login = getFromLocalStorage('login')
    const email = getFromLocalStorage('email')

    return { avatar, email, login }
  }

  const data = getInfoFromLocalStorage()

  const getIsAuth = () => {
    const result = getFromLocalStorage('token')

    if (result === 0) {
      return false
    }

    return true
  }

  const isAuth = getIsAuth()

  const navigate = useNavigate()
  const onSelectNavigateLogOut = () => {
    removeFromLocalStorage('avatar')
    removeFromLocalStorage('login')
    removeFromLocalStorage('email')
    removeFromLocalStorage('token')
    navigate('/')
  }

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.brand}>
          {windowSize > 710 ? (
            <Typography as={Link} className={s.pageName} to={'/'} variant={'h1'}>
              <Logo /> Accommodo
            </Typography>
          ) : (
            <Logo />
          )}
        </div>
        {search ? (
          <div className={s.searchWrapper}>
            <TextField className={s.search} placeholder={'найти жилье'} search />
          </div>
        ) : (
          ''
        )}
        <div className={s.auth}>
          <div className={s.button}>
            <Button as={Link} className={s.buttonLink} to={'/adsPage'} variant={'link'}>
              {windowSize > 710 ? 'Разместить обьявления' : <Ads />}
            </Button>
          </div>
          <div className={s.change}>
            <Button className={s.buttonChange}>
              <Change />
            </Button>
          </div>
          <div>
            {isAuth ? (
              <DropDownMenu trigger={<Avatar src={data.avatar} />} variant={'profiledrop'}>
                <DropDownItem
                  el={{
                    email: data.email,
                    icon: <Avatar src={data.avatar !== 0 ? data.avatar : ''} />,
                    title: data.login,
                  }}
                  onSelect={() => navigate('/profile')}
                />
                <DropDownItem
                  el={{ icon: <HeartTrue />, title: 'Избранное' }}
                  onSelect={() => navigate('/favorites')}
                />
                <DropDownItem
                  el={{ icon: <Ads />, title: 'Мои Обьявления' }}
                  onSelect={() => navigate('/adsPage')}
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
