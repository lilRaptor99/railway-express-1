import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Linking, View, Text, Image, ScrollView } from 'react-native';
// @ts-ignore
import DrawerLogo from '../../assets/images/DrawerLogo.png';

export default function CustomDrawer(props) {
  return (
    <View className="bg-slate-700 min-h-full">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: '#3d4252',
          alignSelf: 'stretch',
        }}
      >
        <View className="flex-1 items-center mb-8" style={{ maxHeight: 200 }}>
          <Image source={DrawerLogo} style={{ height: 200, width: 280 }} />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="bg-slate-900 h-12 rounded-3xl mb-11 mx-8">
        <Text className="text-slate-200 text-lg">Hellooo</Text>
      </View>
    </View>
  );
}
