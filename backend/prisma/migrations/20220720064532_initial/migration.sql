-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PASSENGER', 'CONTROL_OFFICER', 'TICKETING_OFFICER', 'TICKET_CHECKER');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "address" TEXT,
    "stationId" TEXT,
    "role" "Role" NOT NULL DEFAULT E'PASSENGER',

    PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
