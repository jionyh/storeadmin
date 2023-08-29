import {scheduleJob} from 'node-schedule'
import * as costService from "../services/cost.service";
import dayjs from 'dayjs';

export const createRecurrentCostForTenants =  async () => {
const activeCosts = await costService.getAllActiveRecurrentCost()
const month = dayjs().month()
const year = dayjs().year()

for (const costs of activeCosts){
  const day = dayjs(costs.createAt).date()
  await costService.createCost({
    name: costs.name,
    value: costs.value,
    tenant_id: costs.tenant_id,
    createAt: dayjs().year(year).month(month).date(day).startOf('day').toDate()
  })
  console.log('Monthly recurring costs create successful')
}}

/* job que executa às 00:00 do primeiro dia do mês */
const job = scheduleJob('0 0 1 * *', createRecurrentCostForTenants)