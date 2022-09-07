-- CreateEnum
CREATE TYPE "TrainTurnAvailability" AS ENUM ('SO', 'NS', 'NSU', 'DAILY');

-- CreateEnum
CREATE TYPE "TrainTurnType" AS ENUM ('SLOW', 'EXPRESS', 'INTERCITY');

-- CreateEnum
CREATE TYPE "TrainReservationClass" AS ENUM ('FIRST_CLASS', 'SECOND_CLASS', 'THIRD_CLASS');

-- CreateTable
CREATE TABLE "TrainTurn" (
    "turnNumber" INTEGER NOT NULL,
    "turnName" TEXT NOT NULL,
    "reservable" BOOLEAN NOT NULL,
    "availability" "TrainTurnAvailability" NOT NULL DEFAULT 'DAILY',
    "type" "TrainTurnType" NOT NULL DEFAULT 'SLOW',

    CONSTRAINT "TrainTurn_pkey" PRIMARY KEY ("turnNumber")
);

-- CreateTable
CREATE TABLE "TrainCompartment" (
    "turnNumber" INTEGER NOT NULL,
    "compartmentNumber" TEXT NOT NULL,
    "seatCount" INTEGER NOT NULL,
    "class" "TrainReservationClass" NOT NULL DEFAULT 'THIRD_CLASS',

    CONSTRAINT "TrainCompartment_pkey" PRIMARY KEY ("turnNumber","compartmentNumber")
);

-- CreateTable
CREATE TABLE "IntermediateStation" (
    "stationId" TEXT NOT NULL,
    "arrivalTime" TEXT,
    "departureTime" TEXT,
    "isStart" BOOLEAN NOT NULL,
    "isEnd" BOOLEAN NOT NULL,
    "turnNumber" INTEGER NOT NULL,

    CONSTRAINT "IntermediateStation_pkey" PRIMARY KEY ("turnNumber","stationId")
);

-- AddForeignKey
ALTER TABLE "TrainCompartment" ADD CONSTRAINT "TrainCompartment_turnNumber_fkey" FOREIGN KEY ("turnNumber") REFERENCES "TrainTurn"("turnNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntermediateStation" ADD CONSTRAINT "IntermediateStation_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntermediateStation" ADD CONSTRAINT "IntermediateStation_turnNumber_fkey" FOREIGN KEY ("turnNumber") REFERENCES "TrainTurn"("turnNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
