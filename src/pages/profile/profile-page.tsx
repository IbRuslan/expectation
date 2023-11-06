import { useNavigate } from 'react-router-dom'

import { ProfileInfo } from '@/components/profile'
import { Header } from '@/components/ui'

export const ProfilePage = () => {
  const navigate = useNavigate()

  const userInfo = {
    avatar: '',
    email: 'ribragimov2003@gmail.com',
    userName: 'Ruslan',
    userPhone: '',
  }

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
