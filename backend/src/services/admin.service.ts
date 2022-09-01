import { CrewMember, ReasonToBlock } from '@prisma/client';
import prisma from '../../prisma/prisma-client';

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

export function testFunction() {}
