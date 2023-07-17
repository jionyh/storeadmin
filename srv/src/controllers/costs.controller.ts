import { Request, Response } from 'express'
import { z } from 'zod'
import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'

export const cost = {
  getCost: async (req: Request, res: Response) => {
    const response = await prisma.cost.findMany()
    res.json(response)
  },

  createCost: async (req: Request, res: Response) => {
    const parse = z
      .object({
        name: z.string().nonempty('Preencha o nome da despesa').toLowerCase(),
        value: z
          .string()
          .nonempty('Preencha o valor da despesa')
          .transform((number) => parseFloat(number.replace(',', '.'))),
        tenant_id: z.coerce.number(),
      })
      .array()
      .safeParse(req.body)

    if (!parse.success) {
      res
        .status(400)
        .json({ success: false, message: parse.error.issues[0].message })
      return
    }

    const cost = await prisma.cost.createMany({
      data: parse.data,
    })

    res.json(cost)
  },

  deleteCost: async (req: Request, res: Response) => {},
}
