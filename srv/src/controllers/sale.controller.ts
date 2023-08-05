import { Request, Response } from "express";
import * as saleService from "../services/sale.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/sendResponse";
import { createSaleSchema } from "../utils/validationSchema";
import { Options } from "../types/ServiceOptionsType";
import { SaleResponse } from "../types/SalesType";
import {
  formatSaleReturnWithoutTotal,
  formatSalesReturnWithTotal,
} from "../utils/formatResponse/formatSale";
import { sumValues } from "../utils/sumValuesFromArray";

export const sale = {
  getAllSales: async (req: Request, res: Response) => {
    const { date, page, perpage, period = "month" } = req.query;

    const options = {
      date: date as string,
      period: period as Options["period"],
      pageNumber: parseInt(page as string) || 1,
      resultsPerPage: parseInt(perpage as string) || 10,
    };

    const { totalRecords, sales } = await saleService.getAllSales(
      req.tenant_id,
      options
    );

    if (sales.length < 1 && totalRecords < 1)
      return sendErrorResponse(res, 404, "saleNotfound");

    const totalPages = Math.ceil(totalRecords / options.resultsPerPage);

    const pagination = {
      totalRecords,
      totalPages,
      currentPage: options.pageNumber,
      recordsPerPage: options.resultsPerPage,
    };

    const { total, periodName } = sumValues(sales, period as string);

    const response = {
      pagination,
      [periodName]: total,
      allSales: formatSalesReturnWithTotal(sales),
    };

    sendSuccessResponse(res, 200, "sales", response);
  },

  getSale: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) return sendErrorResponse(res, 400, "idNotSent");

    try {
      const sale = await saleService.getSaleById(
        req.tenant_id,
        parseInt(id as string)
      );

      if (!sale) return sendErrorResponse(res, 404, "saleNotfound");

      const saleData = {};

      sendSuccessResponse(res, 200, "sale", formatSaleReturnWithoutTotal(sale));
    } catch (e) {
      sendErrorResponse(res, 500, "saleNotfound");
    }
  },

  createSale: async (req: Request, res: Response) => {
    const parse = createSaleSchema
      .array()
      .nonempty("Dados não enviados")
      .safeParse(req.body);

    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues);

    let saleData: { value: number; payment_id: number; tenant_id: number }[] =
      [];

    parse.data.map((i) => {
      saleData.push({
        value: i.value,
        payment_id: i.payment_id,
        tenant_id: req.tenant_id,
      });
    });

    try {
      await saleService.createSale(saleData);
      sendSuccessResponse(res, 200);
    } catch (e) {
      console.log(e);
      sendErrorResponse(res, 400, "createSaleError");
    }
  },

  deleteSale: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) return sendErrorResponse(res, 400, "idNotSent");

    try {
      await saleService.deleteSaleById(parseInt(id as string));
      sendSuccessResponse(res, 200);
    } catch (e) {
      sendErrorResponse(res, 400, "saleNotfound");
    }
  },
};
