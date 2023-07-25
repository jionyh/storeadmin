import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import * as authService from '../services/auth.service'
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse'

dotenv.config()

export const auth = {
  signup : async(req:Request, res:Response)=>{
  /* Rota será usada no front do painel de gerenciamento de tenant */
  sendSuccessResponse(res,200,'auth',"endpoint não implementado")
  },
  signin: async(req:Request, res:Response)=>{
    const parse = z
      .object({
        email: z.string().email({ message: 'Email inválido!' }),
        password: z.string(),
        tenant_slug: z.string()
      }).safeParse(req.body)
      
      /* Verifica se os dados enviados conferem conforme o schema */
      if(!parse.success) return sendErrorResponse(res,400, 'Usuário ou senha incorretos')
 
      /* Verifica se existe o tenant pela slug passada */
      const tenantId = await authService.getTenantIdBySlug(parse.data.tenant_slug)
      if(!tenantId) return sendErrorResponse(res,404,'Usuário ou senha incorreto')
      
      /* Caso exista o Tenant busca o usuario pelo ID do Tenant e o email */
      const user = await authService.getUserByTenant(tenantId,parse.data.email)
      if(!user) return sendErrorResponse(res,401,'Usuário ou senha incorretos')

      /* Verifica o password */
      const checkPassword = await bcrypt.compare(
        parse.data.password,
        user.passwordHash
      )
      if(!checkPassword) return sendErrorResponse(res,401,'Usuário ou senha incorretos')

      /* Criação do jwt com as informações */
      const token = JWT.sign({
        id: user.id,
        email: user.email,
        tenant_id: user.tenant_id
      },
      process.env.JWT_SECRET_KEY as string,
      {expiresIn: '24h'})

      sendSuccessResponse(res,200,'signin',token)
  }
}