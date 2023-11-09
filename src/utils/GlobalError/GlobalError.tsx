import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

export const GlobalError = () => {
  const errorMessage = false

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      toast.onChange(({ status }) => {
        if (status === 'added') {
          // dispatch(setErrorAC(null))
        }
      })
    }
  }, [errorMessage])

  return <ToastContainer autoClose={3000} theme={'dark'} />
}
