/*
  Warnings:

  - You are about to drop the column `return` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "return",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "returnStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "validPeriod" INTEGER;
