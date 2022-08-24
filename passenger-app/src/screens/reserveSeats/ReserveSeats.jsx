import TextInput from '../../components/TextInput';

const React = require('react');
const { View, Text } = require('react-native');
const { Button } = require('react-native-paper');

export default function ReserveSeats({ navigation }) {
  return (
    <View style={{ flex: 1 }} className="p-8">
      <Text className="text-2xl mb-6 text-center">Reserve Seats</Text>
      <TextInput label="From" errorText={''} />
      <TextInput label="To" errorText={''} />
      <TextInput
        label="Date"
        placeholder="Date (Leave blank for today)"
        errorText={''}
      />
      <TextInput label="Number of Seats" errorText={''} />
      <Button mode="contained" onPress={() => {}} className="mt-4">
        Search seats
      </Button>
    </View>
  );
}
