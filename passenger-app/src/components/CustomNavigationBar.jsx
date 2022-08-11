import React from 'react';
import { Appbar } from 'react-native-paper';

export default function CustomNavigationBar({
  navigation,
  back = undefined,
  route,
}) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {!back ? (
        <Appbar.Action
          icon="menu"
          color="white"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ) : null}
      <Appbar.Content title={route.params?.screenTitle} />
    </Appbar.Header>
  );
}
