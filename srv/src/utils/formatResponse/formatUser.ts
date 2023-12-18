import { UserTypes } from "../../types/UserTypes";
import { Capitalize } from "../capitalizeFirstLetter";

export const formatUserResponse = (user: UserTypes) => {
  return {
    id: user.id,
    name: Capitalize(user.name),
    email: user.email,
    role: user.role,
  };
};
