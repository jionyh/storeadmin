import { prisma } from "../lib/prisma";
import { UnitType } from "../types/UnitType";

export const getAllPaymentMethods = async (tenant_id: number): Promise<any> => {
  try {
    const paymentsMethods = await prisma.paymentMethod.findMany({
      where: { tenant_id, is_deleted: false },
      orderBy: { id: "asc" },
    });
    return paymentsMethods;
  } catch (e) {
    console.log(e);
    throw new Error("An error occurred while fetching payments methods data.");
  }
};

export const createPaymentMethod = async (
  data: UnitType
): Promise<UnitType> => {
  try {
    return await prisma.unit.create({ data });
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while creating unit.");
  }
};

export const editPaymentMethod = async (
  id: number,
  data: { name?: string }
) => {
  try {
    const editUnit = await prisma.unit.update({
      where: { id },
      data,
    });
    return editUnit;
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while editing unit data.");
  }
};

export const togglePaymentMethod = async (id: number, toggle: boolean) => {
  try {
    const toggleUnit = await prisma.unit.update({
      where: { id },
      data: {
        is_deleted: toggle === false ? true : false,
      },
    });
    return toggleUnit;
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while creating unit data.");
  }
};

export const deletePaymentMethodById = async (id: number) => {
  return prisma.unit.delete({ where: { id } });
};
