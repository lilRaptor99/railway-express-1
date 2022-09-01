/*
  Warnings:

  - A unique constraint covering the columns `[nic]` on the table `CrewMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'BANNED');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('HIDDEN', 'VISIBLE');

-- DropForeignKey
ALTER TABLE "CrewMember" DROP CONSTRAINT "CrewMember_stationId_fkey";

-- AlterTable
ALTER TABLE "CrewMember" ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'VISIBLE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "ReasonToBlock" (
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "ReasonToBlock_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CrewMember_nic_key" ON "CrewMember"("nic");

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReasonToBlock" ADD CONSTRAINT "ReasonToBlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";
