-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('UNUSED', 'EXPIRED', 'USED', 'USED_ONE_WAY');

-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('NORMAL', 'RESERVATION', 'SEASON');

-- CreateEnum
CREATE TYPE "ReservedSeatStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'RESERVED');

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return" BOOLEAN NOT NULL DEFAULT false,
    "price" DOUBLE PRECISION NOT NULL,
    "ticketClass" "TrainReservationClass" NOT NULL DEFAULT 'THIRD_CLASS',
    "email" TEXT,
    "phoneNumber" TEXT,
    "ticketStatus" "TicketStatus" NOT NULL DEFAULT 'UNUSED',
    "ticketType" "TicketType" NOT NULL DEFAULT 'NORMAL',
    "startStationId" TEXT,
    "destinationStationId" TEXT,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "TrainSchedule" (
    "trainScheduleId" TEXT NOT NULL,
    "turnNumber" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cancelled" BOOLEAN NOT NULL DEFAULT false,
    "delayed" BOOLEAN NOT NULL DEFAULT false,
    "delayTime" TEXT,
    "headGuardUserId" TEXT,
    "underGuardUserId" TEXT,
    "driverUserId" TEXT,
    "driverAssistantUserId" TEXT,

    CONSTRAINT "TrainSchedule_pkey" PRIMARY KEY ("trainScheduleId")
);

-- CreateTable
CREATE TABLE "ReservedSeats" (
    "trainScheduleId" TEXT NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "status" "ReservedSeatStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "ReservedSeats_pkey" PRIMARY KEY ("trainScheduleId","seatNumber")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservationId" TEXT NOT NULL,
    "primaryPassengerName" TEXT NOT NULL,
    "passengerNICs" TEXT[],
    "reservedSeats" TEXT[],
    "reservationTrainScheduleId" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrainSchedule_turnNumber_date_key" ON "TrainSchedule"("turnNumber", "date");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_startStationId_fkey" FOREIGN KEY ("startStationId") REFERENCES "Station"("stationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_destinationStationId_fkey" FOREIGN KEY ("destinationStationId") REFERENCES "Station"("stationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainSchedule" ADD CONSTRAINT "TrainSchedule_turnNumber_fkey" FOREIGN KEY ("turnNumber") REFERENCES "TrainTurn"("turnNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainSchedule" ADD CONSTRAINT "TrainSchedule_headGuardUserId_fkey" FOREIGN KEY ("headGuardUserId") REFERENCES "CrewMember"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainSchedule" ADD CONSTRAINT "TrainSchedule_underGuardUserId_fkey" FOREIGN KEY ("underGuardUserId") REFERENCES "CrewMember"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainSchedule" ADD CONSTRAINT "TrainSchedule_driverUserId_fkey" FOREIGN KEY ("driverUserId") REFERENCES "CrewMember"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainSchedule" ADD CONSTRAINT "TrainSchedule_driverAssistantUserId_fkey" FOREIGN KEY ("driverAssistantUserId") REFERENCES "CrewMember"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservedSeats" ADD CONSTRAINT "ReservedSeats_trainScheduleId_fkey" FOREIGN KEY ("trainScheduleId") REFERENCES "TrainSchedule"("trainScheduleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Ticket"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_reservationTrainScheduleId_fkey" FOREIGN KEY ("reservationTrainScheduleId") REFERENCES "TrainSchedule"("trainScheduleId") ON DELETE RESTRICT ON UPDATE CASCADE;
