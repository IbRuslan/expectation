import { Link, useNavigate } from 'react-router-dom'

import { Ads, Change, HeartTrue, Logo, LogoutIcon } from '@/assets/icons'
import { Avatar, Button, DropDownItem, DropDownMenu, TextField, Typography } from '@/components/ui'
import { useWindowSize } from '@/utils/useWindowsSize'

import s from './header.module.scss'

export const Header = () => {
  const windowSize = useWindowSize()

  const isAuth = true
  const email = 'ribragimov2003@gmail.com'
  const name = 'Ruslan'

  const navigate = useNavigate()
  const onSelectNavigateLogOut = () => {
    navigate('/login')
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
                  el={{ email, icon: <Avatar />, title: name }}
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
                <DropDownItem el={{ title: 'Зарегистрироваться' }} onSelect={() => {}} />
                <DropDownItem el={{ title: 'Войти' }} onSelect={onSelectNavigateLogOut} />
              </DropDownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
