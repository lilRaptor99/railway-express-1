/*
  Warnings:

  - The primary key for the `ReservedSeats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `compartmentNumber` to the `ReservedSeats` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `seatNumber` on the `ReservedSeats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ReservedSeats" DROP CONSTRAINT "ReservedSeats_pkey",
ADD COLUMN     "compartmentNumber" TEXT NOT NULL,
DROP COLUMN "seatNumber",
ADD COLUMN     "seatNumber" INTEGER NOT NULL,
ADD CONSTRAINT "ReservedSeats_pkey" PRIMARY KEY ("trainScheduleId", "compartmentNumber", "seatNumber");
