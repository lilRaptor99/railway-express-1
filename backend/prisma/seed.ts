/* eslint-disable no-console */
import { PrismaClient, User, CrewMember } from '@prisma/client';

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
    status: 'ACTIVE',
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
    status: 'ACTIVE',
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
    status: 'ACTIVE',
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
    status: 'ACTIVE',
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
    status: 'ACTIVE',
  },
];

const defaultCrewMembers: CrewMember[] = [
  {
    userId: '836342ef-5c21-4eeb-a0eb-82c2a2cfb88a',
    firstName: 'Pratheek',
    lastName: 'Senevirathne',
    phoneNumber: '0777483404',
    nic: '893378644V',
    address: '200/4B, Some Lane, Some Road, COlombo.',
    stationId: 'FOT',
    occupation: 'DRIVER',
    visibility: 'VISIBLE',
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
  {
    stationId: 'PGW',
    name: 'Polgahawela',
    address: 'Polgahawela Railway station',
    phoneNumber: '',
    location: '7.331758928576164, 80.30120056395806',
  },
  {
    stationId: 'MHO',
    name: 'Maho',
    address: 'Maho Railway station',
    phoneNumber: '',
    location: '7.823536417059466, 80.27534285647008',
  },
  {
    stationId: 'KKS',
    name: 'kankesanthurai',
    address: 'kankesanthurai Railway station',
    phoneNumber: '',
    location: '9.815853928994466, 80.04827577963307',
  },
  {
    stationId: 'PDN',
    name: 'Peradeniya',
    address: 'Peradeniya Railway station',
    phoneNumber: '',
    location: '7.2588149034327145, 80.59020354860766',
  },
  {
    stationId: 'KDY',
    name: 'Kandy',
    address: 'Kandy Railway station',
    phoneNumber: '',
    location: '7.290755432173376, 80.6322723179272',
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
    adjacentStations: { connect: [{ stationId: 'DMG' }, { stationId: 'PGW' }] },
  },
  {
    stationId: 'PGW',
    adjacentStations: { connect: [{ stationId: 'KLN' }, { stationId: 'MHO' }] },
  },
  {
    stationId: 'MHO',
    adjacentStations: { connect: [{ stationId: 'PGW' }, { stationId: 'KKS' }] },
  },
  {
    stationId: 'KKS',
    adjacentStations: { connect: [{ stationId: 'MHO' }] },
  },
  {
    stationId: 'PDN',
    adjacentStations: { connect: [{ stationId: 'PGW' }, { stationId: 'KDY' }] },
  },
  {
    stationId: 'KDY',
    adjacentStations: { connect: [{ stationId: 'PDN' }] },
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

function insertCrewMembers() {
  defaultCrewMembers.forEach(async (crewMemberDetails) => {
    try {
      const result = await prisma.crewMember.upsert({
        where: { nic: crewMemberDetails.nic },
        update: {},
        create: crewMemberDetails,
      });

      console.info('User created: ', result.firstName);
    } catch {
      console.error('Error creating user: ', crewMemberDetails.firstName);
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
  // Insert crew members asynchronously
  insertCrewMembers();
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
