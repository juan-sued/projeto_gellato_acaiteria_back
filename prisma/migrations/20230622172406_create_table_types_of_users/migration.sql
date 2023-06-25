/*
  Warnings:

  - You are about to alter the column `description` on the `ofertsOfDay` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to drop the column `isAdministrator` on the `users` table. All the data in the column will be lost.
  - Added the required column `typeOfUserId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ofertsOfDay_description_key";

-- AlterTable
ALTER TABLE "ofertsOfDay" ALTER COLUMN "description" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isAdministrator",
ADD COLUMN     "typeOfUserId" SMALLINT NOT NULL;

-- CreateTable
CREATE TABLE "typesOfUsers" (
    "id" SERIAL NOT NULL,
    "name" CHAR(100) NOT NULL,
    "access" CHAR(200) NOT NULL,
    "description" CHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "typesOfUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_typeOfUserId_fkey" FOREIGN KEY ("typeOfUserId") REFERENCES "typesOfUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
