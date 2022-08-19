import { Role, CrewMember } from '@prisma/client';
import prisma from '../../prisma/prisma-client';

export async function getUserDetails(role: Role, searchTerm: string) {
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
        role: {
          equals: role,
        },
      },
    },
    select: {
      userId: true,
      email: true,
      password: false,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      nic: true,
      role: true,
    },
  });

  return userList;
}

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

export function testFunction() {}
