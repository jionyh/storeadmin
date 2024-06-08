import dayjs from "dayjs";
import { z } from "zod";
import { todayDate } from "./dateUtils";

export const createCostSchema = z.object({
  name: z.string({ required_error: "o campo nome é obrigatório" }).nonempty("preencha o nome da despesa").toLowerCase(),
  value: z
    .string({ required_error: "o campo valor é obrigatório" })
    .nonempty("preencha o valor da despesa")
    .transform((number) => parseFloat(number.replace(",", "."))),
  date: z
    .string()
    .default(todayDate)
    .transform((date) => dayjs(date).toDate()),
  recurrent: z.boolean().default(false),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Email inválido!" }),
  password: z.string(),
});

export const createSaleSchema = z.object({
  date: z
    .string()
    .default(todayDate)
    .transform((date) => dayjs(date).toDate()),
  sales: z.array(
    z.object({
      value: z
        .string({ required_error: "o campo valor é obrigatório" })
        .nonempty("preencha o valor da despesa")
        .transform((number) => parseFloat(number.replace(",", "."))),
      payment_id: z
        .string({ required_error: "o campo método de pagamento é obrigatório" })
        .nonempty("preencha o método de pagamento")
        .transform((number) => parseFloat(number)),
    })
  ),
});

export const createCategorySchema = z.object({
  name: z.string({ required_error: "o campo nome é obrigatório" }).nonempty("preencha o nome da categoria").toLowerCase(),
});
export const createUnitSchema = z.object({
  name: z.string({ required_error: "o campo nome é obrigatório" }).nonempty("preencha o nome da unidade").toLowerCase(),
  abbreviation: z.string({ required_error: "o campo nome é obrigatório" }).nonempty("preencha o nome da unidade").toLowerCase(),
});

export const createProductSchema = z.object({
  name: z.string({ required_error: "o campo nome é obrigatório" }).nonempty("preencha o nome do produto").toLowerCase(),
  category_id: z.number({ required_error: "o campo categoria é obrigatório" }).nonnegative(),
});

export const createPurchaseSchema = z.object({
  date: z
    .string()
    .default(todayDate)
    .transform((date) => dayjs(date).toDate()),
  category: z.string(),
  purchases: z.array(
    z.object({
    quantity: z
    .string({ required_error: "o campo quantidade é obrigatório" })
    .nonempty("preencha a quantidade")
    .transform((number) => parseFloat(number.replace(",", "."))),
  value: z
    .string({ required_error: "o campo valor é obrigatório" })
    .nonempty("preencha o valor da despesa")
    .transform((number) => parseFloat(number.replace(",", "."))),
  product_id: z
    .string({ required_error: "o campo produto é obrigatório" })
    .nonempty("preencha o método de pagamento")
    .transform((number) => parseFloat(number)),
  unit_id: z
    .string({ required_error: "o campo unidade é obrigatório" })
    .nonempty("preencha o método de pagamento")
    .transform((number) => parseFloat(number)),
  supplier: z
    .string()
    .optional()
    .transform((i) => (i === "" ? "---" : i)),
  payment: z.union([z.literal("dinheiro"), z.literal("cartao"), z.literal("outros")]),
    })
  )
});

export const editUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  currentPassword: z.string(),
  newPassword: z.string().min(6, "Requerimento mínimo de 6 caracteres"),
});
