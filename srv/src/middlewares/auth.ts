import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { sendErrorResponse } from "../utils/sendResponse";

dotenv.config();

type JwtTokenType = {
  id: number;
  email: string;
  tenant_id: number;
  iat: number;
  exp: number;
};

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    const tokenHttp = req.cookies;

    if (!tokenHttp || !tokenHttp.authToken)
      return sendErrorResponse(res, 401, "invalidToken");

    const authToken = tokenHttp.authToken;

    try {
      const decodedToken = JWT.verify(
        authToken,
        process.env.JWT_SECRET_KEY as string
      ) as JwtTokenType;
      // Adiciona o tenant_id na requisição, assim é possível
      // pegar ele nas rotas que passam pelo middleware de autenticação
      req.tenant_id = decodedToken.tenant_id;
      next();
    } catch (e) {
      console.log("JWT verification error:", e);
      sendErrorResponse(res, 401, "notAllowed");
    }
  },
};
