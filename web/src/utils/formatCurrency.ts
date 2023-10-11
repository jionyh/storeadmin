export const formatCurrency = (value:string)=>{
  return parseFloat(value.replace(',','.')).toLocaleString('pt-pt', {
    style: 'currency',
    currency: 'EUR',
  })
}