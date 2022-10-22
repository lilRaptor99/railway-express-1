import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple, IconButton } from 'react-native-paper';
import { theme } from '../../reactNativePaperTheme';

export default function AvailableTrainCard({
  trainName = 'Yal Devi (Kankasanthurai)',
  start = { station: 'Colombo-Fort', time: '06:35 AM' },
  end = { station: 'Anuradhapura', time: '10:40 AM' },
  duration = '4h 5m',
  tag = { status: 'ETA', time: '23mins' },
}) {
  const navigation = useNavigation();

  function handleCardPress() {
    // @ts-ignore
    navigation.navigate('TrainDetails');
  }

  function getTag() {
    switch (tag.status) {
      case 'Cancelled':
        return (
          <View
            className="rounded-full px-3 py-2 mr-3"
            style={{ backgroundColor: theme.colors.error }}
          >
            <Text className="text-slate-50">{tag.status}</Text>
          </View>
        );

      case 'Delayed':
        return (
          <View
            className="rounded-full px-3 py-2 mr-3"
            style={{ backgroundColor: '#f06258' }}
          >
            <Text className="text-slate-50">
              {tag.status} {tag.time}
            </Text>
          </View>
        );

      default:
        return (
          <View className="bg-slate-300 rounded-full px-3 py-2 mr-3">
            <Text>
              {tag.status} {tag.time}
            </Text>
          </View>
        );
    }
  }

  return (
    <View
      className="w-full my-3 bg-slate-50 rounded-3xl"
      style={{
        elevation: 15,
      }}
    >
      <TouchableRipple
        onPress={handleCardPress}
        className="rounded-3xl"
        rippleColor="rgba(0, 0, 0, 0.1)"
        borderless
      >
        <View className="bg-slate-50 rounded-3xl w-full">
          <View className="relative flex-row items-center justify-between">
            <View className="flex-row items-center flex-shrink">
              <IconButton icon="train" size={35} />
              <Text className="text-lg font-bold flex-shrink">{trainName}</Text>
            </View>
            <View>{getTag()}</View>
            <View className="absolute h-0.5 bg-slate-500/25 w-full left-0 bottom-0">
              <Text></Text>
            </View>
          </View>

          <View className="p-5">
            <View className="relative w-full h-24">
              <View className="absolute h-0.5 rounded-full bg-slate-900 top-10 left-20 right-20">
                <Text></Text>
              </View>
              <View className="absolute w-5 h-5 rounded-full bg-slate-900 top-8 left-16 flex items-center justify-center">
                <View className="w-4 h-4 rounded-full bg-slate-50">
                  <Text
                    className="absolute bottom-6 left-4 text-lg font-bold w-32 text-slate-400"
                    style={{ transform: [{ translateX: -50 }] }}
                  >
                    {start.time}
                  </Text>
                  <Text
                    className="absolute top-5 -left-1/2 text-base text-center font-bold w-32 text-slate-600"
                    style={{ transform: [{ translateX: -50 }] }}
                  >
                    {start.station}
                  </Text>
                </View>
              </View>
              <View className="absolute w-5 h-5 rounded-full bg-slate-900 top-8 right-16 flex items-center justify-center">
                <View className="w-4 h-4 rounded-full bg-slate-50">
                  <Text
                    className="absolute bottom-6 left-4 text-lg font-bold w-32 text-slate-400"
                    style={{ transform: [{ translateX: -50 }] }}
                  >
                    {end.time}
                  </Text>
                  <Text
                    className="absolute top-5 -left-1/2 text-base text-center font-bold w-32 text-slate-600"
                    style={{ transform: [{ translateX: -40 }] }}
                  >
                    {end.station}
                  </Text>
                </View>
              </View>
            </View>
            <Text className="font-semibold">
              Duration: <Text className="font-bold">{duration}</Text>
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
}
