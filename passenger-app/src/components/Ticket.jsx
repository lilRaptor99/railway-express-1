import React from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { IconButton } from 'react-native-paper';

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export default function Ticket({
  ticketType = 'Reservation',
  ticketId = 'edb6cd17-e0d0-4889-a72d-13daddf49ff9',
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
  price = '260.00',
}) {
  const [qrLarge, setQrLarge] = useState(false);

  function downloadTicket() {
    (async () => {
      if (Platform.OS === 'android') {
        try {
          const permissionStatus = await hasAndroidPermission();
          console.log('Permission granted:', permissionStatus);
          // @ts-ignore
          const fileUri = await ref.current.capture();
          const copyFile =
            FileSystem.documentDirectory +
            `Railway_Express_Ticket_${ticketId}.png`;
          await FileSystem.copyAsync({ from: fileUri, to: copyFile });
          await Sharing.shareAsync(copyFile);
          console.log('File saved!');
        } catch (e) {
          console.log('Error ocurred:', e);
        }
      }
    })();
  }

  const ref = useRef();

  const reservation = ticketType !== 'Normal';

  return (
    <View className="relative w-full">
      <ViewShot
        ref={ref}
        options={{ fileName: 'File-Name', format: 'png' }}
        className="w-full"
      >
        <View className="w-full">
          <View
            className={`w-full mt-3  rounded-t-3xl ${
              status === 'Valid'
                ? 'bg-slate-50 rounded-b-xl'
                : 'bg-slate-100 rounded-b-3xl'
            }  overflow-hidden relative`}
            style={{
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: { height: 5, width: 5 },
              shadowRadius: 5,
              shadowOpacity: 0.1,
            }}
          >
            <View
              className={`${
                status === 'Valid' ? 'bg-slate-700' : 'bg-slate-900/20'
              } p-2.5 rounded-t-3xl`}
              style={{
                elevation: 20,
                shadowColor: '#000',
                shadowOffset: { height: 5, width: 0 },
                shadowRadius: 5,
                shadowOpacity: 0.3,
              }}
            >
              <Text className="text-slate-200 font-semibold text-lg text-center">
                {reservation ? 'Reservation' : 'Normal Ticket'}
                {status === 'Valid' ? '' : '  -  ' + status}
              </Text>
            </View>

            {reservation ? (
              <View className="flex-1 items-center flex-shrink my-3">
                <Text className="text-lg font-light text-slate-800 flex-shrink">
                  {trainName}
                </Text>
              </View>
            ) : null}

            <View className="">
              <View className="relative w-full h-24">
                <View className="absolute h-0.5 rounded-full bg-slate-900 top-10 left-20 right-20">
                  <Text></Text>
                </View>
                <View className="absolute w-4 h-4 rounded-full bg-slate-900 top-8 left-16 flex items-center justify-center">
                  <View className="w-3 h-3 rounded-full bg-slate-50">
                    {reservation ? (
                      <Text
                        className="absolute bottom-6 left-4 text-base font-bold w-32 text-slate-500"
                        style={{ transform: [{ translateX: -50 }] }}
                      >
                        {start.time}
                      </Text>
                    ) : null}

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
                    {reservation ? (
                      <Text
                        className="absolute bottom-6 left-4 text-base font-bold w-32 text-slate-500"
                        style={{ transform: [{ translateX: -50 }] }}
                      >
                        {end.time}
                      </Text>
                    ) : null}

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

            <View className="mt-0 mb-5 px-8">
              <TicketDetailRow title="Status" detail={status} />
              <TicketDetailRow title="Date" detail={date} />
              <TicketDetailRow title="Class" detail={_class} />
              {reservation ? (
                <>
                  <TicketDetailRow title="Duration" detail={duration} />
                  <TicketDetailRow
                    title="Primary Passenger"
                    detail={primaryPassenger}
                  />
                  <TicketDetailRow title="No. of Seats" detail={seats.length} />
                  <TicketDetailRowSeats />
                </>
              ) : (
                <>
                  <TicketDetailRow title="Price" detail={'LKR ' + price} />
                  <TicketDetailRow
                    title="Return"
                    detail={_return ? 'Yes' : 'No'}
                  />
                </>
              )}
            </View>
            <View className="absolute bg-slate-900/10 h-0.5 w-full bottom-0 left-0">
              <Text></Text>
            </View>
          </View>

          {status === 'Valid' ? (
            <View
              className="w-full mb-3 -mt-0 bg-slate-50 rounded-b-3xl rounded-t-xl overflow-hidden relative"
              style={{
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { height: 5, width: 5 },
                shadowRadius: 5,
                shadowOpacity: 0.1,
              }}
            >
              <View className="absolute bg-slate-900/10 h-0.5 w-full top-0 left-0">
                <Text></Text>
              </View>
              <View className="flex-1 items-center pt-6 pb-8">
                <QRCode
                  value={ticketId}
                  backgroundColor="transparent"
                  size={qrLarge ? 250 : 150}
                />
              </View>
            </View>
          ) : null}
        </View>
      </ViewShot>

      {status === 'Valid' ? (
        <>
          {qrLarge ? (
            <>
              <View className="absolute bottom-2 right-0">
                <IconButton
                  icon="fullscreen-exit"
                  size={28}
                  onPress={() => {
                    setQrLarge(false);
                  }}
                />
              </View>
            </>
          ) : (
            <>
              <View className="absolute bottom-4 left-5">
                <IconButton
                  icon="download"
                  size={28}
                  onPress={downloadTicket}
                />
              </View>
              <View className="absolute bottom-4 right-5">
                <IconButton
                  icon="fullscreen"
                  size={28}
                  onPress={() => {
                    setQrLarge(true);
                  }}
                />
              </View>
            </>
          )}
        </>
      ) : null}
    </View>
  );

  function TicketDetailRow({ title, detail }) {
    return (
      <View className="flex-row justify-between items-center w-full my-1.5">
        <Text className="text-slate-400 font-medium w-4/12">{title}</Text>
        <Text className="text-slate-600 font-medium text-left ml-2 w-8/12">
          {detail}
        </Text>
      </View>
    );
  }
  function TicketDetailRowSeats() {
    return (
      <View className="flex-row justify-between items-center w-full my-1.5">
        <Text className="text-slate-400 font-medium w-4/12">Seats</Text>
        <View className="w-8/12 ml-2 flex-row gap-1 flex-wrap">
          {seats.map((seat) => (
            <View
              key={`{${seat}}`}
              className="bg-slate-900 px-4 py-1 rounded-full"
            >
              <Text className="text-slate-50">{seat}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
