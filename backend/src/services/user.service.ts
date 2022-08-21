import bcrypt from 'bcryptjs';
import prisma from '../../prisma/prisma-client';
import HttpException from '../models/http-exception.model';
import { User } from '../models/user.model';

export async function resetPassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  if (!currentPassword) {
    throw new HttpException(422, {
      errors: ["Current Password can't be blank"],
    });
  }
  if (!newPassword) {
    throw new HttpException(422, { errors: ["New Password can't be blank"] });
  }
  const matchedUser = (await prisma.user.findFirst({
    where: { userId },
  })) as unknown as User;
  if (!(await bcrypt.compare(currentPassword, matchedUser.password))) {
    throw new HttpException(401, { errors: ['Incorrect current password'] });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      userId,
    },
    data: {
      password: hashedPassword,
      initialLogIn: false,
    },
  });

  return true;
}

export function testFunction() {}
