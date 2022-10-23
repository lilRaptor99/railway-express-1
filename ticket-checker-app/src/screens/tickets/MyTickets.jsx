const React = require('react');
const { View, Text, ScrollView, Image } = require('react-native');
const { Button } = require('react-native-paper');
import { useEffect, useState } from 'react';
import Ticket from '../../components/Ticket';
import request from '../../utils/request';

export default function MyTickets({ navigation }) {
  const [purchasedTickets, setPurchasedTickets] = useState([]);

  useEffect(() => {
    getIssuedTicket();
    const updateMyTicketsInterval = setInterval(() => {
      getIssuedTicket();
    }, 2000);
    return () => clearInterval(updateMyTicketsInterval);
  }, []);

  async function getIssuedTicket() {
    const res = await request('GET', '/passenger/my-tickets');
    setPurchasedTickets(res.data.tickets);
  }

  function isExpired(date) {
    const ticketDate = new Date(date);
    const ticketDay = new Date(ticketDate.toDateString());
    const todayDay = new Date(new Date().toDateString());
    return ticketDay < todayDay;
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        <View className="flex-1 items-center mb-8 mt-4 w-full px-8">
          {purchasedTickets.map((ticket) => (
            <Ticket
              key={ticket.ticketId}
              ticketType={
                ticket.ticketType === 'NORMAL' ? 'Normal' : 'Reservation'
              }
              ticketId={ticket.ticketId}
              start={{ station: ticket.startStation.name, time: '' }}
              end={{ station: ticket.destinationStation.name, time: '' }}
              status={
                isExpired(ticket.createdAt)
                  ? 'Expired'
                  : ticket.ticketStatus === 'USED'
                  ? 'Expired'
                  : ticket.ticketStatus === 'EXPIRED'
                  ? 'Expired'
                  : ticket.ticketStatus === 'UNUSED'
                  ? 'Valid'
                  : 'Valid'
              }
              date={new Date(ticket.createdAt).toDateString()}
              _class={
                ticket.ticketClass === 'FIRST_CLASS'
                  ? 'First Class'
                  : ticket.ticketClass === 'SECOND_CLASS'
                  ? 'Second Class'
                  : 'Third Class'
              }
              _return={ticket.return}
              price={ticket.price.toFixed(2)}
            />
          ))}
          <Ticket date="Fri Oct 28 2022" />
          <Ticket ticketType="Normal" status="Expired" />
        </View>
      </ScrollView>
    </>
  );
}
