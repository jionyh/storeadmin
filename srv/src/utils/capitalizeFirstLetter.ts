export const Capitalize = (data: any) => {
  const d = []

  for (let i = 0; i < data.length; i++) {
    const splitName = data[i].name.split(' ')
    const splitCategory = data[i].cat.name.split(' ')

    for (const i in splitName) {
      splitName[i] =
        splitName[i].charAt(0).toUpperCase() + splitName[i].slice(1)
    }
    for (const i in splitCategory) {
      splitCategory[i] =
        splitCategory[i].charAt(0).toUpperCase() + splitCategory[i].slice(1)
    }

    const CapitalizedName = splitName.join(' ')
    const CapitalizedCategory = splitCategory.join(' ')

    d.push({
      id: data[i].id,
      name: CapitalizedName,
      category: CapitalizedCategory,
    })
  }

  return d
}
