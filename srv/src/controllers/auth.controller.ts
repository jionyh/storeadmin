import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const auth = {
  signup: async (req: Request, res: Response) => {
    const parse = z
      .object({
        name: z
          .string()
          .min(5, 'O nome precisa ter mais de 5 caracteres!')
          .toLowerCase(),
        cpf: z.string().length(11, 'CPF inválido!'),
        email: z.string().email({ message: 'Email inválido!' }),
        password: z.string().min(6, 'Senha precisa ter mais de 6 caracteres!'),
        role: z.enum(['User', 'Admin']).default('User'),
      })
      .safeParse(req.body)

    if (!parse.success) {
      res.status(400).json(parse)
      return
    }

    const user = {
      name: parse.data.name,
      cpf: parse.data.cpf,
      email: parse.data.email,
      passwordHash: await bcrypt.hash(parse.data.password, 10),
      role: parse.data.role,
    }

    try {
      const createdUser = await prisma.user.create({
        data: user,
      })
      const token = JWT.sign(
        {
          id: createdUser.id,
          email: createdUser.email,
          cpf: createdUser.cpf,
        },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '24h' },
      )

      res.json({ success: true, token })
    } catch (e) {
      res.status(400).json({
        success: false,
        error: 'Email ou CPF já cadastrado!',
        hash: user.passwordHash,
      })
    }
  },
  signin: async (req: Request, res: Response) => {
    const parse = z
      .object({
        email: z.string().email({ message: 'Email inválido!' }),
        password: z.string().min(6, 'Senha precisa ter mais de 6 caracteres!'),
      })
      .safeParse(req.body)

    if (!parse.success) {
      res.status(400).json(parse)
      return
    }

    const user = await prisma.user.findFirst({
      where: { email: parse.data.email },
    })

    if (!user) {
      res
        .status(400)
        .json({ success: false, error: 'Usuário ou Senha Inválidos!' })
      return
    }

    const checkPassword = await bcrypt.compare(
      parse.data.password,
      user.passwordHash,
    )

    if (!checkPassword) {
      res
        .status(400)
        .json({ success: false, error: 'Usuário ou Senha Inválidos!' })
      return
    }

    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
        cpf: user.cpf,
      },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '24h' },
    )

    res.json({ success: true, token })
  },
  logout: async (req: Request, res: Response) => {
    res.json({ success: true })
  },
}
