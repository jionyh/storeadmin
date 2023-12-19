import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import * as authService from "../services/auth.service";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import * as userService from "../services/user.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/sendResponse";
import { formatUserResponse } from "../utils/formatResponse/formatUser";
import { editUserSchema } from "../utils/validationSchema";

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

  getUser: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) return sendErrorResponse(res, 400, "idNotSent");

    try {
      const user = await userService.getUser(parseInt(id as string));

      if (!user) return sendErrorResponse(res, 404, "userNotFound");

      sendSuccessResponse(res, 200, "user", formatUserResponse(user));
    } catch (e) {
      sendErrorResponse(res, 500, "userNotFound");
    }
  },

  changePassword: async (req: Request, res: Response) => {
    const parse = editUserSchema.safeParse(req.body);

    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues);

    const userId = await userService.getUserByEmail(parse.data.email);
    if (!userId) return sendErrorResponse(res, 401, "userNotFound");

    const user = await userService.getUser(userId.id);
    if (!user) return sendErrorResponse(res, 401, "userNotFound");

    const checkPassword = await bcrypt.compare(parse.data.currentPassword, user.passwordHash);

    if (!checkPassword) return sendErrorResponse(res, 401, "userNotFound");

    const newUserData = {
      id: userId.id,
      name: parse.data.name,
      email: parse.data.email,
      passwordHash: await bcrypt.hash(parse.data.newPassword, 10),
    };

    try {
      const changePassword = await userService.changePassword(newUserData);
      sendSuccessResponse(res, 200);
    } catch (e) {
      console.log(e);
      sendErrorResponse(res, 400, "editUserError");
    }
  },
};
