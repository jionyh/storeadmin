export const Capitalize = (data: string) => {
  const splitName = data.split(' ')

  for (const i in splitName) {
    splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].slice(1)
  }

  const capitalized = splitName.join(' ')

  return capitalized
}
