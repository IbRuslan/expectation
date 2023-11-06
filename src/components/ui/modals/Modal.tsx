import { ReactNode } from 'react'

import { Close } from '@/assets/icons'
import { Button, Typography } from '@/components/ui'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type ModalProps = {
  children: ReactNode
  onClickSetChanges: () => void
  onOpenChange: (open: boolean) => void
  open: boolean
  titleForButton: string
  titleModal: string
}
export const Modal = ({
  children,
  onClickSetChanges,
  titleForButton,
  titleModal,
  ...props
}: ModalProps) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <div className={s.header}>
            <Dialog.Title asChild>
              <Typography as={'h2'} variant={'h2'}>
                {titleModal}
              </Typography>
            </Dialog.Title>
            <Dialog.Close className={s.closeIcon}>
              <Close />
            </Dialog.Close>
          </div>
          <div className={s.children}>{children}</div>
          <div className={s.buttons}>
            <Button
              className={s.button}
              onClick={() => props.onOpenChange(false)}
              variant={'secondary'}
            >
              Cancel
            </Button>
            <Button className={s.button} onClick={onClickSetChanges} variant={'primary'}>
              {titleForButton}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
