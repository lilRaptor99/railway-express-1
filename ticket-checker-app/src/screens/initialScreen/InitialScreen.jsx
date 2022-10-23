import React, { useEffect, useState } from 'react';

import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/authContext';

export default function InitialScreen({ route, navigation }) {
  // setTimeout(() => {
  //   navigation.navigate('StationSchedule', {
  //     searchQuery: { from: 'FOT', date: '2022-10-23T00:00:00.000Z' },
  //   });
  // }, 100);
  const { currentUser, logout } = useAuth();

  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const curUser = await currentUser;
      setUser(curUser);
      if (!curUser) {
        navigation.navigate('AuthNavigators');
      } else {
        navigation.navigate('Ticket Validator');
      }
    })();
  }, [currentUser]);

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
          minHeight: 500,
        }}
        className=""
      >
        <View className="flex-1 items-center ml-12 mr-16 mt-10">
          <Text className="font-normal mt-4 text-slate-700/30">
            Initial Screen
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
