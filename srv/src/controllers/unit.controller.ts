import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { Capitalize } from '../utils/capitalizeFirstLetter'

export const unit = {
  getAllUnit: async (req: Request, res: Response) => {
    const data = await prisma.unit.findMany()

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
}
