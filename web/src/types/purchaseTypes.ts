/* eslint-disable @typescript-eslint/no-explicit-any */
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
export interface Purchases {
  pagination: Pagination;
  "month totals"?: number;
  "day totals"?: number;
  "week totals"?: number;
  allPurchases: {
    date: string;
    total: string;
    dailyPurchases: {
      category: string;
      purchases: Purchase[];
    }[];
  }[];
}

export interface AllPurchaseResponse {
  success: boolean;
  purchases: Purchases;
}

export interface SinglePurchaseResponse {
  success: boolean;
  purchase: Purchase;
}

export type PurchaseResponse =
  | SinglePurchaseResponse
  | AllPurchaseResponse
  | ErrorResponse;
