/* Função para padronizar o retorno de erros */

import { Response } from "express";
import { ZodIssue } from "zod";

import { ErrorMessages, successMessages } from "./ResponseMessages";

export const sendErrorResponse = (
  res: Response,
  statusCode: number = 404,
  errorMessage: ZodIssue[] | keyof typeof ErrorMessages = "Erro desconhecido" as keyof typeof ErrorMessages
) => {
  /* Verifica se o erro chegou como um array do zod. Senão passa os key de ErrorMessages */
  const error =
    errorMessage instanceof Array
      ? errorMessage.map((issue: ZodIssue) => ({
          field: issue.path[0],
          message: issue.message,
        }))
      : ErrorMessages[errorMessage];
  return res.status(statusCode).json({ success: false, error });
};

/**
 * Function to send a standardized success response.
 *
 * @param {Response} res The response object.
 * @param {number} statusCode The status code for the response (default: 404).
 * @param {string} endpoint The endpoint name (optional).
 * @param {any} data The data to be sent in the response (optional).
 * @returns {Response} The response with success details.
 */
export const sendSuccessResponse = (res: Response, statusCode: number = 404, endpoint?: string, data?: any) => {
  if (endpoint && data) {
    return res.status(statusCode).json({
      success: true,
      [endpoint]: data,
    });
  } else {
    res.status(statusCode).json({ success: true });
  }
};
