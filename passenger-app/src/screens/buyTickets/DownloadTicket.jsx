const React = require('react');
const { View, Text, ScrollView, Image } = require('react-native');
const { Button } = require('react-native-paper');
import Ticket from '../../components/Ticket';

export default function DownloadTicket({ route, navigation }) {
  const { paymentStatus } = route.params;

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        <View className="flex-1 items-center mb-8 mt-4 w-full px-8">
          {paymentStatus === 'SUCCESS' ? (
            <Text className="text-3xl font-normal text-center mt-10 mb-4 text-green-700">
              Payment success
            </Text>
          ) : (
            <Text className="text-3xl font-normal text-center mt-10 mb-4 text-red-700">
              Payment error
            </Text>
          )}
          <Ticket ticketType="Normal" />
        </View>
      </ScrollView>
    </>
  );
}
