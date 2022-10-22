import bcrypt from 'bcryptjs';
import { parse } from 'papaparse';
import { Station, Ticket } from '@prisma/client';
import prisma from '../../prisma/prisma-client';
import HttpException from '../models/http-exception.model';
import { generateVerifyKey } from '../utils/math-utils';
import sendMail from '../utils/send-mail';
import { NormalTicketInput } from '../models/normal-ticket-input.model';

const fs = require('fs');

export async function addStation(station: Station) {
  await prisma.station.create({
    data: station,
  });
}

export async function getStations() {
  return prisma.station.findMany({ include: { adjacentTo: true } });
}

export async function verifyEmail(
  email: string,
  firstName: string,
  lastName: string
) {
  const verifyKey = generateVerifyKey();

  const info = await sendMail(
    {
      email,
      firstName,
      lastName,
    },
    'Verify email',
    /* HTML */
    `<p>
      Thank you for registering at Railway Express.<br />
      Please use <b>${verifyKey}</b> as the email verification code.
    </p>`
  );
  console.info('Verification code for ', email, '  : ', verifyKey);

  console.info('Message sent: %s', info.messageId);

  return verifyKey;
}

export async function getTicketPrice(
  ticketType: String,
  ticketClass: String,
  to: String,
  from: String
) {
  const filePath = `${__dirname}/../../ticket_prices/${ticketType.toUpperCase()}-${ticketClass.toUpperCase()}.csv`;
  const data = fs.readFileSync(filePath, 'utf8');
  const priceList = parse(data);
  const startList: any = priceList.data.slice(1, 8);
  const destinationList = priceList.data[0];
  // @ts-ignore
  const endIndex = destinationList.indexOf(from);

  const startlength = startList.length;

  let ticketPrice;

  for (let i = 0; i < startlength; i += 1) {
    if (startList[i][0] === to) {
      ticketPrice = startList[i][endIndex];
    }
  }

  return ticketPrice;
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new HttpException(400, { errors: ['User account not found!'] });
  }

  const verifyKey = generateVerifyKey();

  const info = await sendMail(
    {
      email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    'Forgot password',
    /* HTML */
    `<p>
      Please use <b>${verifyKey}</b> as the email verification code to reset
      your password.
    </p>`
  );
  console.info('Verification code for ', email, '  : ', verifyKey);

  console.info('Message sent: %s', info.messageId);

  return verifyKey;
}

export async function resetPasswordUsingKey(
  verifyKey: string,
  email: string,
  newPassword: string
) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!newPassword) {
    throw new HttpException(422, { errors: ["New Password can't be blank"] });
  }
  if (!user) {
    throw new HttpException(400, { errors: ['User account not found!'] });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      userId: user.userId,
    },
    data: {
      password: hashedPassword,
    },
  });
}

export async function createNormalTicket(
  input: NormalTicketInput,
  userId: string
) {
  let ticket;
  if (userId != null) {
    ticket = {
      ...input,
      user: userId,
      returnStatus: undefined,
      numberOfTickets: undefined,
    } as Ticket;
  } else {
    ticket = {
      ...input,
      returnStatus: undefined,
      numberOfTickets: undefined,
    } as Ticket;
  }

  const createdTicketArray = [];
  for (let i = 0; i < input.numberOfTickets; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const createdTicket = await prisma.normalTicket.create({
      data: {
        returnStatus: input.returnStatus,
        ticket: {
          create: ticket,
        },
      },
      select: { returnStatus: true, ticket: true },
    });
    createdTicketArray.push(createdTicket);
  }
  return createdTicketArray;
}
