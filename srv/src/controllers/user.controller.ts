import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import JWT, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'

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
            cpf: user.cpf,
            email: user.email,
            role: user.role,
            token: parse.data.token,
          },
        })
      }
    } catch (e) {
      res.status(400).json({ success: false, error: e })
    }
  },

  editUser: async (req: Request, res: Response) => {
    const { id } = req.params

    const user: {
      name?: string
      cpf?: string
      email?: string
      passwordHash?: string
    } = {}

    const parse = z
      .object({
        name: z
          .string()
          .toLowerCase()
          .min(3, 'Comprimento do nome muito pequeno!')
          .nonempty('O nome não pode ser vazio.'),
        email: z.string().email('Email inválido!').toLowerCase().nonempty(),
        cpf: z.string().length(11, 'CPF Inválido!'),
        password: z.union([
          z.string().min(6, 'Senha precisa ter mais de 6 caracteres.'),
          z.null(),
        ]),
      })
      .safeParse(req.body)
    // Se o parse der errado, o erro é formatado e enviado
    if (!parse.success) {
      const errors = parse.error.flatten()
      res.json({ success: false, message: errors.fieldErrors })
      return
    }
    // Caso venha o password, adiciona ele como hash ao objeto que irá ao banco
    if (parse.data.password) {
      const passwordHash = await bcrypt.hash(parse.data.password, 10)
      user.passwordHash = passwordHash
    }
    // Adicionando os dados ao objeto
    user.name = parse.data.name
    user.cpf = parse.data.cpf
    user.email = parse.data.email

    try {
      const updateUser = await prisma.user.update({
        where: { id: parseInt(id as string) },
        data: user,
      })

      res.status(200).json({ success: true, data: updateUser })
    } catch (e) {
      res.json({ success: false, message: e })
    }
  },

  addUser: async (req: Request, res: Response) => {
    const user = { name: '', email: '', cpf: '', passwordHash: '' }

    const parse = z
      .object({
        name: z
          .string()
          .toLowerCase()
          .min(3, 'Comprimento do nome muito pequeno!')
          .nonempty('O nome não pode ser vazio.'),
        email: z.string().email('Email inválido!').toLowerCase().nonempty(),
        cpf: z.string().length(11, 'CPF Inválido!'),
        password: z.string().min(6, 'Senha precisa ter mais de 6 caracteres.'),
      })
      .safeParse(req.body)
    // Se o parse der errado, o erro é formatado e enviado
    if (!parse.success) {
      const errors = parse.error.flatten()
      res.json({ success: false, message: errors.fieldErrors })
      return
    }
    // Caso venha o password, adiciona ele como hash ao objeto que irá ao banco
    if (parse.data.password) {
      const passwordHash = await bcrypt.hash(parse.data.password, 10)
      user.passwordHash = passwordHash
    }
    // Adicionando os dados ao objeto
    user.name = parse.data.name
    user.cpf = parse.data.cpf
    user.email = parse.data.email

    try {
      const updateUser = await prisma.user.create({
        data: user,
      })

      res.status(200).json({ success: true, data: updateUser })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          res.json({
            success: false,
            message: ` Email e/ou CPF já cadastrado!`,
          })
          return
        }
      }
      res.json({ success: false, message: e })
    }
  },
}
