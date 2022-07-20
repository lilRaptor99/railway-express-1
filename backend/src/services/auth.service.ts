import bcrypt from 'bcryptjs';
import { RegisterInput } from '../models/register-input.model';
import prisma from '../../prisma/prisma-client';
import HttpException from '../models/http-exception.model';
import { RegisteredUser } from '../models/registered-user.model';
import generateToken from '../utils/token.utils';
import { User } from '../models/user.model';

async function checkUserUniqueness(email: string) {
  const existingUserByEmail = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      userId: true,
    },
  });

  if (existingUserByEmail) {
    throw new HttpException(422, {
      errors: { email: ['has already been taken'] },
    });
  }
}

export async function createUser(
  input: RegisterInput
): Promise<RegisteredUser> {
  const email = input.email?.trim();
  const password = input.password?.trim();

  if (!email) {
    throw new HttpException(422, { errors: { email: ["can't be blank"] } });
  }

  if (!password) {
    throw new HttpException(422, { errors: { password: ["can't be blank"] } });
  }

  await checkUserUniqueness(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = (await prisma.user.create({
    data: {
      ...input,
      email,
      password: hashedPassword,
    },
    select: {
      userId: true,
      email: true,
      password: true,
      role: true,
    },
  })) as User;

  return {
    ...input,
    ...user,
    token: generateToken(user),
  };
}

export async function getUserById(userId: string) {
  console.info('Get user by id: ', userId);
}
