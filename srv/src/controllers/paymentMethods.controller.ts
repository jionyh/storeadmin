import { Request, Response } from "express";
import * as paymentService from "../services/paymentMethods.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/sendResponse";
import { formatPaymentMethodResponse } from "../utils/formatResponse/formatPaymentMethod";

export const paymentMethod = {
  getAllPayments: async (req: Request, res: Response) => {
    const paymentMethods = await paymentService.getAllPaymentMethods(req.tenant_id);

    if (paymentMethods.length < 1) return sendErrorResponse(res, 404, "paymentNotFound");

    sendSuccessResponse(res, 200, "paymentMethods", formatPaymentMethodResponse(paymentMethods));
  },
};
