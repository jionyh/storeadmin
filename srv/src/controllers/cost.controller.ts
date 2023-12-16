import { Request, Response } from "express";
import * as costService from "../services/cost.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/sendResponse";
import { createCostSchema } from "../utils/validationSchema";
import { Options } from "../types/ServiceOptionsType";
import { sumValues } from "../utils/sumValuesFromArray";
import { formatCostResponse } from "../utils/formatResponse/formatCost";
import { paginationFn } from "../utils/pagination";
import dayjs from "dayjs";
import { createRecurrentCostForTenants } from "../cron/scheduleCost";

export const cost = {
  getAllCosts: async (req: Request, res: Response) => {
    const { date, page, perpage, period = "month" } = req.query;

    const options = {
      date: date as string,
      period: period as Options["period"],
      pageNumber: parseInt(page as string) || 1,
      resultsPerPage: parseInt(perpage as string) || 10,
    };

    const { totalRecords, costs } = await costService.getAllCosts(req.tenant_id, options);

    if (costs.length < 1 && totalRecords < 1) return sendErrorResponse(res, 404, "costNotFound");

    const { total, periodName } = sumValues(costs, period as string);

    const response = {
      pagination: paginationFn(totalRecords, options),
      [periodName]: total,
      costs: formatCostResponse(costs),
    };

    sendSuccessResponse(res, 200, "costs", response);
  },

  getCost: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) return sendErrorResponse(res, 400, "idNotSent");
    if (!req.tenant_id) return sendErrorResponse(res, 404, "tenantNotFound");

    try {
      const cost = await costService.getCostById(req.tenant_id, parseInt(id as string));

      if (!cost) return sendErrorResponse(res, 404, "costNotFound");

      sendSuccessResponse(res, 200, "cost", formatCostResponse(cost));
    } catch (e) {
      sendErrorResponse(res, 500, "costNotFound");
    }
  },

  createCost: async (req: Request, res: Response) => {
    const parse = createCostSchema.array().nonempty("Dados não enviados").safeParse(req.body);

    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues);

    let costData: { name: string; value: number; tenant_id: number; createAt: Date; recurrent: boolean }[] = [];

    parse.data.map((i) => {
      costData.push({
        name: i.name,
        value: i.value,
        createAt: i.date,
        recurrent: i.recurrent,
        tenant_id: req.tenant_id,
      });
    });

    try {
      for (const cost of costData) {
        if (cost.recurrent) {
          const recurrentCostCreated = await costService.createCostRecurrent(cost);
          const recurrentCostData = {
            ...cost,
            recurrent_id: recurrentCostCreated.id,
          };
          await costService.createCost({ ...cost, recurrent_id: recurrentCostCreated.id });
        } else {
          await costService.createCost(cost);
        }
      }
      sendSuccessResponse(res, 200);
    } catch (e) {
      console.log(e);
      sendErrorResponse(res, 400, "createCostError");
    }
  },

  deleteCost: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) return sendErrorResponse(res, 400, "idNotSent");

    try {
      await costService.deleteCostById(parseInt(id as string));
      sendSuccessResponse(res, 200);
    } catch (e) {
      sendErrorResponse(res, 400, "costNotFound");
    }
  },

  deleteRecurrentCost: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return sendErrorResponse(res, 400, "idNotSent");

    try {
      const deleteRecurrent = await costService.deleteRecurrentCost(parseInt(id as string));
      if (!deleteRecurrent) return sendErrorResponse(res, 400, "costNotFound");
      sendSuccessResponse(res, 200);
    } catch (e) {
      sendErrorResponse(res, 400, "costNotFound");
    }
  },
};
