/* eslint-disable array-callback-return */
import { Request, Response } from 'express'
import { z } from 'zod'
import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { PurchaseListType } from '../types/PurchaseListType'
import { Capitalize } from '../utils/capitalizeFirstLetter'

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
      .transform((i) => parseFloat(i)),
    value: z
      .string()
      .nonempty()
      .transform((i) => parseFloat(i)),
    supplier: z.string().transform((i) => (i === '' ? '---' : i)),
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
        res.json({ success: false })
        return
      }
      res.json({ success: true, addPurchases })
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
          gte: date
            ? dayjs(date as string)
                .startOf('day')
                .toDate()
            : undefined,
          lte: date
            ? dayjs(date as string)
                .endOf('day')
                .toDate()
            : undefined,
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
      res.json({ success: false })
      return
    }
    for (const i in purchases) {
      purchaseList.push({
        id: purchases[i].id,
        catId: purchases[i].subcategory.cat.id,
        name: Capitalize(purchases[i].subcategory.name),
        quantity: purchases[i].quantity.toString(),
        unit: purchases[i].unit.abbreviation,
        value: purchases[i].value.toFixed(2).toString(),
        supplier: Capitalize(purchases[i].supplier!) || '',
      })
    }

    const soma = purchaseList.reduce((soma, obj) => {
      return soma + parseFloat(obj.value)
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

    res.json({ success: true, data: result, total: soma.toFixed(2) })
  },

  deletePurchase: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ success: false, error: 'id não enviado!' })
      return
    }
    const deletedPurchase = await prisma.purchase.delete({
      where: { id: parseInt(id as string) },
    })
    if (!deletedPurchase) {
      res.status(400).json({ success: false, error: 'Compra não localizada!' })
      return
    }

    res.status(200).json({
      success: true,
    })
  },

  editPurchase: async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
      res.status(400).json({ success: false, error: 'id não enviado!' })
      return
    }
    const parse = z
      .object({
        value: z.coerce
          .number({
            required_error: 'Valor não enviado!',
            invalid_type_error: 'Valor não enviado',
          })
          .nonnegative({ message: 'O valor não pode ser negativo!' })
          .optional(),
        quantity: z.coerce
          .number({
            required_error: 'Quantidade não enviada!',
            invalid_type_error: 'Quantidade não enviada',
          })
          .nonnegative({ message: 'A quantidade não pode ser negativa!' })
          .optional(),
      })
      .safeParse(req.body)

    if (!parse.success) {
      res
        .status(400)
        .json({ success: false, erro: parse.error.issues[0].message })
      return
    }

    try {
      const updatedPurchase = await prisma.purchase.update({
        where: { id: parseInt(id as string) },
        data: parse.data,
      })

      res.status(200).json({ success: true, data: updatedPurchase })
    } catch (e) {
      res.status(400).json({ success: false, data: e })
    }
  },
}
