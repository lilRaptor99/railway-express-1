import prisma from '../../prisma/prisma-client';

/**
 * Update train schedule table by comparing train turn and the current schedule
 * Add interval to run the schedule function once every day
 */

export default async function updateTrainSchedule() {
  const latestSchedule = await prisma.trainSchedule.findFirst({
    orderBy: { date: 'desc' },
  });
  const trainTurns = await prisma.trainTurn.findMany({
    select: { turnNumber: true, availability: true },
  });

  const todayUTC = new Date(new Date().toDateString());
  const todaySL = new Date(todayUTC);
  todaySL.setHours(todayUTC.getHours() + 5);
  todaySL.setMinutes(todayUTC.getMinutes() + 30);

  const lastDateToUpdate = new Date(todaySL);
  lastDateToUpdate.setDate(todaySL.getDate() + 14);
  const firstDateToUpdate = new Date(todaySL);
  firstDateToUpdate.setDate(todaySL.getDate() - 14);

  // console.info('Last schedule updated date: ', latestSchedule?.date);
  // console.info('Todays date: ', todaySL);

  if (latestSchedule?.date === lastDateToUpdate) {
    console.info('Train schedule upto date');
    return;
  }

  const datesToUpdate = [];
  let currentDate;
  if (!latestSchedule?.date || latestSchedule.date < firstDateToUpdate) {
    currentDate = new Date(firstDateToUpdate);
  } else {
    currentDate = new Date(latestSchedule.date);
    currentDate.setDate(latestSchedule.date.getDate() + 1);
  }

  while (currentDate <= lastDateToUpdate) {
    datesToUpdate.push(currentDate);
    currentDate = new Date(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (datesToUpdate.length === 0) {
    console.info('Turn schedule upto date');
    return;
  }

  console.info('Dates to update schedule: ', datesToUpdate);

  datesToUpdate.forEach((date) => {
    trainTurns.forEach((turn) => {
      const dayNumber = date.getDay(); // Sunday: 0, Monday: 1, ... , Saturday: 6
      if (
        turn.availability === 'DAILY' ||
        (turn.availability === 'NS' && dayNumber !== 6) ||
        (turn.availability === 'NSU' && dayNumber !== 0) ||
        (turn.availability === 'SO' && dayNumber === 0)
      ) {
        (() => {
          prisma.trainSchedule
            .create({
              data: { date, turnNumber: turn.turnNumber },
            })
            .then(() => console.info('Inserted Turn to schedule: ', turn, date))
            .catch(() =>
              console.info('Error inserting Turn to schedule: ', turn, date)
            );
        })();
      }
    });
  });
}
