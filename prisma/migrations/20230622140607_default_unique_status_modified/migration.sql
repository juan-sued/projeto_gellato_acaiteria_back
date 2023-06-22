-- DropIndex
DROP INDEX "categories_description_key";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT E'Pendente';
