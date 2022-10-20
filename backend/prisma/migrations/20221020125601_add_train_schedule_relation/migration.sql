-- CreateTable
CREATE TABLE "TrainSchedule" (
    "turnNumber" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cancelled" BOOLEAN NOT NULL DEFAULT false,
    "delayed" BOOLEAN NOT NULL DEFAULT false,
    "delayTime" TEXT,
    "headGuardUserId" TEXT,
    "underGuardUserId" TEXT,
    "driverUserId" TEXT,
    "driverAssistantUserId" TEXT,

    CONSTRAINT "TrainSchedule_pkey" PRIMARY KEY ("turnNumber","date")
);

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
