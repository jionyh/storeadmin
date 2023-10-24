export const formatCurrency = (value: string) => {
  // return parseFloat(value.replace(',', '.')).toLocaleString('pt-pt', {
  //  style: 'currency',
  //  currency: 'EUR',
  // })
  const euroCurrency = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  })

  return euroCurrency.format(parseFloat(value ? value.replace(',', '.') : '0'))
}
