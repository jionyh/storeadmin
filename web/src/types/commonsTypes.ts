export interface Pagination {
  totalRecords: number
  totalPages: number
  currentPage: number
  recordsPerPage: number
}

export interface ResponseError {
  success: false;
  error: string;
};
