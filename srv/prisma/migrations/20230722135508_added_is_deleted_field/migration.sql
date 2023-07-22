/*
  Warnings:

  - Added the required column `is_deleted` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_deleted` to the `paymentsMethods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_deleted` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_deleted` to the `units` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "paymentsMethods" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "units" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL;
