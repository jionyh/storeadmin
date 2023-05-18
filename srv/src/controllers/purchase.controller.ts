/* eslint-disable array-callback-return */
import { Request, Response, name } from 'express'
import { z } from 'zod'
import dayjs from 'dayjs'

import { prisma } from '../lib/prisma'
import { PurchaseListType } from '../types/PurchaseListType'
import { category } from './category.controller'

const purchaseSchema = z
  .object({
    itemId: z
      .string()
      .nonempty()
      .transform((i) => parseInt(i)),
    userId: z
      .string()
      .nonempty()
      .transform((i) => parseInt(i)),
    unitId: z
      .string()
      .nonempty()
      .transform((i) => parseInt(i)),
    quantity: z
      .string()
      .nonempty()
      .transform((i) => parseInt(i)),
    value: z
      .string()
      .nonempty()
      .transform((i) => parseInt(i)),
  })
  .array()

export const purchase = {
  createPurchase: async (req: Request, res: Response) => {
    const data = purchaseSchema.safeParse(req.body)

    if (data.success === false) {
      const errors = data.error.issues
        .map((item) => item.path[1])
        .map((er) => `O campo ${er} precisa ser preenchido`)
      res.json({
        status: false,
        error: errors,
      })
      return
    }

    const parsedData = data.data

    try {
      const addPurchases = await prisma.purchase.createMany({
        data: parsedData,
      })

      if (!addPurchases) {
        res.json({ sucess: false })
        return
      }
      res.json({ sucess: true, addPurchases })
    } catch (e: any) {
      res.status(400).json({ status: false, error: e.meta.field_name })
    }
  },

  getPurchases: async (req: Request, res: Response) => {
    const { date } = req.query

    const purchaseList: PurchaseListType[] = []

    const purchases = await prisma.purchase.findMany({
      where: {
        createAt: {
          lt: date
            ? dayjs(date as string)
                .add(1, 'day')
                .format()
            : undefined,
          gt: date ? dayjs(date as string).format() : undefined,
        },
      },
      include: {
        unit: {
          select: {
            abbreviation: true,
          },
        },
        subcategory: {
          select: {
            cat: {
              select: {
                id: true,
              },
            },
            name: true,
          },
        },
      },
    })

    const category = await prisma.category.findMany()

    if (!purchases) {
      res.json({ sucess: false })
      return
    }

    for (const i in purchases) {
      purchaseList.push({
        category: purchases[i].subcategory.cat.id,
        id: purchases[i].id,
        catId: purchases[i].subcategory.cat.id,
        name: purchases[i].subcategory.name,
        quantity: purchases[i].quantity,
        unit: purchases[i].unit.abbreviation,
        valor: purchases[i].value,
      })
    }

    const soma = purchaseList.reduce((soma, obj) => {
      return soma + obj.valor
    }, 0)

    const result = category
      .map((el) => {
        const haveCat = purchaseList.some((item) => item.catId === el.id)
        if (haveCat) {
          return {
            ...el,
            produto: purchaseList.filter(({ catId }) => el.id === catId),
          }
        }
      })
      .filter((item) => item !== undefined)
    res.json({ sucess: true, data: result, total: soma })
  },
}
