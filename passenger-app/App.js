import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, Button, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  createDrawerNavigator,
  useDrawerStatus,
} from '@react-navigation/drawer';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Home-2')}>
        Go to home screen 2
      </Button>
    </View>
  );
}

function HomeScreen2() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen2</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
function CustomNavigationBar({ navigation, back, options, route }) {
  const drawerStatus = useDrawerStatus();
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {!back ? (
        <Appbar.Action
          icon="menu"
          color="white"
          onPress={() => {
            console.log('opening drawer...');
            navigation.openDrawer();
            console.log('Drawer status:', drawerStatus);
          }}
        />
      ) : null}
      <Appbar.Content title={route.params?.screenTitle} />
    </Appbar.Header>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        // @ts-ignore
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ screenTitle: 'My awesome Home' }}
      />
      <Stack.Screen
        name="Home-2"
        component={HomeScreen2}
        initialParams={{ screenTitle: 'My Home 2' }}
      />
    </Stack.Navigator>
  );
}
function DetailsNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="Details"
      screenOptions={{
        // @ts-ignore
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        initialParams={{ screenTitle: 'My Details page' }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: () => undefined,
          }}
        >
          <Drawer.Screen name="HomeNavigators" component={HomeNavigators} />
          <Drawer.Screen
            name="DetailsNavigators"
            component={DetailsNavigators}
          />
        </Drawer.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
