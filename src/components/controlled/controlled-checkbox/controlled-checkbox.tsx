import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { SuperCheckbox, SuperCheckboxProps } from '@/components/ui'

type ControlledCheckboxProps<T extends FieldValues> = {} & UseControllerProps<T> &
  Omit<SuperCheckboxProps, 'checked' | 'disabled' | 'onChange'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return <SuperCheckbox {...rest} checked={value} onChange={onChange} />
}
