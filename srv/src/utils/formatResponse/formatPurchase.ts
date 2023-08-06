import dayjs from "dayjs";
import {
  PurchaseDay,
  PurchaseResponseComplete,
} from "../../types/PurchaseType";
import { Capitalize } from "../capitalizeFirstLetter";

export const formatPurchasesReturnWithTotal = (
  purchase: PurchaseResponseComplete[]
) => {
  const formatReturn: PurchaseDay[] = [];

  purchase.forEach((item) => {
    /* Verifica se existe o index no array de formatReturn com a data */
    const day = dayjs(item.createAt).format("YYYY-MM-DD");
    const existingDayIndex = formatReturn.findIndex(
      (entry) => entry.date === day
    );
    /* Caso encontre a data no array, verifica se existe o array de categoria */
    if (existingDayIndex !== -1) {
      const existingCategoryIndex = formatReturn[
        existingDayIndex
      ].dailyPurchases.findIndex(
        (cat) => cat.category.toLowerCase() === item.product.cat.name
      );
      /* Se existe o array de Categoria, faz o push com os dados */
      if (existingCategoryIndex !== -1) {
        formatReturn[existingDayIndex].total = (
          parseFloat(formatReturn[existingDayIndex].total) + item.value
        ).toFixed(2);

        formatReturn[existingDayIndex].dailyPurchases[
          existingCategoryIndex
        ].purchases.push({
          id: item.id,
          quantity: item.quantity,
          value: item.value.toFixed(2),
          product: Capitalize(item.product.name),
          unit: item.unit.abbreviation.toUpperCase(),
          supplier: Capitalize(item.supplier),
        });
        /* Senão ele cria o array com o nome da categoria */
      } else {
        formatReturn[existingDayIndex].dailyPurchases.push({
          category: Capitalize(item.product.cat.name),
          purchases: [
            {
              id: item.id,
              quantity: item.quantity,
              value: item.value.toFixed(2),
              product: Capitalize(item.product.name),
              unit: item.unit.abbreviation.toUpperCase(),
              supplier: Capitalize(item.supplier),
            },
          ],
        });
      }
      /* Caso não encontre o array de data e o array de categoria, cria-se o array completo com a data e a categoria */
    } else {
      formatReturn.push({
        date: day,
        total: item.value.toFixed(2),
        dailyPurchases: [
          {
            category: Capitalize(item.product.cat.name),
            purchases: [
              {
                id: item.id,
                quantity: item.quantity,
                value: item.value.toFixed(2),
                product: Capitalize(item.product.name),
                unit: item.unit.abbreviation.toUpperCase(),
                supplier: Capitalize(item.supplier),
              },
            ],
          },
        ],
      });
    }
  });

  return formatReturn;
};

export const formatPurchaseReturnWithoutTotal = (
  purchase: PurchaseResponseComplete
) => ({
  id: purchase.id,
  quantity: purchase.quantity,
  value: purchase.value.toFixed(2),
  createAt: dayjs(purchase.createAt).format("YYYY-MM-DD"),
  product: Capitalize(purchase.product.name),
  unit: purchase.unit.abbreviation.toUpperCase(),
  supplier: Capitalize(purchase.supplier),
});
