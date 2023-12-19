import dayjs from "dayjs";
import { prisma } from "../lib/prisma";

export const getTenantIdBySlug = async (slug: string) => {
  try {
    const dbResponse = await prisma.tenant.findUnique({ where: { slug } });
    if (dbResponse) {
      return dbResponse.id;
    } else return null;
  } catch (e) {
    console.log("Error fetching tenant by slug:", e);
    throw new Error("Failed to get tenant by slug");
  }
};
