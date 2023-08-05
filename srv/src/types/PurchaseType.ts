import { CategoryResponse } from "./CategoryType";
import { ProductResponse } from "./ProductType";

export type PurchaseType = {
  quantity: number;
  value: number;
  product_id: number;
  unit_id: number;
  supplier: string;
  tenant_id: number;
};

export type PurchaseResponse = {
  id: number;
  quantity: number;
  value: number;
  createAt: Date;
  product_id: number;
  unit_id: number;
  tenant_id: number;
  supplier: string;
};

export type PurchaseResponseComplete = {
  id: number;
  quantity: number;
  value: number;
  createAt: Date;
  product_id: number;
  unit_id: number;
  tenant_id: number;
  supplier: string;
  product: {
    id: number;
    name: string;
    category_id: number;
    tenant_id: number;
    is_deleted: boolean;
    cat: {
      id: number;
      name: string;
      tenant_id: number;
      is_deleted: boolean;
    };
  };
  unit: {
    id: number;
    name: string;
    abbreviation: string;
    tenant_id: number;
    is_deleted: boolean;
  };
};

type Pagination = {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  recordsPerPage: number;
};

export type PurchaseDay = {
  date: string;
  total: string;
  dailyPurchases: {
    id: number;
    quantity: number;
    value: number;
    product: string;
    unidade: string;
    supplier: string;
  }[];
};

export type PurchaseReturn = {
  pagination: Pagination;
  date: PurchaseDay[];
};
