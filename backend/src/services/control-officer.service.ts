import { TrainTurnInput } from '../models/train-turn-input.model';
import prisma from '../../prisma/prisma-client';

export async function addTrainTurn(input: TrainTurnInput) {
  const dataInput: any = { ...input };
  dataInput.intermediateStations = { create: input.intermediateStations };
  dataInput.trainCompartments = { create: input.trainCompartments };
  const turn = await prisma.trainTurn.create({
    data: dataInput,
  });

  return {
    ...turn,
  };
}

export async function getTrainTurns() {
  const turn = await prisma.trainTurn.findMany({
    take: 10,
  });

  return turn;
}

export async function getTrainTurnByTurnNumber(trainTurnNumber: number) {
  const turn = await prisma.trainTurn.findUnique({
    where: { turnNumber: trainTurnNumber },
    include: {
      intermediateStations: true,
      trainCompartments: true,
    },
  });

  return turn;
}

export async function deleteTrainTurn(trainTurnNumber: number) {
  const deleteStations = prisma.intermediateStation.deleteMany({
    where: {
      turnNumber: trainTurnNumber,
    },
  });
  const deleteCompartments = prisma.trainCompartment.deleteMany({
    where: {
      turnNumber: trainTurnNumber,
    },
  });
  const deleteTurn = prisma.trainTurn.delete({
    where: {
      turnNumber: trainTurnNumber,
    },
  });
  await prisma.$transaction([deleteStations, deleteCompartments, deleteTurn]);
}

export async function getComplaintsAndSuggestions() {
  const feedbackList = await prisma.complaintsAndSuggestions.findMany({
    include: {
      user: true,
    },
  });

  return feedbackList;
}

export async function getFeedbackById(id: string) {
  const feedback = await prisma.complaintsAndSuggestions.findUnique({
    where: { complaintId: id },
    include: {
      user: true,
    },
  });

  return feedback;
}

export function testFunction() {}
