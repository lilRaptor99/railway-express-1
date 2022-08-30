import React from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function Ticket({
  ticketId = 'edb6cd17-e0d0-4889-a72d-13daddf49ff9',
  ticketType = 'Normal',
  trainName = 'Yal Devi (Kankasanthurai)',
  start = { station: 'Colombo-Fort', time: '06:35 AM' },
  end = { station: 'Anuradhapura', time: '10:40 AM' },
  duration = '4h 5m',
  status = 'Valid',
  date = '10 Aug 2022',
  primaryPassenger = 'Pratheek Senevirathne',
  _class = 'First Class',
  seats = ['H-5', 'H-6', 'H-7'],
  _return = false,
}) {
  return (
    <>
      <View
        className="w-full mt-3 bg-slate-50 rounded-t-3xl  rounded-b-xl overflow-hidden"
        style={{
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { height: 5, width: 5 },
          shadowRadius: 5,
          shadowOpacity: 0.1,
        }}
      >
        <View
          className="bg-slate-700 p-3 rounded-t-3xl"
          style={{
            elevation: 20,
            shadowColor: '#000',
            shadowOffset: { height: 5, width: 0 },
            shadowRadius: 5,
            shadowOpacity: 0.3,
          }}
        >
          <Text className="text-slate-200 font-semibold text-center">
            Normal Ticket
          </Text>
        </View>
        <View className="flex-1 items-center flex-shrink my-3">
          <Text className="text-lg font-light text-slate-800 flex-shrink">
            {trainName}
          </Text>
        </View>
        <View className="">
          <View className="relative w-full h-24">
            <View className="absolute h-0.5 rounded-full bg-slate-900 top-10 left-20 right-20">
              <Text></Text>
            </View>
            <View className="absolute w-4 h-4 rounded-full bg-slate-900 top-8 left-16 flex items-center justify-center">
              <View className="w-3 h-3 rounded-full bg-slate-50">
                <Text
                  className="absolute bottom-6 left-4 text-base font-bold w-32 text-slate-500"
                  style={{ transform: [{ translateX: -50 }] }}
                >
                  {start.time}
                </Text>
                <Text
                  className="absolute top-5 left-1/2 text-sm font-bold w-32 text-slate-600"
                  style={{ transform: [{ translateX: -50 }] }}
                >
                  {start.station}
                </Text>
              </View>
            </View>
            <View className="absolute w-4 h-4 rounded-full bg-slate-900 top-8 right-16 flex items-center justify-center">
              <View className="w-3 h-3 rounded-full bg-slate-50">
                <Text
                  className="absolute bottom-6 left-4 text-base font-bold w-32 text-slate-500"
                  style={{ transform: [{ translateX: -50 }] }}
                >
                  {end.time}
                </Text>
                <Text
                  className="absolute top-5 -left-1/2 text-sm font-bold w-32 text-slate-600"
                  style={{ transform: [{ translateX: -40 }] }}
                >
                  {end.station}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-0 mb-4 px-10">
          <TicketDetailRow title="Status" detail={status} />
          <TicketDetailRow title="Date" detail={date} />
          <TicketDetailRow title="Class" detail={_class} />
        </View>
      </View>
      <View
        className="w-full mb-3 -mt-0.5 bg-slate-50 rounded-b-3xl rounded-t-xl  overflow-hidden"
        style={{
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { height: 5, width: 5 },
          shadowRadius: 5,
          shadowOpacity: 0.1,
        }}
      >
        <View className="flex-1 items-center p-4">
          <QRCode value={ticketId} backgroundColor="transparent" size={150} />
        </View>
      </View>
    </>
  );
}

function TicketDetailRow({ title, detail }) {
  return (
    <View className="flex-row justify-between w-full my-1">
      <Text className="text-slate-400 font-medium">{title}</Text>
      <Text className="text-slate-600 font-medium text-left w-1/2">
        {detail}
      </Text>
    </View>
  );
}
