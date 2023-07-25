import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    let success = false

    if (req.headers.authorization) {
      const [authType, token] = req.headers.authorization.split(' ')
      if (authType === 'Bearer') {
        try {
          const decodedToken = JWT.verify(
            token,
            process.env.JWT_SECRET_KEY as string,
          )
          if (decodedToken) {
            success = true
          }
        } catch (e) {
          console.log('erro', e)
        }
      }
    }

    if (success) {
      //Adiciona o req.tenant_id aqui com o decode do JWT
      next()
    } else {
      res.status(400).json({ success: false, error: 'Não autorizado!' })
    }
  },
}
