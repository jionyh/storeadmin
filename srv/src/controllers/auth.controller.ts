import { Request, Response } from "express";
import bcrypt from "bcrypt";
import cookie from "cookie";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/sendResponse";
import { signInSchema } from "../utils/validationSchema";

dotenv.config();

export const auth = {
  signup: async (req: Request, res: Response) => {
    /* Rota será usada no front do painel de gerenciamento de tenant */
    sendSuccessResponse(res, 200, "auth", "endpoint não implementado");
  },
  signin: async (req: Request, res: Response) => {
    const parse = signInSchema.safeParse(req.body);

    /* Verifica se os dados enviados conferem conforme o schema */
    if (!parse.success) return sendErrorResponse(res, 400, "userNotFound");

    /* Verifica se existe o tenant pela slug passada */
    //const tenantId = await authService.getTenantIdBySlug(parse.data.tenant_slug)
    //if(!tenantId) return sendErrorResponse(res,404, 'userNotFound')

    /* Busca Usuario pelo email */
    const user = await userService.getUserByEmail(parse.data.email);
    if (!user) return sendErrorResponse(res, 401, "userNotFound");

    /* Verifica o password */
    const checkPassword = await bcrypt.compare(parse.data.password, user.passwordHash);
    if (!checkPassword) return sendErrorResponse(res, 401, "userNotFound");

    /* Criação do jwt com as informações */
    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
        tenant_id: user.tenant_id,
      },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "8h" }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("authToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 8,
        sameSite: "lax",
        path: "/",
        //secure: false,
      })
    );

    const response = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    sendSuccessResponse(res, 200, "user", response);
  },
};
