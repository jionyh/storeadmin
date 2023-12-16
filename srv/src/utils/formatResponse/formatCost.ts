import dayjs from "dayjs";
import { CostResponse } from "../../types/CostsType";
import { Capitalize } from "../capitalizeFirstLetter";

/* Função para normalizar o retorno de custos */

export const formatCostResponse = (costs: CostResponse[] | CostResponse) => {
  let costsResponse: { id: number; name: string; value: number; createAt: String; recurrent: Boolean }[] = [];

  if (Array.isArray(costs)) {
    costs.map((cost) => {
      costsResponse.push({
        id: cost.id,
        name: Capitalize(cost.name),
        value: cost.value,
        createAt: dayjs(cost.createAt).format("YYYY-MM-DD"),
        recurrent: cost.recurrent ? cost.recurrent : false,
      });
    });
  } else {
    return {
      id: costs.id,
      name: Capitalize(costs.name),
      value: costs.value,
      createAt: dayjs(costs.createAt).format("YYYY-MM-DD"),
      recurrent: costs.recurrent ? costs.recurrent : false,
    };
  }

  return costsResponse;
};
