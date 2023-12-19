import { prisma } from "../lib/prisma";
import { UserTypes } from "../types/UserTypes";

export const getUser = async (id: number) => {
  try {
    return await prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while fetching user data.");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return user;
    } else return null;
  } catch (e) {
    console.log("Error fetching user by tenant and email:", e);
    throw new Error("Failed to get user by tenant and email");
  }
};

export const changePassword = async (user: Omit<UserTypes, "role" | "tenant_id">) => {
  try {
    return await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: user.passwordHash,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while updating user.");
  }
};
