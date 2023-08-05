/*
  Warnings:

  - You are about to drop the column `item_id` on the `purchases` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_item_id_fkey";

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "item_id",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
