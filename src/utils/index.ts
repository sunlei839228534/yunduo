export const isArray = (value: unknown) => {
  return Object.prototype.toString.call(value) === '[Object Array]'
}