const React = require('react');
const { View, Text, ScrollView, Image } = require('react-native');
const { Button } = require('react-native-paper');
import Ticket from '../../components/Ticket';
// @ts-ignore
import SuccessImg from '../../../assets/images/success.png';
// @ts-ignore
import ErrorImg from '../../../assets/images/error.png';
import { useEffect, useState } from 'react';
import request from '../../utils/request';

export default function DownloadTicket({ route, navigation }) {
  const { paymentStatus, ticketData } = route.params;

  const [purchasedTickets, setPurchasedTickets] = useState([]);

  if (paymentStatus === 'ERROR') {
    setTimeout(() => {
      navigation.pop();
    }, 3000);
  } else {
    useEffect(() => {
      getIssuedTicket();
    }, []);
  }

  async function getIssuedTicket() {
    const res = await request('POST', '/public/normal-ticket', ticketData);
    console.log('Purchased tickets:', res.data.tickets);
    setPurchasedTickets(res.data.tickets);
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        <View className="flex-1 mb-8 mt-4 w-full px-8">
          {paymentStatus === 'SUCCESS' ? (
            <>
              <View className="flex-1 flex-row items-center justify-center w-full">
                <View className="mr-4" style={{ minHeight: 40, minWidth: 40 }}>
                  <Image
                    source={SuccessImg}
                    style={{ height: 40, width: 40 }}
                  />
                </View>
                <Text className="text-xl font-normal text-center text-green-700">
                  Payment success
                </Text>
              </View>
              <Text className="text-lg mt-4 font-normal text-slate-900">
                Download/Share below ticket,
              </Text>
              {purchasedTickets.map((ticket) => (
                <Ticket
                  key={ticket.ticketId}
                  ticketType={
                    ticket.ticketType === 'NORMAL' ? 'Normal' : 'Reservation'
                  }
                  ticketId={ticket.ticketId}
                  start={{ station: ticket.startStation.name, time: '' }}
                  end={{ station: ticket.destinationStation.name, time: '' }}
                  status="Valid"
                  date={new Date(ticket.createdAt).toDateString()}
                  _class={
                    ticket.ticketClass === 'FIRST_CLASS'
                      ? 'First Class'
                      : ticket.ticketClass === 'SECOND_CLASS'
                      ? 'Second Class'
                      : 'Third Class'
                  }
                  _return={ticket.returnStatus}
                  price={ticket.price.toFixed(2)}
                />
              ))}
            </>
          ) : (
            <>
              <View className="flex-1 items-center justify-center w-full">
                <View
                  className="mr-4"
                  style={{ minHeight: 150, minWidth: 150 }}
                >
                  <Image
                    source={ErrorImg}
                    style={{ height: 150, width: 150 }}
                  />
                </View>
                <Text className="text-2xl font-normal mt-4 text-center text-red-700">
                  Payment Failed!
                </Text>
              </View>
              <Text className="text-lg font-normal mt-4 text-left text-slate-900">
                Redirecting back to buy tickets page...
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}
