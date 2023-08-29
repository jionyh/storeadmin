/*
  Warnings:

  - You are about to drop the `CostRecurrent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CostRecurrent" DROP CONSTRAINT "CostRecurrent_tenant_id_fkey";

-- DropTable
DROP TABLE "CostRecurrent";

-- CreateTable
CREATE TABLE "costsRecurrents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "recurrent" BOOLEAN NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "costsRecurrents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "costsRecurrents" ADD CONSTRAINT "costsRecurrents_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
