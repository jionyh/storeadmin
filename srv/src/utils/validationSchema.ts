import { z } from 'zod';

export const createCostSchema = z.object({
  name: z
    .string({ required_error: 'o campo nome é obrigatório' })
    .nonempty('preencha o nome da despesa')
    .toLowerCase(),
  value: z
    .string({ required_error: 'o campo valor é obrigatório' })
    .nonempty('preencha o valor da despesa')
    .transform((number) => parseFloat(number.replace(',', '.'))),
});

export const signInSchema = z.object({
  email: z.string().email({ message: 'Email inválido!' }),
  password: z.string(),
  tenant_slug: z.string()
})

export const createSaleSchema = z.object({
  value: z
    .string({ required_error: 'o campo valor é obrigatório' })
    .nonempty('preencha o valor da despesa')
    .transform((number) => parseFloat(number.replace(',', '.'))),
  payment_id: z
  .string({ required_error: 'o campo método de pagamento é obrigatório' })
  .nonempty('preencha o método de pagamento')
  .transform((number) => parseFloat(number)),
})

export const createCategorySchema = z.object({
  name: z
    .string({ required_error: 'o campo nome é obrigatório' })
    .nonempty('preencha o nome da categoria')
    .toLowerCase(),
})