const React = require('react');
const { View, Text } = require('react-native');
const { Button } = require('react-native-paper');

export default function SearchTimeTable({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search Time Table</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('StationSchedule')}
      >
        Search
      </Button>
    </View>
  );
}
