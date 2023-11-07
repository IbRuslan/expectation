export function addToLocalStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value))
}
