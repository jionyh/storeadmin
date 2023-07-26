/* Função para padronizar o retorno de erros */

import { Response } from 'express'
import { ZodIssue } from 'zod'

import {ErrorMessages, errorMessages,successMessages} from './ResponseMessages'

/**
 * Function to send a standardized error response.
 * @example
 * // Example 1: Sending an error response with a single error message provided by ResponseMessages.
 * sendErrorResponse(res, 400, 'idNotSent');
 *
 * @example
 * // Example 2: Sending an error response with multiple Zod issues.
  * const zodIssues = [
 *   { path: ['name'], message: 'Name is required.' },
 *   { path: ['email'], message: 'Invalid email address.' }
 * ];
 * sendErrorResponse(res, 422, zodIssues);
 * 
 * If the `errorMessage` is an array of `ZodIssue` objects, it will be transformed
 * into an array of objects containing the field and message properties. Otherwise,
 * it uses the `ErrorMessages` object to retrieve the corresponding error message.
 *
 * @param {Response} res The response object.
 * @param {number} statusCode The status code for the response (default: 404).
 * @param {ZodIssue[] | keyof ErrorMessages} errorMessage The error message,
 * an array of ZodIssue objects, or a key from the ErrorMessages interface.
 * @returns {Response} The response with error details.
 */

export const sendErrorResponse = (
  res: Response,
  statusCode: number = 404,
  errorMessage: ZodIssue[] | keyof ErrorMessages,
) => {
  /* Verifica se o erro chegou como um array do zod. Senão passa os key de ErrorMessages */
  const error =
    errorMessage instanceof Array
      ? errorMessage.map((issue: ZodIssue) => ({
          field: issue.path[1],
          message: issue.message,
        }))
      : errorMessages[errorMessage || 'Erro desconhecido'];
  return res.status(statusCode).json({ success: false, error })
}


/**
 * Function to send a standardized success response.
 * 
 * @param {Response} res The response object.
 * @param {number} statusCode The status code for the response (default: 404).
 * @param {string} endpoint The endpoint name (optional).
 * @param {any} data The data to be sent in the response (optional).
 * @returns {Response} The response with success details.
 */
export const sendSuccessResponse = (
  res: Response,
  statusCode: number = 404,
  endpoint?: string,
  data?: any,
) => {
  if (endpoint && data) {
    return res.status(statusCode).json({
      success: true,
      [endpoint]: data,
    })
  } else {
    res.status(statusCode).json({ success: true })
  }
}
