import dayjs from "dayjs"

export const dataUtils = {
  getCurrentMonth: (month:number = dayjs().month()+1)=>{
    if(month < 1 || month > 12){
      return 'Mês inválido'
    }
    const currentMonth = dayjs().month(month-1).startOf('month')
    return currentMonth.format('MMMM [de] YYYY').toUpperCase()
  },
  getCurrentDay: ()=>{
    return dayjs().format('YYYY-MM-DD')
  }
}

