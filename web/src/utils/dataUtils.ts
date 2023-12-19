import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { date } from 'zod'

dayjs.locale('pt-br')

export const dataUtils = {
  getCurrentMonth: (month: number = dayjs().month() + 1) => {
    if (month < 1 || month > 12) {
      return 'Mês inválido'
    }
    const currentMonth = dayjs()
      .month(month - 1)
      .startOf('month')
    return currentMonth.format('MMMM [de] YYYY').toUpperCase()
  },
  getCurrentDay: () => {
    return dayjs().format('YYYY-MM-DD')
  },

  formatFormData: (d: string) => {
    return format(new Date(d), 'P', { locale: ptBR })
  },

  getDayAndMonth: (date: string, format: 'long' | 'short' = 'short') => {
    return dayjs(date).format(format === 'long' ? 'DD [de] MMMM' : 'DD/MM')
  },
}
