import React, { useEffect, useState } from 'react';
import AvailableTrainCard from '../../components/AvailableTrainCard';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import request from '../../utils/request';
import { ActivityIndicator } from 'react-native-paper';
import moment from 'moment';

export default function SearchResults({ route, navigation }) {
  const { searchQuery } = route.params;

  const [searchResults, setSearchResults] = useState([
    {
      turnNumber: 1007,
      date: '2022-10-21T00:00:00.000Z',
      cancelled: false,
      delayed: false,
      delayTime: null,
      headGuardUserId: null,
      underGuardUserId: null,
      driverUserId: null,
      driverAssistantUserId: null,
      trainTurn: {
        turnNumber: 1007,
        turnName: 'Udarata Menike',
        reservable: true,
        availability: 'DAILY',
        type: 'INTERCITY',
        intermediateStations: [
          {
            stationId: 'FOT',
            arrivalTime: '',
            departureTime: '08:35',
            isStart: true,
            isEnd: false,
            turnNumber: 1007,
            station: {
              stationId: 'FOT',
              name: 'Colombo-Fort',
              address: 'Fort Railway Station, Colombo',
              phoneNumber: '+94112434215',
              location: '6.933957704555925, 79.84995215472523',
            },
          },
          {
            stationId: 'PGW',
            arrivalTime: '09:49',
            departureTime: '09:54',
            isStart: false,
            isEnd: false,
            turnNumber: 1007,
            station: {
              stationId: 'PGW',
              name: 'Polgahawela',
              address: 'Polgahawela Railway station',
              phoneNumber: '',
              location: '7.331758928576164, 80.30120056395806',
            },
          },
          {
            stationId: 'PDN',
            arrivalTime: '10:54',
            departureTime: '10:58',
            isStart: false,
            isEnd: false,
            turnNumber: 1007,
            station: {
              stationId: 'PDN',
              name: 'Peradeniya',
              address: 'Peradeniya Railway station',
              phoneNumber: '',
              location: '7.2588149034327145, 80.59020354860766',
            },
          },
          {
            stationId: 'KDY',
            arrivalTime: '',
            departureTime: '11:15',
            isStart: false,
            isEnd: true,
            turnNumber: 1007,
            station: {
              stationId: 'KDY',
              name: 'Kandy',
              address: 'Kandy Railway station',
              phoneNumber: '',
              location: '7.290755432173376, 80.6322723179272',
            },
          },
        ],
      },
    },
    {
      turnNumber: 1029,
      date: '2022-10-21T00:00:00.000Z',
      cancelled: false,
      delayed: false,
      delayTime: null,
      headGuardUserId: null,
      underGuardUserId: null,
      driverUserId: null,
      driverAssistantUserId: null,
      trainTurn: {
        turnNumber: 1029,
        turnName: '',
        reservable: true,
        availability: 'DAILY',
        type: 'INTERCITY',
        intermediateStations: [
          {
            stationId: 'FOT',
            arrivalTime: '',
            departureTime: '15:35',
            isStart: true,
            isEnd: false,
            turnNumber: 1029,
            station: {
              stationId: 'FOT',
              name: 'Colombo-Fort',
              address: 'Fort Railway Station, Colombo',
              phoneNumber: '+94112434215',
              location: '6.933957704555925, 79.84995215472523',
            },
          },
          {
            stationId: 'PDN',
            arrivalTime: '17:43',
            departureTime: '17:45',
            isStart: false,
            isEnd: false,
            turnNumber: 1029,
            station: {
              stationId: 'PDN',
              name: 'Peradeniya',
              address: 'Peradeniya Railway station',
              phoneNumber: '',
              location: '7.2588149034327145, 80.59020354860766',
            },
          },
          {
            stationId: 'KDY',
            arrivalTime: '18:00',
            departureTime: '',
            isStart: false,
            isEnd: true,
            turnNumber: 1029,
            station: {
              stationId: 'KDY',
              name: 'Kandy',
              address: 'Kandy Railway station',
              phoneNumber: '',
              location: '7.290755432173376, 80.6322723179272',
            },
          },
        ],
      },
    },
  ]);
  const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   navigation.setParams({
  //     screenTitle: `Available trains [ ${from} - ${to} ]`,
  //   });
  // }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const todayUTC = new Date(new Date().toDateString());
      const todaySL = new Date(todayUTC);
      todaySL.setHours(todayUTC.getHours() + 5);
      todaySL.setMinutes(todayUTC.getMinutes() + 30);

      const result = await request('POST', '/public/search-schedule', {
        ...searchQuery,
        date: todaySL.toString(),
      });
      setLoading(false);
      setSearchResults(result.data.results);
    })();
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: '#F4F4F6',
      }}
    >
      <KeyboardAvoidingView className="flex-1 items-center mx-6">
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
          console.log('duration', durationString);

          return (
            <AvailableTrainCard
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
                  : { status: 'ETA', time: '00h 00m' }
              }
            />
          );
        })}
        <AvailableTrainCard
          trainName="Uttara Devi"
          start={{ station: 'Colombo-Fort', time: '11:50 AM' }}
          end={{ station: 'Anuradhapura', time: '03:29 PM' }}
          duration="3h 39m"
          tag={{ status: 'ETA', time: '1h 5m' }}
        />
        <AvailableTrainCard
          trainName="Rajarata Rajini"
          start={{ station: 'Colombo-Fort', time: '01:15 PM' }}
          end={{ station: 'Anuradhapura', time: '06:22 PM' }}
          duration="5h 7m"
          tag={{ status: 'Delayed', time: '1h' }}
        />
        <AvailableTrainCard
          trainName="Sri Devi"
          start={{ station: 'Colombo-Fort', time: '03:55 PM' }}
          end={{ station: 'Anuradhapura', time: '07:15 PM' }}
          duration="5h 7m"
          tag={{ status: 'Cancelled', time: '' }}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
