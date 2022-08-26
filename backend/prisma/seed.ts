/* eslint-disable no-console */
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const defaultUsers: User[] = [
  {
    userId: '836342ef-5c21-4eeb-a0eb-82c2a2cfb88a',
    email: 'admin@rx.live',
    password: '$2a$10$277bJPr/a9nG9K9umZb9aef47NsdAqf.Ia5IosRQvJG1EvsOMtUZe',
    firstName: 'Pratheek',
    lastName: 'Senevirathne',
    phoneNumber: '0777483404',
    nic: '893378644V',
    address: '200/4B, Some Lane, Some Road, COlombo.',
    stationId: null,
    role: 'ADMIN',
    initialLogIn: false,
  },
  {
    userId: '13ab1294-bcf3-4faa-b225-288716f6a490',
    email: 'co@rx.live',
    password: '$2a$10$277bJPr/a9nG9K9umZb9aef47NsdAqf.Ia5IosRQvJG1EvsOMtUZe',
    firstName: 'Pramudi',
    lastName: 'Vihanga',
    phoneNumber: '0777483404',
    nic: '893378644V',
    address: '200/4C, Some Lane, Some Road, COlombo.',
    stationId: null,
    role: 'CONTROL_OFFICER',
    initialLogIn: false,
  },
  {
    userId: '87815b2d-1eeb-4999-9152-fd0d57b6b0a6',
    email: 'to@rx.live',
    password: '$2a$10$277bJPr/a9nG9K9umZb9aef47NsdAqf.Ia5IosRQvJG1EvsOMtUZe',
    firstName: 'Sathya',
    lastName: 'Wijesooriya',
    phoneNumber: '0777483404',
    nic: '893378644V',
    address: '200/4D, Some Lane, Some Road, COlombo.',
    stationId: null,
    role: 'TICKETING_OFFICER',
    initialLogIn: false,
  },
  {
    userId: 'ce48ccf8-2190-4b11-9317-d221295104b1',
    email: 'tc@rx.live',
    password: '$2a$10$277bJPr/a9nG9K9umZb9aef47NsdAqf.Ia5IosRQvJG1EvsOMtUZe',
    firstName: 'Pratheek',
    lastName: 'Senevirathne',
    phoneNumber: '0777483404',
    nic: '893378644V',
    address: '200/4D, Some Lane, Some Road, COlombo.',
    stationId: null,
    role: 'TICKET_CHECKER',
    initialLogIn: false,
  },
  {
    userId: 'de81ded4-4dce-44e9-aefa-5bb8fc537501',
    email: 'pratheek@gmail.com',
    password: '$2a$10$277bJPr/a9nG9K9umZb9aef47NsdAqf.Ia5IosRQvJG1EvsOMtUZe',
    firstName: 'Pratheek',
    lastName: 'Senevirathne',
    phoneNumber: '0777483404',
    nic: '893378644V',
    address: '200/4A, Some Lane, Some Road, COlombo.',
    stationId: null,
    role: 'PASSENGER',
    initialLogIn: false,
  },
];

const defaultStations: any[] = [
  {
    stationId: 'FOT',
    name: 'Colombo-Fort',
    address: 'Fort Railway Station, Colombo',
    phoneNumber: '+94112434215',
    location: '6.933957704555925, 79.84995215472523',
  },
  {
    stationId: 'KLP',
    name: 'Kollupitiya',
    address: 'Kollupitiya Railway Station',
    phoneNumber: '',
    location: '6.9118240819417895, 79.84819226261139',
  },
  {
    stationId: 'MDA',
    name: 'Maradana',
    address: 'Maradana Railway Station, Colombo 10',
    phoneNumber: '+94112695722',
    location: '6.929573409017531, 79.86578756875926',
  },
  {
    stationId: 'BLR',
    name: 'Baseline Road',
    address: 'Baseline Road Railway Station',
    phoneNumber: '',
    location: '6.926596599938465, 79.87846903788044',
  },
  {
    stationId: 'CTR',
    name: 'Cotta Road',
    address: 'Cotta Road Railway Station',
    phoneNumber: '',
    location: '6.9135495187773515, 79.88457374563593',
  },
  {
    stationId: 'DMG',
    name: 'Dematagoda',
    address: 'Dematagoda Railway Station',
    phoneNumber: '',
    location: '6.938088383146256, 79.87928442944502',
  },
  {
    stationId: 'KLN',
    name: 'Kelaniya',
    address: 'Kelaniya Railway station',
    phoneNumber: '',
    location: '6.961454498464568, 79.89469103798747',
  },
  // {
  //   stationId: 'FOT',
  //   name: 'Fort Railway Station',
  //   address: 'Fort Railway Station, Colombo',
  //   phoneNumber: '+94112434215',
  //   location: '6.933957704555925, 79.84995215472523',
  //   adjacentTo: { connect: [{ stationId: 'FOT' }, { stationId: 'MDA' }] },
  // },
];

const defaultStationConnections = [
  {
    stationId: 'FOT',
    adjacentStations: { connect: [{ stationId: 'KLP' }, { stationId: 'MDA' }] },
  },
  {
    stationId: 'MDA',
    adjacentStations: {
      connect: [
        { stationId: 'FOT' },
        { stationId: 'BLR' },
        { stationId: 'DMG' },
      ],
    },
  },
  {
    stationId: 'KLP',
    adjacentStations: { connect: [{ stationId: 'FOT' }] },
  },
  {
    stationId: 'BLR',
    adjacentStations: { connect: [{ stationId: 'MDA' }, { stationId: 'CTR' }] },
  },
  {
    stationId: 'CTR',
    adjacentStations: { connect: [{ stationId: 'BLR' }] },
  },
  {
    stationId: 'DMG',
    adjacentStations: { connect: [{ stationId: 'MDA' }, { stationId: 'KLN' }] },
  },
  {
    stationId: 'KLN',
    adjacentStations: { connect: [{ stationId: 'DMG' }] },
  },
];

// Insert stations synchronously
function insertStations() {
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  return new Promise((resolve) => {
    (async () => {
      for (let i = 0; i < defaultStations.length; i += 1) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const result = await prisma.station.upsert({
            where: { stationId: defaultStations[i].stationId },
            update: {},
            create: defaultStations[i],
          });

          console.info('Station created: ', result.stationId);
        } catch {
          console.error(
            'Error creating station: ',
            defaultStations[i].stationId
          );
        }
      }
      resolve(true);
    })();
  });
}

// Add Station Relations synchronously
function addStationRelations() {
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  return new Promise((resolve) => {
    (async () => {
      for (let i = 0; i < defaultStations.length; i += 1) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const result = await prisma.station.update({
            where: {
              stationId: defaultStationConnections[i].stationId,
            },
            data: {
              adjacentTo: defaultStationConnections[i].adjacentStations,
            },
          });

          console.info('Station relations added: ', result.stationId);
        } catch {
          console.error(
            'Error adding relations to station: ',
            defaultStationConnections[i].stationId
          );
        }
      }
      resolve(true);
    })();
  });
}

function insertUsers() {
  defaultUsers.forEach(async (userDetails) => {
    try {
      const result = await prisma.user.upsert({
        where: { email: userDetails.email },
        update: {},
        create: userDetails,
      });

      console.info('User created: ', result.email);
    } catch {
      console.error('Error creating user: ', userDetails.email);
    }
  });
}

async function main() {
  // Insert stations synchronously
  await insertStations();
  // Insert station relations
  addStationRelations();
  // Insert users asynchronously
  insertUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
