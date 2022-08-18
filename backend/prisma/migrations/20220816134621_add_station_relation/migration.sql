-- CreateTable
CREATE TABLE "Station" (
    "stationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "routeCode" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    PRIMARY KEY ("stationId")
);

-- CreateTable
CREATE TABLE "_AdjacentStations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdjacentStations_AB_unique" ON "_AdjacentStations"("A", "B");

-- CreateIndex
CREATE INDEX "_AdjacentStations_B_index" ON "_AdjacentStations"("B");

-- AddForeignKey
ALTER TABLE "_AdjacentStations" ADD FOREIGN KEY ("A") REFERENCES "Station"("stationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdjacentStations" ADD FOREIGN KEY ("B") REFERENCES "Station"("stationId") ON DELETE CASCADE ON UPDATE CASCADE;
