import React, { useEffect } from 'react';
import AvailableTrainCard from '../../components/AvailableTrainCard';
import { ScrollView, KeyboardAvoidingView } from 'react-native';

export default function SearchResults({ route, navigation }) {
  const { from, to } = route.params;

  useEffect(() => {
    navigation.setParams({
      screenTitle: `Available trains [ ${from} - ${to} ]`,
    });
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: '#F4F4F6',
      }}
    >
      <KeyboardAvoidingView className="flex-1 items-center mx-6">
        <AvailableTrainCard />
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
