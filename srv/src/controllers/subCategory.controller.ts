import { Request, Response } from 'express'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { Capitalize } from '../utils/capitalizeFirstLetter'
import { ProductList } from '../types/ProductList'

const subCategorySchema = z
  .object({
    id: z.number().optional(),
    categoryId: z.string().transform((i) => parseInt(i)),
    name: z.string().toLowerCase(),
  })
  .array()

export type ProductType = z.infer<typeof subCategorySchema>

export const subCategory = {
  addSubCategory: async (req: Request, res: Response) => {
    const data = subCategorySchema.parse(req.body)

    const addSubCat = await prisma.subCategory.createMany({ data })

    if (!addSubCat) {
      res.json({ sucess: false })
      return
    }

    res.json({ sucess: true, data: addSubCat })
  },

  getAllSubCategories: async (req: Request, res: Response) => {
    const { cat } = req.query

    if (cat) {
      const response = await prisma.subCategory.findMany({
        where: {
          categoryId: parseInt(cat as string),
        },
        orderBy: {
          name: 'asc',
        },
        select: {
          id: true,
          name: true,
          cat: {
            select: {
              name: true,
            },
          },
        },
      })

      const data: ProductList[] = []

      for (const i in response) {
        data.push({
          id: response[i].id,
          name: Capitalize(response[i].name),
          cat: Capitalize(response[i].cat.name),
        })
      }

      res.json({ sucess: true, data })
      return
    }

    const data = await prisma.subCategory.findMany({
      select: {
        id: true,
        name: true,
        cat: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!data) {
      res.json({ error: true })
      return
    }
    res.json({ sucess: true, data })
  },
}
