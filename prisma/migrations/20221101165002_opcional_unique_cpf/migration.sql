/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "cpf" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");
