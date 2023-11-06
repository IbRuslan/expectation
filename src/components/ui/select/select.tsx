import { FC, useState } from 'react'

import { ArrowDown, ArrowUp } from '@/assets/icons'
import { Typography } from '@/components/ui'
import * as RadixSelect from '@radix-ui/react-select'

import s from './select.module.scss'

export type SelectPropsType = {
  className?: string
  disabled?: boolean
  label?: string
  options?: { title: string; value: any }[]
  setValue: (value: any) => void
  value: any
}

export const Select: FC<SelectPropsType> = ({
  className,
  disabled,
  options,
  setValue,
  value,
  ...props
}) => {
  const itemSelect = options?.find(o => o.value === value)
  const [open, setOpen] = useState(false)

  return (
    <RadixSelect.Root
      disabled={disabled}
      onOpenChange={() => {
        setOpen(prev => !prev)
      }}
      onValueChange={setValue}
      open={open}
      value={value}
    >
      <RadixSelect.Trigger
        className={`${s.trigger} ${disabled ? s.disabled : ''}`}
        placeholder={'select'}
        value={value}
      >
        {props.label && (
          <Typography as={'label'} className={s.label} variant={'body2'}>
            {props.label}
          </Typography>
        )}
        {itemSelect && itemSelect.title}
        <div>
          <RadixSelect.Icon className={s.arrows}>
            {open ? <ArrowUp /> : <ArrowDown />}
          </RadixSelect.Icon>
        </div>
        <span className={s.arrow}></span>
      </RadixSelect.Trigger>
      <RadixSelect.Content className={`${s.content} ${disabled ? s.disabled : ''}`}>
        {options &&
          options.map(o => {
            return (
              <RadixSelect.Item className={`${s.item} ${className}`} key={o.value} value={o.value}>
                {o.title}
              </RadixSelect.Item>
            )
          })}
      </RadixSelect.Content>
    </RadixSelect.Root>
  )
}
