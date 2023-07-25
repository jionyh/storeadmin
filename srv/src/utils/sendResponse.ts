/* Função para padronizar o retorno de erros */

import { Response } from 'express'
import { ZodIssue } from 'zod'

/**
 * Function to send a standardized error response.
 * 
 * @param {Response} res The response object.
 * @param {number} statusCode The status code for the response (default: 404).
 * @param {string | ZodIssue[]} errorMessage The error message or an array of ZodIssue objects.
 * @returns {Response} The response with error details.
 */

export const sendErrorResponse = (
  res: Response,
  statusCode: number = 404,
  errorMessage: string | ZodIssue[],
) => {
  /* Verifica se o erro chegou como string ou erro de parse do zod */
  const message =
    typeof errorMessage === 'string'
      ? errorMessage
      : /* Função que faz o map, caso ocorra mais de um erro e cria um objeto que indica o campo e a mensagem de erro */
        errorMessage.map((issue: ZodIssue) => {
          return {
            field: issue.path[1],
            message: issue.message,
          }
        })
  return res.status(statusCode).json({ success: false, error: message })
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
