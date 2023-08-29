-- CreateTable
CREATE TABLE "CostRecurrent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "CostRecurrent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CostRecurrent" ADD CONSTRAINT "CostRecurrent_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
