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
  tenant_id: z.coerce.number(),
});

export const signInSchema = z
.object({
  email: z.string().email({ message: 'Email inválido!' }),
  password: z.string(),
  tenant_slug: z.string()
})