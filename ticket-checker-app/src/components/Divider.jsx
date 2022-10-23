import React from 'react';
import { View, Text } from 'react-native';

export default function Divider(props) {
  return (
    <View className={props.className}>
      <View className={`h-0.5 rounded-sm bg-slate-700/20 w-full`}>
        <Text> </Text>
      </View>
    </View>
  );
}
