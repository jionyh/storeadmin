import { Request, Response } from 'express'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { Capitalize } from '../utils/capitalizeFirstLetter'

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
      res.json({ success: false })
      return
    }

    res.json({ success: true, data: addCategory })
  },

  getAllCategories: async (req: Request, res: Response) => {
    const data = await prisma.category.findMany()

    const categories = []

    for (const i in data) {
      categories.push({
        id: data[i].id,
        name: Capitalize(data[i].name),
      })
    }

    res.json({ success: true, data: categories })
  },
}
