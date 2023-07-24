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
      res.json({ success: false })
      return
    }

    res.json({ success: true, data: addSubCat })
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

      res.json({ success: true, data })
      return
    }

    const data = await prisma.subCategory.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        categoryId: true,
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
    res.json({ success: true, data })
  },

  editSubCategory: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ success: false, error: 'id não enviado!' })
      return
    }

    const parse = z
      .object({
        id: z.number().optional(),
        categoryId: z.coerce.number().nonnegative(),
        name: z.string().toLowerCase(),
      })
      .safeParse(req.body)

    if (!parse.success) {
      res
        .status(400)
        .json({ success: false, erro: parse.error.issues[0].message })
      return
    }

    try {
      const updateProduct = await prisma.subCategory.update({
        where: { id: parseInt(id as string) },
        data: parse.data,
      })

      res.status(200).json({ success: true, data: updateProduct })
    } catch (e) {
      res.status(400).json({ success: false, error: e })
    }
  },

  delSubCategory: async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
      res.json({ success: false, message: 'ID não informado!' })
      return
    }
    try {
      const deleteSubCategory = await prisma.subCategory.delete({
        where: { id: parseInt(id as string) },
      })

      res.status(200).json({ success: true, data: deleteSubCategory })
    } catch (e) {
      res.json({ success: false, message: e })
    }
  },
}
