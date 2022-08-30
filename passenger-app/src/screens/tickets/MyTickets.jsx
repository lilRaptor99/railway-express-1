const React = require('react');
const { View, Text, ScrollView, Image } = require('react-native');
const { Button } = require('react-native-paper');
import Ticket from '../../components/Ticket';

export default function MyTickets({ navigation }) {
  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        <View className="flex-1 items-center mb-40 mt-4 mx-8">
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
        </View>

        <View className="flex-1 flex-row items-center justify-center">
          <Button mode="contained" className="mr-12" onPress={() => {}}>
            Buy Tickets
          </Button>
          <Button mode="contained" className="" onPress={() => {}}>
            Reserve seats
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
