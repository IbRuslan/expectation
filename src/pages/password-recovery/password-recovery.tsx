import { ForgotPassword } from '@/components/auth'
import { Header } from '@/components/ui'

export const PasswordRecovery = () => {
  return (
    <div>
      <Header />
      <ForgotPassword onSubmit={() => {}} />
    </div>
  )
}
