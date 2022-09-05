import { Station } from '@prisma/client';
import nodemailer from 'nodemailer';
import { parse } from 'papaparse';
import prisma from '../../prisma/prisma-client';

const fs = require('fs');

export async function addStation(station: Station) {
  await prisma.station.create({
    data: station,
  });
}

export async function getStations() {
  return prisma.station.findMany({ include: { adjacentTo: true } });
}

const transporter = nodemailer.createTransport({
  host: 'smtp.netcorecloud.net',
  port: 25,
  secure: false,
  auth: {
    user: 'pratheeksenevirathne',
    pass: 'pratheeksenevirathne_7b521d2d83209cf93e3ca86715e78667',
  },
});

transporter.verify((error: any) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } else {
    console.info('Email server is ready to take our messages');
  }
});

export async function verifyEmail(
  email: string,
  firstName: string,
  lastName: string
) {
  let verifyKey = 0;
  while (verifyKey < 999 || verifyKey > 9999) {
    verifyKey = Math.floor(Math.random() * 10000);
  }

  const info = await transporter.sendMail({
    from: {
      name: 'Railway Express',
      address: 'pratheeksenevirathne@pepisandbox.com',
    },
    to: email, // list of receivers
    subject: 'Railway Express - Verify email',
    html: `Hello ${firstName} ${lastName},<br>
    Please use <b>${verifyKey}</b> as the email verification code.<br>
    <br>
    Cheers,<br>
    Railway Express Team.<br>
    `,
  });

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
