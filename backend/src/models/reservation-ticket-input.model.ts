import {
  TicketStatus,
  TicketType,
  TrainReservationClass,
} from '@prisma/client';

interface ReservationInput {
  primaryPassengerName: string;
  passengerNICs: [];
  reservationTrainScheduleId: string;
}

export interface ReservationTicketInput {
  userId: string;
  return: boolean;
  price: number;
  ticketClass: TrainReservationClass;
  ticketStatus: TicketStatus;
  ticketType: TicketType;
  startStationId: string;
  destinationStationId: string;
  Reservation: ReservationInput;
}
