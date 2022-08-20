import { CrewMember } from '@prisma/client';
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
        { role: { equals: 'PASSENGER' } },
      ],
    },
    select: {
      userId: true,
      email: true,
      password: false,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      nic: true,
      role: true,
      station: true,
      stationId: true,
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
          { role: { equals: 'PASSENGER' } },
        ],
      },
    },
    select: {
      userId: true,
      email: true,
      password: false,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      nic: true,
      role: true,
      station: true,
      stationId: true,
    },
  });

  return userList;
}

export async function getCrewMemberDetails() {
  const crewMemberList = await prisma.crewMember.findMany({
    take: 10,
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
    },
  });

  return crewMemberList;
}

export function testFunction() {}
