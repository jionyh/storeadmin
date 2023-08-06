import { Request, Response } from "express";
import * as purchaseService from "../services/purchase.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/sendResponse";
import { createPurchaseSchema } from "../utils/validationSchema";
import { Options } from "../types/ServiceOptionsType";
import {
  formatPurchaseReturnWithoutTotal,
  formatPurchasesReturnWithTotal,
} from "../utils/formatResponse/formatPurchase";
import { sumValues } from "../utils/sumValuesFromArray";
import { PurchaseType } from "../types/PurchaseType";

export const purchase = {
  getAllPurchases: async (req: Request, res: Response) => {
    const { date, page, perpage, period = "month" } = req.query;

    const options = {
      date: date as string,
      period: period as Options["period"],
      pageNumber: parseInt(page as string) || 1,
      resultsPerPage: parseInt(perpage as string) || 10,
    };

    const { totalRecords, purchase } = await purchaseService.getAllPurchase(
      req.tenant_id,
      options
    );

    if (purchase.length < 1 && totalRecords < 1)
      return sendErrorResponse(res, 404, "purchaseNotfound");

    const totalPages = Math.ceil(totalRecords / options.resultsPerPage);

    const pagination = {
      totalRecords,
      totalPages,
      currentPage: options.pageNumber,
      recordsPerPage: options.resultsPerPage,
    };

    const { total, periodName } = sumValues(purchase, period as string);

    const response = {
      pagination,
      [periodName]: parseFloat(total.toFixed(2)),
      allPurchases: formatPurchasesReturnWithTotal(purchase),
    };

    sendSuccessResponse(res, 200, "purchases", response);
  },

  getPurchase: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) return sendErrorResponse(res, 400, "idNotSent");

    const purchase = await purchaseService.getPurchaseById(
      req.tenant_id,
      parseInt(id as string)
    );

    if (!purchase) return sendErrorResponse(res, 404, "purchaseNotfound");

    sendSuccessResponse(
      res,
      200,
      "purchase",
      formatPurchaseReturnWithoutTotal(purchase)
    );
  },

  createPurchase: async (req: Request, res: Response) => {
    const parse = createPurchaseSchema
      .array()
      .nonempty("Dados não enviados")
      .safeParse(req.body);

    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues);

    type PurchaseDataType = Array<PurchaseType & { tenant_id: number }>;

    let purchaseData: PurchaseDataType = [];

    parse.data.map((i) => {
      purchaseData.push({
        quantity: i.quantity,
        value: i.value,
        product_id: i.product_id,
        supplier: i.supplier ? i.supplier : "---",
        unit_id: i.unit_id,
        tenant_id: req.tenant_id,
      });
    });

    const purchaseCreated = await purchaseService.createPurchase(purchaseData);

    if (!purchaseCreated)
      return sendErrorResponse(res, 400, "createPurchaseError");

    sendSuccessResponse(res, 200);
  },

  deletePurchase: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) return sendErrorResponse(res, 400, "idNotSent");

    const deletePurchase = await purchaseService.deletePurchaseById(
      parseInt(id as string)
    );

    if (!deletePurchase) return sendErrorResponse(res, 400, "purchaseNotfound");

    sendSuccessResponse(res, 200);
  },
};
