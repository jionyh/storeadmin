/* eslint-disable array-callback-return */
import { Request, Response } from 'express'
import { z } from 'zod'
import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { Capitalize } from '../utils/capitalizeFirstLetter'

export const sale = {
  getAllSales: async (req: Request, res: Response) => {
    try {
      const sales = await prisma.sales.findMany({
        orderBy: {
          id: 'asc',
        },
        include: {
          paymentsMethods: true,
        },
      })

      const formatReturn = []

      for (const i in sales) {
        formatReturn.push({
          id: sales[i].id,
          payment: Capitalize(sales[i].paymentsMethods.name),
          value: sales[i].value.toFixed(2),
          date: dayjs(sales[i].createAt).format('DD/MM/YYYY'),
        })
      }

      res.status(200).json({ success: true, data: formatReturn })
    } catch (e) {
      res.status(400).json({ success: false, message: e })
    }
  },
  createSale: async (req: Request, res: Response) => {
    const parse = z
      .object({
        value: z
          .string()
          .nonempty()
          .transform((number) => parseFloat(number.replace(',', '.'))),
        paymentId: z.coerce.number().gt(0),
      })
      .array()
      .safeParse(req.body)

    if (!parse.success) {
      res
        .status(400)
        .json({ success: false, message: parse.error.issues[0].message })
      return
    }

    try {
      const addSale = await prisma.sales.createMany({ data: parse.data })
      res.status(200).json({ success: true, data: addSale })
    } catch (e) {
      res.status(400).json({ success: false, message: e })
    }
  },
  deleteSale: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ success: false, error: 'id não enviado!' })
      return
    }
    try {
      await prisma.sales.delete({
        where: { id: parseInt(id as string) },
      })

      res.status(200).json({
        success: true,
      })
    } catch (e) {
      res.status(400).json({ success: false, error: 'Venda não localizada!' })
    }
  },
  editSale: async (req: Request, res: Response) => {
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
      })
      .safeParse(req.body)

    if (!parse.success) {
      res
        .status(400)
        .json({ success: false, erro: parse.error.issues[0].message })
      return
    }

    try {
      const updatedPurchase = await prisma.sales.update({
        where: { id: parseInt(id as string) },
        data: parse.data,
      })

      res.status(200).json({ success: true, data: updatedPurchase })
    } catch (e) {
      res.status(400).json({ success: false, error: e })
    }
  },

  getPayments: async (req: Request, res: Response) => {
    const payments = await prisma.paymentsMethods.findMany()

    res.json({ success: true, data: payments })
  },
}
