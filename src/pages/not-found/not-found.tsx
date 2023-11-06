import { Link } from 'react-router-dom'

import { Error404 } from '@/assets/icons'
import { Button, Header, Typography } from '@/components/ui'

import s from './not-found.module.scss'

export const NotFound = () => {
  return (
    <div>
      <Header />
      <div className={s.wrapper}>
        <div className={s.content}>
          <Error404 />
          <Typography as={'h1'} variant={'h1'}>
            Sorry! Page not found!
          </Typography>
          <Button as={Link} className={s.button} to={'/'}>
            Back to home page
          </Button>
        </div>
      </div>
    </div>
  )
}
