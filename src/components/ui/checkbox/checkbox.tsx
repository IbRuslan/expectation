import { ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export type SuperCheckboxProps = {
  checked?: boolean
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (checked: boolean) => void
}

export const SuperCheckbox = forwardRef<ElementRef<typeof Checkbox.Root>, SuperCheckboxProps>(
  ({ checked, disabled, id, label, onChange }, ref) => {
    return (
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <div className={s.wrapper}>
          <Checkbox.Root
            checked={checked}
            className={s.CheckboxRoot}
            defaultChecked
            disabled={disabled}
            id={id}
            onCheckedChange={onChange}
            ref={ref}
          >
            {checked && (
              <Checkbox.Indicator className={s.CheckboxIndicator} forceMount>
                <CheckIcon className={s.icon} />
              </Checkbox.Indicator>
            )}
          </Checkbox.Root>
        </div>
        <Typography as={'label'} className={s.label} variant={'body2'}>
          {label}
        </Typography>
      </div>
    )
  }
)
