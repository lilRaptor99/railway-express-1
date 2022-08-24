const React = require('react');
const { View, Text, ScrollView, Image } = require('react-native');
const { Button } = require('react-native-paper');
// @ts-ignore
import MyTicketImage from '../../../assets/images/my_ticket.png';
// @ts-ignore
import MyTicketImage2 from '../../../assets/images/my_ticket2.png';

export default function MyTickets({ navigation }) {
  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        <View
          className="flex-1 items-center mb-2 mt-4"
          style={{ minHeight: 420, minWidth: '80%' }}
        >
          <Image
            source={MyTicketImage}
            style={{ height: '100%', width: '80%' }}
          />
        </View>
        <View
          className="flex-1 items-center mb-4 mt-2"
          style={{ minHeight: 600, minWidth: '80%' }}
        >
          <Image
            source={MyTicketImage2}
            style={{ height: '100%', width: '80%' }}
          />
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
