import useLocalStorage from 'hooks/useLocalStorage';
import TicketingOfficerLayout from 'layout/TicketingOfficerLayout';
import React from 'react';
import SeasonTicket from './SeasonTicket';

export default function PrintSeasonTicket() {
  const currentSTicketData = useLocalStorage('currentSTicketData', null)[0];
  console.log('currentSTicketData', currentSTicketData);
  return (
    <TicketingOfficerLayout>
      {currentSTicketData?.tickets?.map((ticket) => (
        <SeasonTicket
          key="{sTicket}"
          startStation={ticket.startStation.name}
          destinationStation={ticket.destinationStation.name}
          ticketId={ticket.ticketId}
          createdAt={ticket.createdAt.substring(0, 10)}
          price={ticket.price}
          ticketClass={ticket.ticketClass}
          name={ticket.name}
          validPeriod={ticket.validPeriod}
        />
      ))}
    </TicketingOfficerLayout>
  );
}
