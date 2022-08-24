import TextInput from '../../components/TextInput';

const React = require('react');
const { View, Text } = require('react-native');
const { Button, RadioButton } = require('react-native-paper');

export default function BuyTickets({ navigation }) {
  const [value, setValue] = React.useState('secondClass');
  return (
    <View style={{ flex: 1 }} className="p-8">
      <Text className="text-2xl mb-6 text-center">Buy Tickets</Text>
      <TextInput label="From" errorText={''} />
      <TextInput label="To" errorText={''} />
      <Text className="text-base mt-3 mb-1">Select Class</Text>

      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}
      >
        <View className="flex flex-row">
          <View className="flex flex-row items-center mr-8">
            <RadioButton value="secondClass" color="#1b1f2f" status="checked" />
            <Text>Second Class</Text>
          </View>
          <View className="flex flex-row items-center">
            <RadioButton value="thirdClass" color="#1b1f2f" />
            <Text>Third Class</Text>
          </View>
        </View>
      </RadioButton.Group>

      <TextInput label="Number of Seats" errorText={''} />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('StationSchedule')}
        className="mt-4"
      >
        Proceed to pay
      </Button>
    </View>
  );
}
