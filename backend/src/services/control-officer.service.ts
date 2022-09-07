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

export function testFunction() {}
