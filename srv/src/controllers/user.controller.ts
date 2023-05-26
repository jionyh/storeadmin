import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import JWT, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const user = {
  getUser: async (req: Request, res: Response) => {
    const parse = z
      .object({
        token: z.string().nonempty(),
      })
      .safeParse(req.body)

    if (!parse.success) {
      res.status(400).json({ success: false, error: 'Token não informado!' })
      return
    }

    const data = JWT.verify(
      parse.data.token,
      process.env.JWT_SECRET_KEY as string,
    ) as JwtPayload

    try {
      const user = await prisma.user.findUnique({
        where: { id: data.id },
      })

      if (user) {
        res.status(200).json({
          success: true,
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: parse.data.token,
          }
        })
      }
    } catch (e) {
      res.status(400).json({ success: false, error: e })
    }
  },
}
