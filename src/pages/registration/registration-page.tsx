import { FormSignUpValues, SignUp } from '@/components/auth'
import { useRegistrationMutation } from '@/services/auth/auth.service'

export const RegistrationPage = () => {
  const [registration] = useRegistrationMutation()

  const onSubmitHandler = async (data: FormSignUpValues) => {
    try {
      const requestData = JSON.stringify({
        email: data.email,
        login: data.login,
        password: data.password,
        phone: data.phone,
      })

      await registration(requestData)
      console.log('Успешная регистрация!')
    } catch (error) {
      console.error('Ошибка регистрации:', error)
    }
  }

  return (
    <div>
      <SignUp onSubmit={onSubmitHandler} />
    </div>
  )
}
