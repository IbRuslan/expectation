import { Navigate, useNavigate } from 'react-router-dom'

import { ProfileInfo } from '@/components/profile'
import { Header, LinearLoader } from '@/components/ui'
import { useAuthMeQuery, useChangeProfileMutation } from '@/services'
import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '@/utils'

export const ProfilePage = () => {
  const navigate = useNavigate()

  const token = getFromLocalStorage('token')

  const { data: users, isError } = useAuthMeQuery(token)
  const [changeProfile, { isError: isErrorChange, isLoading }] = useChangeProfileMutation()

  if (isError && token === 0) {
    return <Navigate replace to={'./login'} />
  } else {
    /* empty */
  }

  if (!isErrorChange && users) {
    addToLocalStorage('avatar', users.avatar)
    addToLocalStorage('login', users.login)
    addToLocalStorage('email', users.email)
  } else {
    /* empty */
  }

  const onChangeNameHandler = (value: string) => {
    changeProfile({ login: value, token })
  }
  const onChangeAvatarHandler = (file64: string) => {
    changeProfile({ avatar: file64, token })
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
