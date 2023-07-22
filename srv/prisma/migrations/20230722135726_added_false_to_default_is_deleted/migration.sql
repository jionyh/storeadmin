-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "is_deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "paymentsMethods" ALTER COLUMN "is_deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "is_deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "units" ALTER COLUMN "is_deleted" SET DEFAULT false;
