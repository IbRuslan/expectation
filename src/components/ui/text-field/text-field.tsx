import { ChangeEvent, ComponentProps, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { ClosedEye, Eye, Search } from '@/assets/icons'
import { Typography } from '@/components/ui'

import s from './text-field.module.scss'

export type TextFieldProps = {
  containerProps?: ComponentProps<'div'>
  errorMessage?: string
  label?: string
  labelProps?: ComponentProps<'label'>
  onValueChange?: (value: string) => void
  search?: boolean
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      containerProps,
      errorMessage,
      label,
      labelProps,
      onChange,
      onValueChange,
      placeholder,
      search,
      type,
      ...restProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const isShowPasswordButtonShown = type === 'password'

    const finalType = getFinalType(type, showPassword)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    return (
      <div className={`${s.root} ${containerProps?.className}`}>
        {label && (
          <Typography
            as={'label'}
            className={`${s.label} ${labelProps?.className}`}
            variant={'body2'}
          >
            {label}
          </Typography>
        )}
        <div className={`${s.fieldContainer}`}>
          {search && <Search className={s.leadingIcon} />}
          <input
            className={`${s.field} ${!!errorMessage && s.error} ${
              search && s.hasLeadingIcon
            } ${className}`}
            onChange={handleChange}
            placeholder={placeholder}
            ref={ref}
            type={finalType}
            {...restProps}
          />
          {isShowPasswordButtonShown && (
            <button
              className={s.showPassword}
              onClick={() => setShowPassword(prev => !prev)}
              type={'button'}
            >
              {showPassword ? <ClosedEye /> : <Eye />}
            </button>
          )}
        </div>
        {errorMessage ? (
          <Typography className={s.error} variant={'error'}>
            {errorMessage}
          </Typography>
        ) : (
          ''
        )}
      </div>
    )
  }
)

function getFinalType(type: ComponentProps<'input'>['type'], showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
