/*
  Warnings:

  - A unique constraint covering the columns `[auth_Id]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_Id` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "auth_Id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_auth_Id_key" ON "Admin"("auth_Id");
