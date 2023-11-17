import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { FormSignUpValues, SignUp } from '@/components/auth'
import { Button } from '@/components/ui'
import { useRegistrationMutation } from '@/services'
import { addToLocalStorage, getFromLocalStorage } from '@/utils'

export const RegistrationPage = () => {
  const [registration, { data, isError }] = useRegistrationMutation()
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

  const onSubmitHandler = (dataForm: FormSignUpValues) => {
    const requestData = JSON.stringify({
      email: dataForm.email,
      login: dataForm.login,
      password: dataForm.password,
      phone: dataForm.phone,
    })

    registration(requestData)
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
        <SignUp onSubmit={onSubmitHandler} />
      </div>
    </>
  )
}
