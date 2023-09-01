import { Pagination } from "./commonsTypes";
import { ErrorResponse } from "./errorTypes";

export interface Cost {
  id: number;
  name: string;
  value: number;
  createAt: string;
}

export interface AllCostResponse {
  success: boolean;
  costs: {
    pagination: Pagination;
    [key: string]: number | any;
    costs: Cost[];
  };
}

export interface SingleCostResponse {
  success: boolean;
  cost: Cost;
}

export type CostResponse = SingleCostResponse | AllCostResponse | ErrorResponse;
