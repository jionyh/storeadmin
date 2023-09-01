import { Pagination } from "./commonsTypes";
import { ErrorResponse } from "./errorTypes";

export interface Purchase {
  id: number;
  quantity: number;
  value: string;
  createAt: string;
  product: string;
  unit: string;
  supplier: string;
}

export interface AllPurchaseResponse {
  success: boolean;
  purchases: {
    pagination: Pagination;
    [key: string]: number | any;
    allPurchases: {
      date: string;
      total: string;
      dailyPurchases: {
        category: string;
        purchases: Purchase[];
      }[];
    }[];
  };
}

export interface SinglePurchaseResponse {
  success: boolean;
  purchase: Purchase;
}

export type PurchaseResponse =
  | SinglePurchaseResponse
  | AllPurchaseResponse
  | ErrorResponse;
