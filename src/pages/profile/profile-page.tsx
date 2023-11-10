import { useNavigate } from 'react-router-dom'

import { ProfileInfo } from '@/components/profile'
import { Header, LinearLoader } from '@/components/ui'
import { useAuthMeQuery, useChangeProfileMutation } from '@/services'
import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '@/utils'

export const ProfilePage = () => {
  const navigate = useNavigate()

  const token: string = getFromLocalStorage('token')

  const { data: users } = useAuthMeQuery(token)
  const [changeProfile, { isError, isLoading }] = useChangeProfileMutation()

  if (!isError && users) {
    addToLocalStorage('avatar', users.avatar)
    addToLocalStorage('login', users.login)
    addToLocalStorage('email', users.email)
  } else {
    /* empty */
  }

  const onChangeNameHandler = (value: string) => {
    changeProfile({ login: value, token })
  }
  const onChangeAvatarHandler = (value: File) => {
    const avatar = new FormData()

    avatar.append('avatar', value)

    changeProfile({ avatar, token })
  }
  const onLogoutHandler = () => {
    removeFromLocalStorage('avatar')
    removeFromLocalStorage('login')
    removeFromLocalStorage('email')
    removeFromLocalStorage('token')
    navigate('/')
  }

  return (
    <>
      <Header />
      {isLoading ? <LinearLoader /> : ''}
      {!users ? (
        <LinearLoader />
      ) : (
        <ProfileInfo
          changeAvatar={onChangeAvatarHandler}
          changeName={onChangeNameHandler}
          onLogout={onLogoutHandler}
          userInfo={users}
        />
      )}
    </>
  )
}
