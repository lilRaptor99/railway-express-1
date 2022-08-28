import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

import { View, Text, ScrollView, Image } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { theme } from '../../../reactNativePaperTheme';
// @ts-ignore
import UndrawSubway from '../../../assets/images/undraw_subway.png';
import Autocomplete from '../../components/Autocomplete';
import request from '../../utils/request';

let fromStation = null;
let toStation = null;
let stationData = null;

export default function SearchTrains({ navigation }) {
  const [loginError, setLoginError] = useState(null);

  const [allStations, setAllStations] = useState([]);

  useEffect(() => {
    request('get', '/public/stations')
      .then((res) => {
        stationData = res.data;
        setAllStations(res.data.map((stationObj) => stationObj.name));
      })
      .catch((e) => setLoginError('Error Loading station data!'));
  }, []);

  async function handleSubmit() {
    if (fromStation === null || toStation === null) {
      setLoginError('Enter stations to search!');
      return;
    }
    if (fromStation === toStation) {
      setLoginError('Enter valid station!');
      return;
    }

    setLoginError(null);

    const from = stationData.filter(
      (stationObj) => stationObj.name === fromStation
    )[0].stationId;
    const to = stationData.filter(
      (stationObj) => stationObj.name === toStation
    )[0].stationId;

    setTimeout(() => {
      navigation.navigate('SearchResults', {
        from,
        to,
      });
    }, 100);
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
          minHeight: 500,
        }}
        className=""
      >
        <View className="" style={{ minHeight: 200, minWidth: '100%' }}>
          <Image source={UndrawSubway} style={{ height: 200, width: '100%' }} />
        </View>

        <View
          className="flex-1 items-center ml-12 mr-16 mt-10"
          style={{
            minHeight: 500,
          }}
        >
          <Text className="text-3xl font-normal mb-4 text-slate-700">
            Search Trains
          </Text>
          <>
            <Autocomplete
              placeholder="Start"
              onSelectItem={(item) => {
                fromStation = item;
              }}
              itemsArray={allStations}
            />
            <Autocomplete
              placeholder="Destination"
              onSelectItem={(item) => {
                toStation = item;
              }}
              itemsArray={allStations}
            />

            <Button mode="contained" className="mt-4" onPress={handleSubmit}>
              Search
            </Button>
          </>
        </View>
      </ScrollView>
      <Snackbar
        visible={Boolean(loginError)}
        onDismiss={() => setLoginError(null)}
        action={{
          label: 'Close',
          onPress: () => setLoginError(null),
        }}
        style={{ backgroundColor: theme.colors.error }}
      >
        {loginError}
      </Snackbar>
    </>
  );
}
