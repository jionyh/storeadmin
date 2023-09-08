export type PaymentMethod = {
  name: string;
  tenant_id: number;
};

export type PaymentMethodResponse = {
  id: number;
  name: string;
  tenant_id: number;
  is_deleted: boolean;
};
