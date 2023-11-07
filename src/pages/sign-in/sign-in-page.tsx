import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { FormLoginValues, LoginForm } from '@/components/auth'
import { useLoginMutation } from '@/services/auth/auth.service'
import { authMe } from '@/services/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { addToLocalStorage } from '@/utils/setToLocalStorage'

export const SignInPage = () => {
  const [login, { data, isError }] = useLoginMutation()
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

  const onSubmitHandler = (dataForm: FormLoginValues) => {
    const requestData = JSON.stringify({
      email: dataForm.email,
      password: dataForm.password,
    })

    login(requestData)
  }

  if (isAuthenticated) {
    return <Navigate replace to={'/'} />
  }

  return (
    <div>
      <LoginForm onSubmit={onSubmitHandler} />
    </div>
  )
}
