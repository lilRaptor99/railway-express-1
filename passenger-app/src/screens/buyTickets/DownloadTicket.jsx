const React = require('react');
const { View, Text, ScrollView, Image } = require('react-native');
const { Button } = require('react-native-paper');
import Ticket from '../../components/Ticket';
// @ts-ignore
import SuccessImg from '../../../assets/images/success.png';
// @ts-ignore
import ErrorImg from '../../../assets/images/error.png';

export default function DownloadTicket({ route, navigation }) {
  const { paymentStatus } = route.params;

  if (paymentStatus === 'ERROR') {
    setTimeout(() => {
      navigation.pop();
    }, 3000);
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        <View className="flex-1 mb-8 mt-4 w-full px-8">
          {paymentStatus === 'SUCCESS' ? (
            <>
              <View className="flex-1 flex-row items-center justify-center w-full">
                <View className="mr-4" style={{ minHeight: 40, minWidth: 40 }}>
                  <Image
                    source={SuccessImg}
                    style={{ height: 40, width: 40 }}
                  />
                </View>
                <Text className="text-xl font-normal text-center text-green-700">
                  Payment success
                </Text>
              </View>
              <Text className="text-lg mt-4 font-normal text-slate-900">
                Download/Share below ticket,
              </Text>
              <Ticket ticketType="Normal" />
            </>
          ) : (
            <>
              <View className="flex-1 items-center justify-center w-full">
                <View
                  className="mr-4"
                  style={{ minHeight: 150, minWidth: 150 }}
                >
                  <Image
                    source={ErrorImg}
                    style={{ height: 150, width: 150 }}
                  />
                </View>
                <Text className="text-2xl font-normal mt-4 text-center text-red-700">
                  Payment Failed!
                </Text>
              </View>
              <Text className="text-lg font-normal mt-4 text-left text-slate-900">
                Redirecting back to buy tickets page...
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}
