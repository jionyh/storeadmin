import { Pagination } from "./commonsTypes";

export interface Category {
  id: number;
  name: string;
}

export interface Unit {
  id: number;
  name: string;
  abbreviation: string;
}

export interface Product {
  id: number;
  name: string;
  category: Category;
}

export interface CategoriesResponse {
  success: boolean;
  categories: Category[];
}

export interface ProductsResponse {
  success: boolean;
  products: {
    pagination: Pagination;
    products: Product[];
  };
}

export interface UnitsResponse {
  success: boolean;
  units: Unit[];
}
