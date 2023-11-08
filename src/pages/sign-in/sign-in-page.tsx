import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { FormLoginValues, LoginForm } from '@/components/auth'
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
    <div>
      <LoginForm onSubmit={onSubmitHandler} />
    </div>
  )
}
