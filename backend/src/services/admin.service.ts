import { Role } from '@prisma/client';
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

export function testFunction() {}
