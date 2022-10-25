import { Ticket, TicketStatus } from '@prisma/client';
import prisma from '../../prisma/prisma-client';
import HttpException from '../models/http-exception.model';
import { getStations } from './public.service';

let stationGraph: any = null;

function getPath(from: string, to: string) {
  const parent: any = {};
  const visited: any = {};
  const path = [];
  const q = [];
  q.push(from);
  while (q.length > 0) {
    const u = q.pop();
    if (!u) break;
    visited[u] = true;
    stationGraph[u].forEach((v: string) => {
      if (!visited[v]) {
        parent[v] = u;
        q.push(v);
      }
    });
  }
  let curStation = to;
  while (curStation !== from) {
    path.push(curStation);
    curStation = parent[curStation];
    if (!curStation) return undefined;
  }
  path.push(from);
  path.reverse();
  return path;
}

async function validateGetOffStation(getOffStation: string, ticket: Ticket) {
  if (!stationGraph) {
    stationGraph = {};
    const stations = await getStations();
    stations.forEach((station) => {
      stationGraph[station.stationId] = station.adjacentTo.map(
        (adjStation) => adjStation.stationId
      );
    });
    console.info('Station graph:', stationGraph);
  }
  if (!ticket.startStationId || !ticket.destinationStationId) return false;
  const path = getPath(ticket.startStationId, ticket.destinationStationId);
  return path?.includes(getOffStation);
}

function isExpired(date: Date) {
  const ticketDate = new Date(date);
  const ticketDay = new Date(ticketDate.toDateString());
  const todayDay = new Date(new Date().toDateString());
  return ticketDay < todayDay;
}

export async function discreditTicket(ticketId: string, userId: string) {
  const ticketChecker = await prisma.user.findUnique({
    where: { userId },
    include: { station: true },
  });
  const ticketCheckerStationId = ticketChecker?.station?.stationId;
  if (!ticketCheckerStationId) {
    throw new HttpException(401, {
      error:
        'User not a ticket checker! or assign the ticket checker to a station.',
    });
  }

  const ticket = await prisma.ticket.findUnique({ where: { ticketId } });

  if (!ticket) {
    throw new HttpException(404, { error: 'Ticket not found' });
  }
  if (ticket.ticketStatus === 'USED') {
    throw new HttpException(403, { error: 'Ticket already used' });
  }
  if (ticket.ticketStatus === 'EXPIRED' || isExpired(ticket.createdAt)) {
    throw new HttpException(406, { error: 'Ticket expired' });
  }

  const isGetOffValid = await validateGetOffStation(
    ticketCheckerStationId,
    ticket
  );
  if (!isGetOffValid) {
    throw new HttpException(406, { error: 'Invalid get off station!' });
  }

  const newTicketStatus: TicketStatus =
    // eslint-disable-next-line no-nested-ternary
    ticket.ticketStatus === 'USED_ONE_WAY'
      ? 'USED'
      : ticket.returnStatus && ticket.ticketStatus === 'UNUSED'
      ? 'USED_ONE_WAY'
      : 'USED';
  await prisma.ticket.update({
    data: { ticketStatus: newTicketStatus },
    where: { ticketId },
  });

  return 'Success';
}

export async function validateTicket(ticketId: string, userId: string) {
  const ticketChecker = await prisma.user.findUnique({
    where: { userId },
    include: { station: true },
  });
  const ticketCheckerStationId = ticketChecker?.station?.stationId;
  if (!ticketCheckerStationId) {
    throw new HttpException(401, {
      error:
        'User not a ticket checker! or assign the ticket checker to a station.',
    });
  }

  const ticket = await prisma.ticket.findUnique({ where: { ticketId } });

  if (!ticket) {
    throw new HttpException(404, { error: 'Ticket not found' });
  }
  if (ticket.ticketStatus === 'USED') {
    throw new HttpException(403, { error: 'Ticket already used' });
  }
  if (ticket.ticketStatus === 'EXPIRED' || isExpired(ticket.createdAt)) {
    throw new HttpException(406, { error: 'Ticket expired' });
  }

  const isGetOffValid = await validateGetOffStation(
    ticketCheckerStationId,
    ticket
  );
  if (!isGetOffValid) {
    throw new HttpException(406, { error: 'Invalid get off station!' });
  }

  return 'Valid';
}

export function testFunction() {}
