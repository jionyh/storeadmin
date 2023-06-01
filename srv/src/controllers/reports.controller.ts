import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import dayjs from 'dayjs'
import { PurchaseQuery, ReportReturnList, SaleQuery } from '../types/Reports'
import { Capitalize } from '../utils/capitalizeFirstLetter'

export const reports = {
  getSalesValues: async (req: Request, res: Response) => {
    const { date } = req.query
    const month = {
      start: dayjs(date as string)
        .subtract(15, 'day')
        .startOf('day')
        .toDate(),
      end: dayjs(date as string)
        .add(14, 'day')
        .endOf('day')
        .toDate(),
    }
    const week = {
      start: dayjs(date as string)
        .subtract(3, 'day')
        .startOf('day')
        .toDate(),
      end: dayjs(date as string)
        .add(3, 'day')
        .endOf('day')
        .toDate(),
    }
    const day = {
      start: dayjs(date as string)
        .startOf('day')
        .toDate(),
      end: dayjs(date as string)
        .endOf('day')
        .toDate(),
    }

    try {
      const vendas = await prisma.sale.findMany({
        orderBy: {
          createAt: 'asc',
        },
        where: {
          createAt: {
            gte: date ? month.start : undefined,
            lte: date ? month.end : undefined,
          },
        },
      })
      const weekSales = vendas.filter((item) => {
        return item.createAt >= week.start && item.createAt <= week.end
      })
      const monthSales = vendas.filter((item) => {
        return item.createAt >= month.start && item.createAt <= month.end
      })
      const daySales = vendas.filter((item) => {
        return item.createAt > day.start && item.createAt < day.end
      })

      const returnData = {
        totalMonth: monthSales.reduce((acc, el) => acc + el.value, 0),
        totalWeek: weekSales.reduce((acc, el) => acc + el.value, 0),
        totalDay: daySales.reduce((acc, el) => acc + el.value, 0),
      }

      res.json({ success: true, data: returnData })
    } catch (e) {
      res.json('erro')
    }
  },
  getPurchasesValues: async (req: Request, res: Response) => {
    const { date } = req.query
    const month = {
      start: dayjs(date as string)
        .subtract(15, 'day')
        .startOf('day')
        .toDate(),
      end: dayjs(date as string)
        .add(14, 'day')
        .endOf('day')
        .toDate(),
    }
    const week = {
      start: dayjs(date as string)
        .subtract(3, 'day')
        .startOf('day')
        .toDate(),
      end: dayjs(date as string)
        .add(3, 'day')
        .endOf('day')
        .toDate(),
    }
    const day = {
      start: dayjs(date as string)
        .startOf('day')
        .toDate(),
      end: dayjs(date as string)
        .endOf('day')
        .toDate(),
    }

    try {
      const vendas = await prisma.purchase.findMany({
        orderBy: {
          createAt: 'asc',
        },
        where: {
          createAt: {
            gte: date ? month.start : undefined,
            lte: date ? month.end : undefined,
          },
        },
      })
      const weekPurchases = vendas.filter((item) => {
        return item.createAt >= week.start && item.createAt <= week.end
      })
      const monthPurchases = vendas.filter((item) => {
        return item.createAt >= month.start && item.createAt <= month.end
      })
      const dayPurchases = vendas.filter((item) => {
        return item.createAt > day.start && item.createAt < day.end
      })

      const returnData = {
        totalMonth: monthPurchases.reduce((acc, el) => acc + el.value, 0),
        totalWeek: weekPurchases.reduce((acc, el) => acc + el.value, 0),
        totalDay: dayPurchases.reduce((acc, el) => acc + el.value, 0),
      }

      res.json({ success: true, data: returnData })
    } catch (e) {
      res.json('erro')
    }
  },

  getReport: async (req: Request, res: Response) => {
    const { type, time, category } = req.query
    const date = dayjs().format('YYYY-MM-DD')

    let startDate, endDate

    switch (time) {
      case 'day':
        startDate = dayjs(date as string)
          .startOf('day')
          .toDate()
        endDate = dayjs(date as string)
          .endOf('day')
          .toDate()
        break
      case 'week':
        startDate = dayjs(date as string)
          .subtract(3, 'day')
          .startOf('day')
          .toDate()
        endDate = dayjs(date as string)
          .add(3, 'day')
          .endOf('day')
          .toDate()
        break
      case 'month':
        startDate = dayjs(date as string)
          .subtract(15, 'day')
          .startOf('day')
          .toDate()
        endDate = dayjs(date as string)
          .add(14, 'day')
          .endOf('day')
          .toDate()
        break
    }

    let purchases: PurchaseQuery[] = []
    let sales: SaleQuery[] = []

    if (type === 'purchase') {
      try {
        purchases = await prisma.purchase.findMany({
          orderBy: {
            createAt: 'asc',
          },
          where: {
            createAt: {
              gte: startDate,
              lte: endDate,
            },
            AND: {
              subcategory: {
                categoryId:
                  category !== 'all' ? parseInt(category as string) : undefined,
              },
            },
          },
          select: {
            value: true,
            subcategory: {
              select: {
                name: true,
                cat: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        })
      } catch (e) {
        purchases = e as any
      }
    }
    if (type === 'sale') {
      try {
        sales = await prisma.sale.findMany({
          orderBy: {
            createAt: 'asc',
          },
          where: {
            createAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          select: {
            value: true,
            paymentsMethods: {
              select: {
                name: true,
              },
            },
          },
        })
      } catch (e) {
        sales = e as any
      }
    }

    const formatedReturn: ReportReturnList = {
      category: '',
      labels: [],
      data: [],
    }

    if (purchases && category !== 'all') {
      const groupByProduct: {
        category: string
        product: string
        value: number
      }[] = []

      purchases.forEach((item) => {
        const existingDayIndex = groupByProduct.findIndex((entry) => {
          return entry.product === Capitalize(item.subcategory.name)
        })
        console.log(item.subcategory.name, existingDayIndex)
        if (existingDayIndex !== -1) {
          groupByProduct[existingDayIndex].value += item.value
        } else {
          groupByProduct.push({
            category: item.subcategory.cat.name,
            product: Capitalize(item.subcategory.name),
            value: item.value,
          })
        }
      })

      groupByProduct.forEach((purchase) => {
        formatedReturn.category = purchase.category
        formatedReturn.labels.push(purchase.product)
        formatedReturn.data.push(purchase.value)
      })
      // Caso a query seja para todos os produtos
    } else {
      const groupByCategory: {
        category: string
        value: number
      }[] = []

      purchases.forEach((item) => {
        const existingDayIndex = groupByCategory.findIndex((entry) => {
          return entry.category === item.subcategory.cat.name
        })
        if (existingDayIndex !== -1) {
          groupByCategory[existingDayIndex].value += item.value
        } else {
          groupByCategory.push({
            category: Capitalize(item.subcategory.cat.name),
            value: item.value,
          })
        }
      })

      groupByCategory.forEach((purchase) => {
        formatedReturn.category = 'Todos os Produtos'
        formatedReturn.labels.push(purchase.category)
        formatedReturn.data.push(purchase.value)
      })
    }

    if (sales) {
      const groupByPaymentMethod: {
        payment: string
        value: number
      }[] = []

      sales.forEach((item) => {
        const existingDayIndex = groupByPaymentMethod.findIndex((entry) => {
          return entry.payment === item.paymentsMethods.name
        })
        if (existingDayIndex !== -1) {
          groupByPaymentMethod[existingDayIndex].value += item.value
        } else {
          groupByPaymentMethod.push({
            payment: Capitalize(item.paymentsMethods.name),
            value: item.value,
          })
        }
      })

      groupByPaymentMethod.forEach((item) => {
        formatedReturn.category = 'Vendas'
        formatedReturn.labels.push(item.payment)
        formatedReturn.data.push(item.value)
      })
    }
    res.json({ success: true, data: formatedReturn })
  },
}
