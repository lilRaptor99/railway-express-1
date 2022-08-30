import prisma from '../../prisma/prisma-client';
import { User } from '../models/user.model';

export async function updateProfile(userData: User) {
  await prisma.user.update({
    where: {
      userId: userData.userId,
    },
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      nic: userData.nic,
      phoneNumber: userData.phoneNumber,
    },
  });

  return true;
}

export function testFunction() {}
