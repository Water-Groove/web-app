/*
  Warnings:

  - You are about to drop the column `auth0Id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth_Id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_Id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_auth0Id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "auth0Id",
ADD COLUMN     "auth_Id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_auth_Id_key" ON "User"("auth_Id");
