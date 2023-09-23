export type SaleType = {
  value: number;
  payment_id: number;
  tenant_id: number;
};

export type SaleResponse = {
  id: number;
  value: number;
  createAt: Date;
  payment_id: number;
  tenant_id: number;
  paymentMethod: {
    id: number;
    name: string;
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

export type SaleDay = {
  date: string;
  total: string;
  dailySales: {
    id: number;
    value: number;
    payment_id: number;
    payment: string;
  }[];
};

export type SaleReturn = {
  pagination: Pagination;
  date: SaleDay[];
};
