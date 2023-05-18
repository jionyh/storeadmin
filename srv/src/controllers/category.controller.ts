import { Request, Response } from 'express'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
})

export const category = {
  createCategory: async (req: Request, res: Response) => {
    const { name } = categorySchema.parse(req.body)

    const addCategory = await prisma.category.create({
      data: {
        name,
      },
    })

    if (!addCategory) {
      res.json({ sucess: false })
      return
    }

    res.json({ sucess: true, data: addCategory })
  },

  getAllCategories: async (req: Request, res: Response) => {
    const data = await prisma.category.findMany()

    res.json({ sucess: true, data })
  },
}
