import { useNavigate } from 'react-router-dom'

import { ProfileInfo } from '@/components/profile'
import { Header } from '@/components/ui'
import { useAuthMeQuery } from '@/services'
import { getFromLocalStorage, removeFromLocalStorage } from '@/utils'

export const ProfilePage = () => {
  const navigate = useNavigate()

  const token: string = getFromLocalStorage('token')

  const { data: users } = useAuthMeQuery(token)

  const onChangeNameHandler = (value: string) => {
    console.log(value)
  }
  const onChangeAvatarHandler = (value: string) => {
    console.log(value)
  }
  const onLogoutHandler = () => {
    removeFromLocalStorage('avatar')
    removeFromLocalStorage('login')
    removeFromLocalStorage('email')
    removeFromLocalStorage('token')
    navigate('/')
  }

  if (!users) {
    return <div>loading...</div>
  }

  return (
    <>
      <Header />
      <ProfileInfo
        changeAvatar={onChangeAvatarHandler}
        changeName={onChangeNameHandler}
        onLogout={onLogoutHandler}
        userInfo={users}
      />
    </>
  )
}
