import avatarDefault from '@/assets/icons/avatar-default.svg'

import s from './avatar.module.scss'

type AvatarProps = {
  size?: string
  src?: string
}

export const Avatar = ({ size = '35', src }: AvatarProps) => {
  const finalSrc = src ? `https://test-backend-server.site/public/img/${src}` : avatarDefault

  return <img alt={'avatar'} className={s.avatar} height={size} src={finalSrc} width={size} />
}
