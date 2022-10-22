import React, { useEffect, useRef, useState } from 'react';
import AvailableTrainCard from '../../components/AvailableTrainCard';
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
} from 'react-native';
import request from '../../utils/request';
import { ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import CalenderCard from '../../components/CalenderCard';
import { date } from 'yup';
// @ts-ignore
import UndrawSubway from '../../../assets/images/noResults.png';

export default function SearchResults({ route, navigation }) {
  const { searchQuery } = route.params;

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const todayUTC = new Date(new Date().toDateString());
  const todaySL = new Date(todayUTC);
  todaySL.setHours(todayUTC.getHours() + 5);
  todaySL.setMinutes(todayUTC.getMinutes() + 30);

  const dateArray = [];
  const [selectedDate, setSelectedDate] = useState(todaySL);
  let lastDate = new Date(todaySL);
  lastDate.setDate(lastDate.getDate() - 7);
  for (let i = 1; i <= 15; i++) {
    dateArray.push(lastDate);
    lastDate = new Date(lastDate);
    lastDate.setDate(lastDate.getDate() + 1);
  }

  // useEffect(() => {
  //   navigation.setParams({
  //     screenTitle: `Available trains [ ${from} - ${to} ]`,
  //   });
  // }, []);

  useEffect(() => {
    (async () => {
      queryTrains(todaySL);
    })();
  }, []);

  async function queryTrains(date) {
    setLoading(true);
    setSearchResults([]);
    const result = await request('POST', '/public/search-schedule', {
      ...searchQuery,
      date: date.toString(),
    });
    setLoading(false);
    setSearchResults(result.data.results);
  }

  const [cardPosX, setCardPosX] = useState(0);
  const calenderArrayRef = useRef(null);
  calenderArrayRef?.current?.scrollTo({ x: cardPosX, y: 0, animated: true });
  return (
    <ScrollView
      style={{
        backgroundColor: '#F4F4F6',
      }}
    >
      <KeyboardAvoidingView className="flex-1 items-center mx-6">
        <ScrollView className="" ref={calenderArrayRef} horizontal>
          <View className="flex-1 flex-row gap-2 items-center my-2.5">
            {dateArray.map((date) => {
              return (
                <CalenderCard
                  key={'{' + date + '}'}
                  month={moment(date).clone().format('MMM').toUpperCase()}
                  day={date.getDate()}
                  selected={selectedDate.toDateString() === date.toDateString()}
                  setCardPosX={setCardPosX}
                  handlePress={() => {
                    setSelectedDate(date);
                    queryTrains(date);
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
        {isLoading && (
          <ActivityIndicator
            size={'large'}
            animating={true}
            className="mt-28"
          />
        )}

        {searchResults.map((train) => {
          const todayUTC = new Date(new Date().toDateString());
          const todaySL = new Date(todayUTC);
          todaySL.setHours(todayUTC.getHours() + 5);
          todaySL.setMinutes(todayUTC.getMinutes() + 30);
          const todayMoment = moment(todaySL).clone();
          // const durationStartMoment = moment(todayMoment, 'hh:mm A')
          //   .clone()
          //   .add(moment.duration('10:00'));
          const startStation = train.trainTurn.intermediateStations.filter(
            (station) => station.stationId === searchQuery.from
          )[0];
          const destinationStation =
            train.trainTurn.intermediateStations.filter(
              (station) => station.stationId === searchQuery.to
            )[0];

          const durationStartMoment = moment(todayMoment, 'hh:mm A')
            .clone()
            .add(moment.duration(startStation.departureTime));
          const durationEndMoment = moment(todayMoment, 'hh:mm A')
            .clone()
            .add(moment.duration(destinationStation.arrivalTime));
          const durationInMinutes = moment
            .duration(durationEndMoment.diff(durationStartMoment))
            .asMinutes();
          const durationString =
            Math.floor(durationInMinutes / 60) +
            'h ' +
            (durationInMinutes % 60) +
            'm';
          // console.log('duration', durationString);

          return (
            <AvailableTrainCard
              key={train.turnNumber}
              trainName={train.trainTurn.turnName}
              start={{
                station: startStation.station.name,
                time: startStation.departureTime,
              }}
              end={{
                station: destinationStation.station.name,
                time: destinationStation.arrivalTime,
              }}
              duration={durationString}
              tag={
                train.cancelled
                  ? { status: 'Cancelled', time: '0h 0m' }
                  : train.delayed
                  ? { status: 'Delayed', time: train.delayTime }
                  : // : { status: '', time: '' }
                    { status: 'ETA', time: '00h 00m' }
              }
              handlePress={() => {
                navigation.navigate('TrainDetails', {
                  trainSchedule: train,
                });
              }}
            />
          );
        })}
      </KeyboardAvoidingView>
      {!isLoading && searchResults.length === 0 && (
        <View
          className="flex-1 items-center mt-28"
          style={{ minHeight: 200, minWidth: '100%' }}
        >
          <Image source={UndrawSubway} style={{ height: 200, width: '50%' }} />
          <Text className="text-lg font-medium">No Trains Available!</Text>
        </View>
      )}
    </ScrollView>
  );
}
