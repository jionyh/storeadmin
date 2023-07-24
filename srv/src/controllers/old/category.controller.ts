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
    const data = await prisma.category.findMany({ orderBy: { name: 'asc' } })

    const categories = []

    for (const i in data) {
      categories.push({
        id: data[i].id,
        name: Capitalize(data[i].name),
      })
    }

    res.json({ success: true, data: categories })
  },
  editCategory: async (req: Request, res: Response) => {
    const { id } = req.params
    const parse = z
      .object({
        name: z.string().toLowerCase().nonempty().optional(),
      })
      .safeParse(req.body)

    if (!parse.success) {
      res
        .status(400)
        .json({ success: false, message: parse.error.issues[0].message })
      return
    }

    try {
      const editCategory = await prisma.category.update({
        where: { id: parseInt(id as string) },
        data: parse.data,
      })

      res.status(200).json({ success: true, data: editCategory })
    } catch (e) {
      res.json({ success: true, data: id })
    }
  },

  delCategory: async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
      res.json({ success: false, message: 'ID não informado!' })
      return
    }
    try {
      const deleteCategory = await prisma.category.delete({
        where: { id: parseInt(id as string) },
      })

      res.status(200).json({ success: true, data: deleteCategory })
    } catch (e) {
      res.json({ success: false, message: e })
    }
  },
}
