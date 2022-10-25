import useLocalStorage from 'hooks/useLocalStorage';
import TicketingOfficerLayout from 'layout/TicketingOfficerLayout';
import React from 'react';
import Ticket from './Ticket';

export default function PrintNormalTicket() {
  const currentTicketData = useLocalStorage('currentTicketData', null)[0];
  console.log('currentTicketData', currentTicketData);
  return (
    <TicketingOfficerLayout>
      {currentTicketData?.tickets?.map((ticket) => (
        <Ticket
          key="{Ticket}"
          startStation={ticket.startStation.name}
          destinationStation={ticket.destinationStation.name}
          ticketId={ticket.ticketId}
          createdAt={ticket.createdAt.substring(0, 10)}
          price={ticket.price}
          ticketClass={ticket.ticketClass}
          returnStatus={ticket.returnStatus}
        />
      ))}
    </TicketingOfficerLayout>
  );
}
