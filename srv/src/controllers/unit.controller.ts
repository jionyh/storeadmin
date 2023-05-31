import { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { Capitalize } from '../utils/capitalizeFirstLetter'

export const unit = {
  getAllUnit: async (req: Request, res: Response) => {
    const data = await prisma.unit.findMany({ orderBy: { name: 'asc' } })

    if (!data) {
      res.json({ success: false })
      return
    }

    const units = []

    for (const i in data) {
      units.push({
        id: data[i].id,
        name: Capitalize(data[i].name),
        abbreviation: data[i].abbreviation.toUpperCase(),
      })
    }

    res.json({ success: true, data: units })
  },

  editUnit: async (req: Request, res: Response) => {
    const { id } = req.params
    const parse = z
      .object({
        name: z.string().toLowerCase().nonempty().optional(),
        abbreviation: z.string().toLowerCase().nonempty().optional(),
      })
      .safeParse(req.body)

    if (!parse.success) {
      res
        .status(400)
        .json({ success: false, message: parse.error.issues[0].message })
      return
    }

    try {
      const editUnit = await prisma.unit.update({
        where: { id: parseInt(id as string) },
        data: parse.data,
      })

      res.status(200).json({ success: true, data: editUnit })
    } catch (e) {
      res.json({ success: true, data: id })
    }
  },

  deleteUnit: async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
      res.json({ success: false, message: 'ID não informado!' })
      return
    }
    try {
      const deleteUnit = await prisma.unit.delete({
        where: { id: parseInt(id as string) },
      })

      res.status(200).json({ success: true, data: deleteUnit })
    } catch (e) {
      res.json({ success: false, message: e })
    }
  },
}
