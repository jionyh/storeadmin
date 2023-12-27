import { Request, Response } from "express";
import { defaultDate } from "../utils/dateUtils";
import * as reportService from "../services/report.service";
import dayjs from "dayjs";

export const report = {
  cashflow: async (req: Request, res: Response) => {
    const date = defaultDate();

    const inflow = await reportService.inflow(req.tenant_id, date);

    const outflow = await reportService.outflow(req.tenant_id, date);

    if (!inflow || !outflow) return res.json({ error: "inflow not found" });

    const formatReturn = Array.from({ length: 6 }, (_, i) => {
      const start = dayjs(date).subtract(i, "months").startOf("month").toDate();
      const end = dayjs(date).subtract(i, "months").endOf("month").toDate();

      const filteredInflow = inflow.filter((item) => item.createAt >= start && item.createAt <= end).map((item) => ({ ...item }));

      const filteredOutflow = outflow.costOutflow
        .concat(outflow.purchaseOutflow)
        .filter((item) => item.createAt >= start && item.createAt <= end)
        .map((item) => ({ ...item }));

      return {
        month: dayjs(start).format("MMMM"),
        start,
        end,
        inflow: filteredInflow,
        outflow: filteredOutflow,
      };
    });

    const returnCashflowData: { month: string; inflow: string; outflow: string }[] = formatReturn.map((entry) => ({
      month: entry.month,
      inflow: entry.inflow.reduce((sum, item) => sum + item.value, 0).toFixed(2),
      outflow: entry.outflow.reduce((sum, item) => sum + item.value, 0).toFixed(2),
    }));

    res.json({ status: true, cashflow: returnCashflowData });
  },
};
