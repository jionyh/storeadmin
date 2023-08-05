import dayjs from "dayjs";
import { PurchaseDay, PurchaseResponse } from "../../types/PurchaseType";
import { Capitalize } from "../capitalizeFirstLetter";

export const formatPurchasesReturnWithTotal = (
  purchase: PurchaseResponse[]
) => {
  const formatReturn: Array<PurchaseDay> = [];

  purchase.forEach((item) => {
    // Constante que retorna o primeiro index que satisfazer a condição de data.
    // Retorna -1 se já achou ou não bateu a condição
    const existingDayIndex = formatReturn.findIndex((entry) => {
      const day = dayjs(item.createAt).format("YYYY-MM-DD");
      return entry.date === day;
    });

    // Se já existe o dia, adiciona apenas os campos de data ao dia
    if (existingDayIndex !== -1) {
      // faz a soma e adiciona ao dia o total de compras se já existe um índice
      formatReturn[existingDayIndex].total = (
        parseFloat(formatReturn[existingDayIndex].total) + item.value
      ).toFixed(2);

      formatReturn[existingDayIndex].dailyPurchases.push({
        id: item.id,
        quantity: item.quantity,
        value: item.value,
        product_id: item.product_id,
        unit_id: item.unit_id,
        supplier: Capitalize(item.supplier),
      });
      // Senão existe o dia, então adiciona o dia, o total  e a data dele
    } else {
      formatReturn.push({
        date: dayjs(item.createAt).format("YYYY-MM-DD"),
        total: item.value.toFixed(2),
        dailyPurchases: [
          {
            id: item.id,
            quantity: item.quantity,
            value: item.value,
            product_id: item.product_id,
            unit_id: item.unit_id,
            supplier: Capitalize(item.supplier),
          },
        ],
      });
    }
  });

  return formatReturn;
};

export const formatPurchaseReturnWithoutTotal = (
  purchase: PurchaseResponse
) => ({
  id: purchase.id,
  quantity: purchase.quantity,
  value: purchase.value,
  createAt: dayjs(purchase.createAt).format("YYYY-MM-DD"),
  product_id: purchase.product_id,
  unit_id: purchase.unit_id,
  supplier: purchase.supplier,
});
