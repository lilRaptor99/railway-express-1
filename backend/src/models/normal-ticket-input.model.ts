import { Ticket } from '@prisma/client';

export interface NormalTicketInput extends Ticket {
  numberOfTickets: number;
  returnStatus: boolean;
}
