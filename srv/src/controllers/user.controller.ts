import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import JWT, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

dotenv.config();

export const user = {
  addUser: async (req: Request, res: Response) => {
    const user = { name: "", email: "", passwordHash: "", tenant_id: 1 };

    const parse = z
      .object({
        name: z.string().toLowerCase().min(3, "Comprimento do nome muito pequeno!").nonempty("O nome não pode ser vazio."),
        email: z.string().email("Email inválido!").toLowerCase().nonempty(),
        password: z.string().min(6, "Senha precisa ter mais de 6 caracteres."),
        tenant_id: z.number().min(1),
      })
      .safeParse(req.body);
    // Se o parse der errado, o erro é formatado e enviado
    if (!parse.success) {
      const errors = parse.error.flatten();
      res.json({ success: false, message: errors.fieldErrors });
      return;
    }
    // Caso venha o password, adiciona ele como hash ao objeto que irá ao banco
    if (parse.data.password) {
      const passwordHash = await bcrypt.hash(parse.data.password, 10);
      user.passwordHash = passwordHash;
    }
    // Adicionando os dados ao objeto
    user.name = parse.data.name;
    user.email = parse.data.email;
    user.tenant_id = parse.data.tenant_id;

    try {
      const updateUser = await prisma.user.create({
        data: user,
      });

      res.status(200).json({ success: true, data: updateUser });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          res.json({
            success: false,
            message: ` Email e/ou CPF já cadastrado!`,
          });
          return;
        }
      }
      res.json({ success: false, message: e });
    }
  },
};
