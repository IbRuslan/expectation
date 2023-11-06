import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui'

type ControlledTextFieldProps<T extends FieldValues> = {} & UseControllerProps<T> &
  Omit<TextFieldProps, 'id' | 'onChange' | 'value'>

export const ControlledTextField = <T extends FieldValues>({
  control,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return <TextField {...rest} {...field} errorMessage={error?.message} id={name} />
}
