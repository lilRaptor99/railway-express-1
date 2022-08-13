import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Linking, View, Text, Image, ScrollView } from 'react-native';
// @ts-ignore
import DrawerLogo from '../../assets/images/DrawerLogo.png';
import { Button } from 'react-native-paper';
import { useAuth } from '../contexts/authContext';

export default function CustomDrawer(props) {
  const { currentUser, logout } = useAuth();
  // const user = await currentUser();

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

      {(() => {
        if (true) {
          return (
            <>
              <Button
                mode="contained"
                onPress={() => {
                  props.navigation.navigate('AuthNavigators');
                }}
                className="bg-slate-900 mb-5 mx-10 p-1 rounded-2xl"
              >
                Login
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  props.navigation.navigate('Register');
                }}
                className="mb-11 mx-10 p-1 rounded-2xl"
              >
                <Text className="text-slate-200">Register</Text>
              </Button>
            </>
          );
        } else {
          return (
            <Button
              mode="contained"
              onPress={() => {
                logout();
                props.navigation.navigate('AuthNavigators');
              }}
              className="bg-slate-900 mb-11 mx-10 p-1 rounded-2xl"
            >
              Logout
            </Button>
          );
        }
      })()}
    </View>
  );
}
