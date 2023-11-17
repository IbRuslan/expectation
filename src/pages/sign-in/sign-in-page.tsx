import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { FormLoginValues, LoginForm } from '@/components/auth'
import { Button } from '@/components/ui'
import { useLoginMutation } from '@/services'
import { addToLocalStorage, getFromLocalStorage } from '@/utils'

export const SignInPage = () => {
  const [login, { data, isError }] = useLoginMutation()
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (!isError && data) {
      addToLocalStorage('token', data.token)
      addToLocalStorage('avatar', data.avatar)
      addToLocalStorage('login', data.login)
      addToLocalStorage('email', data.email)
      setIsAuth(true)
    } else {
      /* empty */
    }
  }, [data, isError])

  const onSubmitHandler = (dataForm: FormLoginValues) => {
    const requestData = JSON.stringify({
      email: dataForm.email,
      password: dataForm.password,
    })

    login(requestData)
  }

  const token = getFromLocalStorage('token')

  if (token !== 0 || isAuth) {
    return <Navigate replace to={'/'} />
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <Button as={Link} style={{ padding: '10px' }} to={'/'} variant={'link'}>
          На Главную
        </Button>
      </div>
      <div>
        <LoginForm onSubmit={onSubmitHandler} />
      </div>
    </>
  )
}
