-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('UNUSED', 'EXPIRED', 'USED', 'USED_ONE_WAY');

-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('NORMAL', 'RESERVATION', 'SEASON');

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

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_startStationId_fkey" FOREIGN KEY ("startStationId") REFERENCES "Station"("stationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_destinationStationId_fkey" FOREIGN KEY ("destinationStationId") REFERENCES "Station"("stationId") ON DELETE SET NULL ON UPDATE CASCADE;
