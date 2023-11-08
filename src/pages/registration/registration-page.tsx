import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { FormSignUpValues, SignUp } from '@/components/auth'
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
    <div>
      <SignUp onSubmit={onSubmitHandler} />
    </div>
  )
}
