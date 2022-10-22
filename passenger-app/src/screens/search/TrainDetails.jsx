import React from 'react';

import { View, ScrollView, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
// @ts-ignore
import TrainSchedule from '../../../assets/images/train_schedule.jpg';
import Divider from '../../components/Divider';

export default function TrainDetails({ route, navigation }) {
  const { trainSchedule } = route.params;

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        <View className="flex-1 mx-6">
          <View className="mt-5">
            <Text className="text-4xl font-light mb-2">
              {trainSchedule.trainTurn.turnName}
            </Text>
            <TrainDetailRow
              title={'Available'}
              detail={
                trainSchedule.trainTurn.availability === 'DAILY'
                  ? 'Daily'
                  : trainSchedule.trainTurn.availability === 'SO'
                  ? 'Sunday only'
                  : trainSchedule.trainTurn.availability === 'NS'
                  ? 'Daily except on Saturdays'
                  : trainSchedule.trainTurn.availability === 'NSU'
                  ? 'Daily except on Sunday'
                  : 'Unavailable'
              }
            />
            <TrainDetailRow
              title="Train type"
              detail={
                trainSchedule.trainTurn.type[0] +
                trainSchedule.trainTurn.type.substring(1).toLowerCase()
              }
            />
            <TrainDetailRow
              title="Can be reserved"
              detail={trainSchedule.trainTurn.reservable ? 'Yes' : 'No'}
            />

            {/* <Text className="text-lg font-light mt-0.5">
              Can be reserved:{' '}
              {trainSchedule.trainTurn.reservable ? 'Yes' : 'NO'}
            </Text> */}
            <Text className=""> </Text>
            <Divider />
          </View>
          <View>
            <Text className="text-slate-800 text-lg font-medium mt-2">
              The train will stop at
            </Text>
            <Text className="text-slate-500 ">
              (Click the station name to see its schedule)
            </Text>
            <Text className="-mb-2"> </Text>
            <Divider />
          </View>

          {trainSchedule.trainTurn.intermediateStations.map((station) => (
            <TrainIntermediateStationRow
              key={station.stationId}
              stationName={station.station.name}
              arrive={station.arrivalTime}
              departure={station.departureTime}
            />
          ))}
        </View>
        <View className="flex-1 flex-row items-center justify-center mt-8">
          <Button
            mode="contained"
            className="mr-12"
            onPress={() => {
              console.log('sdfsdfsdf');
              navigation.navigate('Buy Tickets');
            }}
          >
            Buy Tickets
          </Button>
          <Button
            mode="contained"
            className=""
            onPress={() => {}}
            disabled={!trainSchedule.trainTurn.reservable}
          >
            Reserve seats
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

function TrainDetailRow({ title, detail }) {
  return (
    <View className="flex-row justify-between items-center w-full my-0.5">
      <Text className="text-slate-400 text-lg font-medium w-5/12">{title}</Text>
      <Text className="text-slate-600 text-lg  font-medium text-left ml-2 w-7/12">
        {detail}
      </Text>
    </View>
  );
}

function TrainIntermediateStationRow({ stationName, arrive, departure }) {
  return (
    <View>
      <View className="px-8">
        <Text className="text-slate-800 text-lg font-medium mt-2">
          {stationName}
        </Text>
        <View className="flex-1 flex-row justify-between">
          <Text className="text-slate-500 ">Arrive at: {arrive}</Text>
          <Text className="text-slate-500 ">Leave at: {departure}</Text>
        </View>
      </View>
      <Text className="-mb-2"> </Text>
      <Divider />
    </View>
  );
}
