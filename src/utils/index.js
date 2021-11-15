let id = 0
export function uniqueId() {
  return Math.random().toString(36).substr(3, 3) + Number(`${Date.now()}${++id}`).toString(36)
}

export function upper(str) {
  return str.replace(str[0], str[0].toLocaleUpperCase())
}
