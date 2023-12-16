export type CostType = {
  name: string;
  value: number;
  tenant_id: number;
  createAt: Date;
};

export type CostRecurrentType = {
  name: string;
  value: number;
  tenant_id: number;
  createAt: Date;
  recurrent: boolean;
};

export type CostResponse = {
  id: number;
  name: string;
  value: number;
  createAt: Date;
  tenant_id: number;
  recurrent?: boolean;
};

export type CostRecurrentResponse = {
  id: number;
  name: string;
  value: number;
  createAt: Date;
  recurrent: boolean;
  tenant_id: number;
};

type Pagination = {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  recordsPerPage: number;
};

export type CostDay = {
  date: string;
  total: string;
  dailyCosts: {
    id: number;
    value: string;
    payment_id: number;
  }[];
};

export type CostReturn = {
  pagination: Pagination;
  date: CostDay[];
};
