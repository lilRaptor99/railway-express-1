-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('USED', 'UNUSED');

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketId" TEXT NOT NULL,
    "userId" TEXT,
    "ticketClass" "TrainReservationClass" NOT NULL,
    "status" "TicketStatus" NOT NULL,
    "email" TEXT,
    "issuedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startStationId" TEXT NOT NULL,
    "destStationId" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "NormalTicket" (
    "returnStatus" BOOLEAN NOT NULL,
    "ticketId" TEXT NOT NULL,

    CONSTRAINT "NormalTicket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "ReserveTicket" (
    "ticketId" TEXT NOT NULL,
    "turnNumber" TEXT NOT NULL,
    "noOfSeats" INTEGER NOT NULL,
    "primaryPassenger" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReserveTicket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "ReservedSeats" (
    "reserveTicketId" TEXT NOT NULL,
    "seatNo" TEXT NOT NULL,
    "NIC" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SeasonTicket" (
    "ticketId" TEXT NOT NULL,
    "passenngerName" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeasonTicket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReservedSeats_NIC_key" ON "ReservedSeats"("NIC");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_startStationId_fkey" FOREIGN KEY ("startStationId") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_destStationId_fkey" FOREIGN KEY ("destStationId") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormalTicket" ADD CONSTRAINT "NormalTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReserveTicket" ADD CONSTRAINT "ReserveTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservedSeats" ADD CONSTRAINT "ReservedSeats_reserveTicketId_fkey" FOREIGN KEY ("reserveTicketId") REFERENCES "ReserveTicket"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTicket" ADD CONSTRAINT "SeasonTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;
