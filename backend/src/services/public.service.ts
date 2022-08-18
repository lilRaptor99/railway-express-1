import { Station } from '@prisma/client';
import prisma from '../../prisma/prisma-client';

export async function addStation(station: Station) {
  await prisma.station.create({
    data: station,
  });
}

export async function getStations() {
  return prisma.station.findMany({ include: { adjacentTo: true } });
}
