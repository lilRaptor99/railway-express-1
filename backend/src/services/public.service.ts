import bcrypt from 'bcryptjs';
import { parse } from 'papaparse';
import { Station, Ticket } from '@prisma/client';
import prisma from '../../prisma/prisma-client';
import HttpException from '../models/http-exception.model';
import { generateVerifyKey } from '../utils/math-utils';
import sendMail from '../utils/send-mail';
import { ReservationTicketInput } from '../models/reservation-ticket-input.model';

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

export async function issueNormalTicket(
  userId: string | null,
  inputTicketData: Ticket,
  quantity = 1
) {
  const tickets = [];
  for (let i = 0; i < quantity; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const ticket = await prisma.ticket.create({
      data: {
        ...inputTicketData,
        price: inputTicketData.price,
        userId,
        destinationStationId: inputTicketData.destinationStationId || undefined,
        startStationId: inputTicketData.startStationId || undefined,
      },
      include: { startStation: true, destinationStation: true },
    });
    tickets.push(ticket);
  }
  return tickets;
}

export async function getTrainSchedule() {
  const todayUTC = new Date(new Date().toDateString());
  const todaySL = new Date(todayUTC);
  todaySL.setHours(todayUTC.getHours() + 5);
  todaySL.setMinutes(todayUTC.getMinutes() + 30);
  const getScheduleFromDate = new Date(todaySL);
  getScheduleFromDate.setDate(todaySL.getDate() - 7);

  return prisma.trainSchedule.findMany({
    where: { date: { gte: getScheduleFromDate } },
    include: { trainTurn: true },
  });
}

export async function searchTrainSchedule(
  from: string,
  to: string,
  date: Date
) {
  const results = await prisma.trainSchedule.findMany({
    where: {
      date,
      trainTurn: {
        intermediateStations: { some: { stationId: from } },
        AND: { intermediateStations: { some: { stationId: to } } },
      },
    },
    include: {
      trainTurn: {
        include: { intermediateStations: { include: { station: true } } },
      },
    },
  });

  // const searchResults = results.filter((result) => {
  //   const stationArr = result.trainTurn.intermediateStations;
  //   let startStationIndex = 0;
  //   let destinationStationIndex = 0;
  //   stationArr.forEach((station, index) => {
  //     if (station.stationId === from) startStationIndex = index;
  //     else if (station.stationId === to) destinationStationIndex = index;
  //   });
  //   return startStationIndex < destinationStationIndex;
  // });
  return results;
}

export async function getAvailableSeatCount(
  trainTurnNumber: number,
  scheduleId: string
) {
  const totalSeats = await prisma.trainCompartment.groupBy({
    by: ['turnNumber', 'class', 'compartmentNumber'],
    where: { turnNumber: trainTurnNumber },
    _sum: { seatCount: true },
  });

  const toatlSeats2 = totalSeats.map((seat) => ({
    class: seat.class, // eslint-disable-next-line no-underscore-dangle
    total: seat._sum.seatCount,
    compartmentNumber: seat.compartmentNumber,
  }));
  const reservedSeats = await prisma.reservedSeats.groupBy({
    by: ['trainScheduleId', 'compartmentNumber'],
    where: { trainScheduleId: { equals: scheduleId } },
    _count: { seatNumber: true },
  });
  // eslint-disable-next-line no-underscore-dangle
  const reservedSeats2 = reservedSeats.map((seat) => ({
    reserved: seat._count.seatNumber,
    compartmentNumber: seat.compartmentNumber,
  }));

  const availableSeats: any = [];

  toatlSeats2.forEach((seat) => {
    const reservedCount = reservedSeats2.find(
      (seat2) => seat2.compartmentNumber === seat.compartmentNumber
    );
    if (!seat.total) return;
    if (!reservedCount?.reserved) {
      availableSeats.push({
        compartmentNumber: seat.compartmentNumber,
        available: seat.total,
        class: seat.class,
      });
    } else {
      availableSeats.push({
        compartmentNumber: seat.compartmentNumber,
        available: seat.total - reservedCount?.reserved,
        class: seat.class,
      });
    }
  });

  return availableSeats;
}

export async function reserveSeats(input: ReservationTicketInput) {
  const dataInput: any = { ...input };
  dataInput.Reservation = { create: input.Reservation };
  const ticket = await prisma.ticket.create({
    data: dataInput,
  });
  return {
    ...ticket,
  };
}
