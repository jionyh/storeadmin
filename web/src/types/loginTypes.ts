import { ResponseError } from "./commonsTypes";

type LoginResponseSuccess = {
  success: true;
  token: string;
};

export type LoginResponse = LoginResponseSuccess | ResponseError;