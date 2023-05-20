import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'

export const unit = {
  getAllUnit: async (req: Request, res: Response) => {
    const units = await prisma.unit.findMany()

    if (!units) {
      res.json({ status: false })
      return
    }
    console.log(units)

    res.json({ status: true, data: units })
  },
}
