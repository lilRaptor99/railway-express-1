import { useEffect, useState } from 'react';
import Autocomplete from '../../components/Autocomplete';
import TextInput from '../../components/TextInput';
import request from '../../utils/request';
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../../../reactNativePaperTheme';

const React = require('react');
const {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} = require('react-native');
const { Button, Snackbar } = require('react-native-paper');

let fromStation = null;
let stationData = null;

export default function SearchTimeTable({ navigation }) {
  const [allStations, setAllStations] = useState([]);
  const [loginError, setLoginError] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    request('get', '/public/stations')
      .then((res) => {
        stationData = res.data;
        setAllStations(res.data.map((stationObj) => stationObj.name));
      })
      .catch((e) => console.error('Error Loading station data!'));
  }, []);

  async function handleSubmit() {
    if (fromStation === null) {
      setLoginError('Enter stations to search!');
      return;
    }

    setLoginError(null);

    const from = stationData.filter(
      (stationObj) => stationObj.name === fromStation
    )[0].stationId;

    let date;
    if (!selectedDate) date = new Date();
    else date = selectedDate;
    const dateUTC = new Date(date.toDateString());
    const dateSL = new Date(dateUTC);
    dateSL.setHours(dateUTC.getHours() + 5);
    dateSL.setMinutes(dateUTC.getMinutes() + 30);

    setTimeout(() => {
      navigation.navigate('StationSchedule', {
        searchQuery: { from, date: dateSL.toString() },
      });
    }, 100);
  }

  return (
    <>
      <View style={{ flex: 1 }} className="p-8">
        <Text className="text-2xl mb-6 text-center">Search Time Table</Text>
        <Autocomplete
          placeholder="Station"
          onSelectItem={(item) => {
            fromStation = item;
          }}
          itemsArray={allStations}
        />
        <View className="mt-2">
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="#f2f2f2"
            onPress={() => {
              setShowPicker(true);
            }}
          >
            <TextInput
              label="Date (Leave blank for today)"
              value={
                selectedDate
                  ? selectedDate.getFullYear() +
                    '/' +
                    (selectedDate.getMonth() + 1) +
                    '/' +
                    selectedDate.getDate()
                  : ''
              }
              errorText=""
              disabled
            />
          </TouchableHighlight>
        </View>
        {showPicker && (
          <DateTimePicker
            value={new Date()}
            display="spinner"
            onChange={(event, date) => {
              setShowPicker(false);
              setSelectedDate(date);
            }}
          />
        )}
        <Button mode="contained" onPress={handleSubmit} className="mt-4">
          View Time Table
        </Button>
      </View>
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
