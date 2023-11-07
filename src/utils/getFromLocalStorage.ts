export function getFromLocalStorage(key: string): any {
  if (typeof localStorage !== 'undefined') {
    const value = localStorage.getItem(key)

    if (value !== null) {
      return JSON.parse(value)
    }
  }

  return 0
}
