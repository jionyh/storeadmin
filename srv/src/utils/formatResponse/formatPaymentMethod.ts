import { PaymentMethodResponse } from "../../types/PaymentMethodType";
import { Capitalize } from "../capitalizeFirstLetter";

/* Função para normalizar o retorno de custos */

export const formatPaymentMethodResponse = (
  paymentMethod: PaymentMethodResponse[]
) => {
  let PaymentMethodsResponse: { id: number; name: string }[] = [];

  paymentMethod.map((payment) => {
    PaymentMethodsResponse.push({
      id: payment.id,
      name: Capitalize(payment.name),
    });
  });

  return PaymentMethodsResponse;
};
