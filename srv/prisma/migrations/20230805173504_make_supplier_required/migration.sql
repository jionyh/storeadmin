/*
  Warnings:

  - Made the column `supplier` on table `purchases` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "purchases" ALTER COLUMN "supplier" SET NOT NULL;
