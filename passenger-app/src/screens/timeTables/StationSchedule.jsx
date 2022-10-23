import moment from 'moment';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';
import Divider from '../../components/Divider';
import request from '../../utils/request';
import * as Linking from 'expo-linking';

const React = require('react');
const { View, Text, ScrollView, TouchableHighlight } = require('react-native');

export default function StationSchedule({ route, navigation }) {
  const { searchQuery } = route.params;
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    queryTrains();
  }, []);

  async function queryTrains() {
    setLoading(true);
    setSearchResults(null);
    const result = await request('POST', '/public/search-station-schedule', {
      ...searchQuery,
    });
    setLoading(false);
    setSearchResults(result.data);
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        {isLoading && (
          <ActivityIndicator
            size={'large'}
            animating={true}
            className="mt-28"
          />
        )}
        {searchResults && (
          <View className="flex-1 mx-6">
            <View className="mt-5">
              <Text className="text-4xl font-light mb-2">
                {searchResults.stationDetails.name}
              </Text>
              <TrainDetailRow
                title={'Address'}
                detail={searchResults.stationDetails.address}
              />
              <TrainDetailRow
                title="Phone number"
                detail={
                  <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#f2f2f2"
                    onPress={() => {
                      Linking.openURL(
                        `tel:${searchResults.stationDetails.phoneNumber}`
                      );
                    }}
                  >
                    <Text className="text-slate-600 text-lg  font-medium text-left">
                      {searchResults.stationDetails.phoneNumber}
                    </Text>
                  </TouchableHighlight>
                }
              />
              <TrainDetailRow
                title="Previous station"
                detail={searchResults.stationDetails.adjacentTo[0].name}
              />
              <TrainDetailRow
                title="Next station"
                detail={searchResults.stationDetails.adjacentTo[1].name}
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
                Schedule on{' '}
                {moment(new Date(searchQuery.date))
                  .clone()
                  .format('[the] Do [of] MMMM, YYYY')}
              </Text>
              <Text className="text-slate-500 ">
                (Click the train name to see its schedule)
              </Text>
              <Text className="-mb-2"> </Text>
              <Divider />
            </View>

            {searchResults.results.map((turn) => (
              <TrainIntermediateStationRow
                key={turn.turnNumber}
                stationName={turn.trainTurn.turnName}
                arrive={
                  turn.trainTurn.intermediateStations.filter(
                    (station) => station.stationId === searchQuery.from
                  )[0].arrivalTime
                }
                departure={
                  turn.trainTurn.intermediateStations.filter(
                    (station) => station.stationId === searchQuery.from
                  )[0].departureTime
                }
              />
            ))}
          </View>
        )}
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
