import {
  TrainReservationClass,
  TrainTurnAvailability,
  TrainTurnType,
} from '@prisma/client';

interface IntermediateStationInput {
  stationId: string;
  arrivalTime: string;
  departureTime: string;
  isStart: boolean;
  isEnd: boolean;
}

interface TrainCompartmentInput {
  compartmentNumber: string;
  seatCount: number;
  class: TrainReservationClass;
}

export interface TrainTurnInput {
  turnNumber: number;
  turnName: string;
  reservable: boolean;
  availability: TrainTurnAvailability;
  type: TrainTurnType;
  intermediateStations: IntermediateStationInput[];
  trainCompartments: TrainCompartmentInput[];
}
