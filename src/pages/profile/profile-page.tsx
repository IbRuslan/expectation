import { useNavigate } from 'react-router-dom'

import { ProfileInfo } from '@/components/profile'
import { Header } from '@/components/ui'
import { useAppSelector } from '@/services/store'

export const ProfilePage = () => {
  const navigate = useNavigate()

  const userInfo = useAppSelector(state => state.auth)

  const onChangeNameHandler = (value: string) => {
    console.log(value)
  }
  const onChangeAvatarHandler = (value: string) => {
    console.log(value)
  }
  const onLogoutHandler = () => {
    navigate('/login')
  }

  return (
    <>
      <Header />
      <ProfileInfo
        changeAvatar={onChangeAvatarHandler}
        changeName={onChangeNameHandler}
        onLogout={onLogoutHandler}
        userInfo={userInfo}
      />
    </>
  )
}
