/*
  Warnings:

  - You are about to drop the column `routeCode` on the `Station` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('DRIVER', 'DRIVER_ASSISTANT', 'HEAD_GUARD', 'UNDER_GUARD');

-- AlterTable
ALTER TABLE "Station" DROP COLUMN "routeCode";

-- CreateTable
CREATE TABLE "CrewMember" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "address" TEXT,
    "occupation" "Occupation" NOT NULL,
    "stationId" TEXT NOT NULL,

    PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("stationId") REFERENCES "Station"("stationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD FOREIGN KEY ("stationId") REFERENCES "Station"("stationId") ON DELETE CASCADE ON UPDATE CASCADE;
