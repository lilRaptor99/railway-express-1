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
        <View className="flex-1 items-center mb-8 mt-4 w-full px-8">
          <Ticket />
          <Ticket ticketType="Normal" />
          <Ticket ticketType="Normal" status="Expired" />
        </View>
      </ScrollView>
    </>
  );
}
