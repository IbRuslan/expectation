import imageCompression from 'browser-image-compression'

export const convertFileToBase64 = (file: File, callBack: (file64: string) => void) => {
  // Использую библиотеку browser-image-compression для сжатия файла base64, т.к тело слишком большое, а позволять запросам быть огромными со стороны сервера - опасно
  const options = {
    maxSizeMB: 3, // Максимальный размер сжатого изображения в мегабайтах
    maxWidthOrHeight: 1400, // Максимальная ширина или высота сжатого изображения
    useWebWorker: true, // Использовать веб-воркер для ускорения процесса сжатия (опционально)
  }

  imageCompression(file, options)
    .then(compressedFile => {
      const reader = new FileReader()

      reader.onloadend = () => {
        const file64 = reader.result

        if (typeof file64 === 'string') {
          callBack(file64)
        } else {
          console.log('Ошибка чтения файла в формате base64')
        }
      }

      reader.readAsDataURL(compressedFile)
    })
    .catch(error => {
      console.log('Ошибка сжатия изображения:', error)
    })
}
