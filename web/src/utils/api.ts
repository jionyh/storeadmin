import { ErrorResponse } from "@/types/errorTypes";
import { AllSalesResponse } from "@/types/saleTypes";
import axios from "axios";

const baseURL = "http://localhost:4001",
  isServer = typeof window === "undefined";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import("next/headers"),
      token = cookies().get("token")?.value;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

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
