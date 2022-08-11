const React = require('react');
const { View, Text } = require('react-native');
const { Button } = require('react-native-paper');

export default function SearchTrains({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search Trains</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('SearchResults')}
      >
        Search
      </Button>
    </View>
  );
}
