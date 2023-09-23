import dayjs from "dayjs";
import { SaleDay, SaleResponse } from "../../types/SalesType";

export const formatSalesReturnWithTotal = (sales: SaleResponse[]) => {
  const formatReturn: SaleDay[] = [];

  sales.forEach((item) => {
    // Constante que retorna o primeiro index que satisfazer a condição de data.
    // Retorna -1 se já achou ou não bateu a condição
    const existingDayIndex = formatReturn.findIndex((entry) => {
      const day = dayjs(item.createAt).format("YYYY-MM-DD");
      return entry.date === day;
    });

    // Se já existe o dia, adiciona apenas os campos de data ao dia
    if (existingDayIndex !== -1) {
      // faz a soma e adiciona ao dia o total de vendas se já existe um índice
      formatReturn[existingDayIndex].total = (
        parseFloat(formatReturn[existingDayIndex].total) + item.value
      ).toFixed(2);

      formatReturn[existingDayIndex].dailySales.push({
        id: item.id,
        value: item.value,
        payment_id: item.payment_id,
        payment: item.paymentMethod.name,
      });
      // Senão existe o dia, então adiciona o dia, o total  e a data dele
    } else {
      formatReturn.push({
        date: dayjs(item.createAt).format("YYYY-MM-DD"),
        total: item.value.toFixed(2),
        dailySales: [
          {
            id: item.id,
            value: item.value,
            payment_id: item.payment_id,
            payment: item.paymentMethod.name,
          },
        ],
      });
    }
  });

  return formatReturn;
};

export const formatSaleReturnWithoutTotal = (sale: SaleResponse) => ({
  id: sale.id,
  value: sale.value,
  payment_id: sale.payment_id,
  createAt: dayjs(sale.createAt).format("YYYY-MM-DD"),
});
