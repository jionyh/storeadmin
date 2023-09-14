import { api } from "@/lib/axios";
import { ErrorResponse } from "@/types/errorTypes";
import { AllPurchaseResponse, PurchaseResponse } from "@/types/purchaseTypes";
import axios from "axios";

type LoginResponseSuccess = {
  success: true;
  token: string;
};

type PaymentResponseSuccess = {
  success: true;
  paymentMethods: {
    id: number;
    name: string;
  };
};

type ResponseError = {
  success: false;
  error: string;
};

export type LoginResponse = LoginResponseSuccess | ResponseError;

export const getLogin = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const result = await api.post("/signin", data);
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // If there's a response from the backend, return its data
      return error.response.data;
    } else {
      throw new Error("Failed to fetch login");
    }
  }
};

interface Options {
  period?: string;
  perpage?: string;
  date?: string;
}

export const getPurchases = async (options: {
  period?: string;
  perpage?: string;
  date?: string;
}): Promise<AllPurchaseResponse | ResponseError> => {
  try {
    const result = await api.get(`/purchases?period=${options.period ?? ""}`);
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // If there's a response from the backend, return its data
      return error.response.data;
    } else {
      throw new Error("Failed to fetch purchases");
    }
  }
};

export const getPaymentMethods = async (): Promise<
  PaymentResponseSuccess | ResponseError
> => {
  try {
    const result = await api.get("/paymentsmethods");
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // If there's a response from the backend, return its data
      return error.response.data;
    } else {
      throw new Error("Failed to fetch payments");
    }
  }
};

// export const createSale = async () => {}

// export const deleteSale = async () => {}
