import { ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './card.module.scss'

export type CardProps = {} & ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...restProps }, ref) => {
  return <div className={`${s.container} ${className}`} ref={ref} {...restProps}></div>
})
