import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { FormSignUpValues, SignUp } from '@/components/auth'
import { useRegistrationMutation } from '@/services/auth/auth.service'
import { authMe } from '@/services/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { addToLocalStorage } from '@/utils/setToLocalStorage'

export const RegistrationPage = () => {
  const [registration, { data, isError }] = useRegistrationMutation()

  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(state => state.auth.isAuth)

  useEffect(() => {
    if (!isError && data) {
      addToLocalStorage('token', data.token)
      dispatch(authMe({ ...data, isAuth: true }))
    } else {
      /* empty */
    }
  }, [data, dispatch, isError])

  const onSubmitHandler = (dataForm: FormSignUpValues) => {
    const requestData = JSON.stringify({
      email: dataForm.email,
      login: dataForm.login,
      password: dataForm.password,
      phone: dataForm.phone,
    })

    registration(requestData)
  }

  if (isAuthenticated) {
    return <Navigate replace to={'/'} />
  }

  return (
    <div>
      <SignUp onSubmit={onSubmitHandler} />
    </div>
  )
}
