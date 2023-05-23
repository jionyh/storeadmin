/* eslint-disable array-callback-return */
import { Request, Response } from 'express'
import { z } from 'zod'
import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
// import { Capitalize } from '../utils/capitalizeFirstLetter'
import { SalesReturn } from '../types/Sales'

export const sale = {
  getAllSales: async (req: Request, res: Response) => {
    const { date } = req.query

    try {
      const sales = await prisma.sale.findMany({
        orderBy: { id: 'asc' },
        include: { paymentsMethods: true },
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
      })

      const formatReturn: SalesReturn[] = []

      sales.forEach((item) => {
        // Constante que retorna o index ou -1 caso ache no array a condição abaixo
        const existingDayIndex = formatReturn.findIndex((entry) => {
          const d = dayjs(item.createAt).format('YYYY-MM-DD')
          console.log(d, entry.day)
          return entry.day === d
        })
        console.log(item.id, existingDayIndex)

        // Se o array retorna -1, adiciona ao array usando o index encontrado acima
        if (existingDayIndex !== -1) {
          formatReturn[existingDayIndex].data.push({
            id: item.id,
            value: item.value.toFixed(2).toString(),
            payment: item.paymentsMethods.name,
          })
          // Senão, ele adiciona com o day e cria o objeto novo dentro do array
        } else {
          formatReturn.push({
            day: dayjs(item.createAt).format('YYYY-MM-DD'),
            data: [
              {
                id: item.id,
                value: item.value.toFixed(2).toString(),
                payment: item.paymentsMethods.name,
              },
            ],
          })
        }
      })

      const soma = sales.reduce((soma, obj) => {
        return soma + obj.value
      }, 0)

      res.status(200).json({
        success: true,
        total: soma.toFixed(2).toString(),
        data: formatReturn,
      })
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
      const addSale = await prisma.sale.createMany({ data: parse.data })
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
      await prisma.sale.delete({
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
      const updatedPurchase = await prisma.sale.update({
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
