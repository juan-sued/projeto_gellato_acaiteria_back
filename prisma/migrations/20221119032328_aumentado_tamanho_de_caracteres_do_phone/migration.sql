-- DropIndex
DROP INDEX "addresses_id_userId_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(14);
