import { CrewMember, ReasonToBlock } from '@prisma/client';
import { parse } from 'papaparse';

import prisma from '../../prisma/prisma-client';
import HttpException from '../models/http-exception.model';

export async function AddCrewMembers(input: CrewMember) {
  const crewMember = (await prisma.crewMember.create({
    data: input,

    select: {
      userId: true,
      occupation: true,
    },
  })) as CrewMember;

  return {
    ...input,
    ...crewMember,
  };
}

export async function AddPriceList(input: any) {
  const result = parse(input.data.toString('utf8'));
  // @ts-ignore
  const list = [...result.data[0]].sort();
  const list2 = [...list].slice(1);
  const stationList = await prisma.station.findMany({
    select: { stationId: true },
  });
  const stationIdList = stationList.map((station) => station.stationId);
  const stationIdlist2 = stationIdList.sort();
  if (JSON.stringify(list2) === JSON.stringify(stationIdlist2)) {
    const uploadPath = `${__dirname}/../../ticket_prices/${input.name}`;
    input.mv(uploadPath);
  } else {
    throw new HttpException(422, { errors: ['File format does not match'] });
  }
}

export async function getUserDetails() {
  const userList = await prisma.user.findMany({
    take: 10,
    where: {
      OR: [
        {
          role: {
            equals: 'CONTROL_OFFICER',
          },
        },
        { role: { equals: 'TICKETING_OFFICER' } },
        { role: { equals: 'TICKET_CHECKER' } },
      ],
    },
    select: {
      userId: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      nic: true,
      role: true,
      station: true,
      stationId: true,
      status: true,
    },
  });

  return userList;
}

export async function searchUsers(searchTerm: string) {
  const userList = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstName: {
            startsWith: searchTerm,
          },
        },
        { lastName: { startsWith: searchTerm } },
        { email: { startsWith: searchTerm } },
      ],
      AND: {
        OR: [
          {
            role: {
              equals: 'CONTROL_OFFICER',
            },
          },
          { role: { equals: 'TICKETING_OFFICER' } },
          { role: { equals: 'TICKET_CHECKER' } },
        ],
      },
    },
    select: {
      userId: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      nic: true,
      role: true,
      station: true,
      stationId: true,
      status: true,
    },
  });

  return userList;
}

export async function getCrewMemberDetails() {
  const crewMemberList = await prisma.crewMember.findMany({
    take: 10,
    where: {
      visibility: 'VISIBLE',
    },
  });

  return crewMemberList;
}

export async function searchCrewMembers(searchTerm: string) {
  const crewMemberList = await prisma.crewMember.findMany({
    where: {
      OR: [
        {
          firstName: {
            startsWith: searchTerm,
          },
        },
        { lastName: { startsWith: searchTerm } },
      ],
      AND: {
        visibility: 'VISIBLE',
      },
    },
  });

  return crewMemberList;
}

export async function getPassengerDetails() {
  const passengerList = await prisma.user.findMany({
    take: 10,
    where: {
      role: {
        equals: 'PASSENGER',
      },
    },
    select: {
      userId: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      nic: true,
      status: true,
    },
  });

  return passengerList;
}

export async function searchPassengers(searchTerm: string) {
  const passengerList = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstName: {
            startsWith: searchTerm,
          },
        },
        { lastName: { startsWith: searchTerm } },
        { email: { startsWith: searchTerm } },
      ],
      AND: {
        role: {
          equals: 'PASSENGER',
        },
      },
    },
    select: {
      userId: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      nic: true,
      status: true,
    },
  });

  return passengerList;
}

export async function getUserProfileById(searchTerm: string) {
  const user = await prisma.user.findUnique({
    where: {
      userId: searchTerm,
    },
    select: {
      userId: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      nic: true,
      role: true,
      stationId: true,
      station: true,
      status: true,
    },
  });

  return user;
}

export async function getCrewMemberProfileById(searchTerm: string) {
  const user = await prisma.crewMember.findUnique({
    where: {
      userId: searchTerm,
    },
    select: {
      userId: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      nic: true,
      occupation: true,
      stationId: true,
      station: true,
    },
  });

  return user;
}

export async function blockUser(id: string) {
  await prisma.user.update({
    where: {
      userId: id,
    },
    data: {
      status: 'BANNED',
    },
  });
}

export async function setReasonToBlockUser(reason: ReasonToBlock) {
  await prisma.reasonToBlock.create({
    data: reason,
  });
}

export async function getreasonToBlockUser(id: string) {
  const reason = await prisma.reasonToBlock.findUnique({
    where: {
      userId: id,
    },
    select: {
      reason: true,
    },
  });

  return reason;
}

export async function unblockUser(id: string) {
  await prisma.user.update({
    where: {
      userId: id,
    },
    data: {
      status: 'ACTIVE',
    },
  });
}

export async function deleteReasonToBlockUser(id: string) {
  await prisma.reasonToBlock.delete({
    where: {
      userId: id,
    },
  });
}

export async function deleteCrewMember(id: string) {
  await prisma.crewMember.update({
    where: {
      userId: id,
    },
    data: {
      visibility: 'HIDDEN',
    },
  });
}

/*
 Statistics
*/
export async function getTicketStats() {
  const countByType = await prisma.ticket.groupBy({
    by: ['ticketType'],
    _count: true,
  });

  const countByDateRes: any =
    await prisma.$queryRaw`SELECT date_trunc('day', "createdAt") as "date", count(1)::int FROM public."Ticket"
    group by 1 order by "date"`;

  const countByDate = countByDateRes
    ? countByDateRes.map((count: any) => {
        const obj = {
          count: count.count,
          date: new Date(count.date).toISOString().split('T')[0],
        };
        return obj;
      })
    : null;
  return { countByType, countByDate };
}

export async function getUserStats() {
  const countByType: any = await prisma.user.groupBy({
    by: ['role'],
    _count: true,
    orderBy: { role: 'asc' },
  });

  const crewMemberCount = await prisma.crewMember.count();
  countByType.push({ role: 'CREW_MEMBER', _count: crewMemberCount });

  const countByDateRes: any =
    await prisma.$queryRaw`SELECT date_trunc('day', "createdAt") as "date", count(1)::int FROM public."User"
    group by 1 order by "date"`;

  const countByDate = countByDateRes
    ? countByDateRes.map((count: any) => {
        const obj = {
          count: count.count,
          date: new Date(count.date).toISOString().split('T')[0],
        };
        return obj;
      })
    : null;
  return { countByType, countByDate };
}

export async function getIncomeStats() {
  const countByType = await prisma.ticket.groupBy({
    by: ['ticketType'],
    _sum: { price: true },
  });

  // const countByDateRes: any = null;
  const countByDateRes: any =
    await prisma.$queryRaw`SELECT date_trunc('day', "createdAt") as "date", SUM("price") as "price" FROM public."Ticket"
    group by "date" order by "date"`;

  const countByDate = countByDateRes
    ? countByDateRes.map((count: any) => {
        const obj = {
          price: count.price,
          date: new Date(count.date).toISOString().split('T')[0],
        };
        return obj;
      })
    : null;

  const countByMonthRes: any =
    await prisma.$queryRaw`SELECT date_trunc('month', "createdAt") as "date", SUM("price") as "price" FROM public."Ticket"
    group by "date" order by "date"`;

  const countByMonth = countByMonthRes
    ? countByMonthRes.map((count: any) => {
        const obj = {
          price: count.price,
          date: new Date(count.date).toISOString().split('T')[0],
        };
        return obj;
      })
    : null;

  return { countByType, countByDate, countByMonth };
}
