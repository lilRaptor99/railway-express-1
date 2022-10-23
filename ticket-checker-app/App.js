import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';
import { TailwindProvider } from 'tailwindcss-react-native';
import { theme } from './reactNativePaperTheme';
import { useAuth } from './src/contexts/authContext';

import CustomDrawer from './src/components/CustomDrawer';
import CustomNavigationBar from './src/components/CustomNavigationBar';

import { useEffect, useState } from 'react';
import Login from './src/screens/auth/Login';
import MyProfile from './src/screens/myProfile/MyProfile';
import InitialScreen from './src/screens/initialScreen/InitialScreen';
import TicketChecker from './src/screens/tickets/TicketChecker';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  `The action 'NAVIGATE' with payload {"name":"Ticket Validator"} was not handled by any navigator.`,
  'Possible Unhandled Promise Rejection ...',
  'Request error: , [AxiosError: Request failed with status code 401]',
]);

export const Stack = createNativeStackNavigator();
export const Drawer = createDrawerNavigator();

function InitialNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="InitialScreen"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        initialParams={{ screenTitle: 'Initial Screen' }}
      />
    </Stack.Navigator>
  );
}

function TicketCheckerNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="TicketChecker"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="TicketChecker"
        component={TicketChecker}
        initialParams={{ screenTitle: 'Ticket Validator' }}
      />
    </Stack.Navigator>
  );
}
function AuthNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        initialParams={{ screenTitle: 'Login' }}
      />
    </Stack.Navigator>
  );
}

function MyProfileNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        initialParams={{ screenTitle: 'My Profile' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      setUser(await currentUser);
    })();
  }, [currentUser]);

  function getUserScreens() {
    if (user) {
      return (
        <>
          <Drawer.Screen
            name="Ticket Validator"
            component={TicketCheckerNavigators}
            options={drawerScreenOptions({ icon: 'barcode' })}
          />
          <Drawer.Screen
            name="My Profile"
            component={MyProfileNavigators}
            options={drawerScreenOptions({ icon: 'card-account-details' })}
          />
        </>
      );
    } else return null;
  }

  const drawerScreenOptions = ({ icon }) => {
    return {
      drawerIcon: ({ color }) => (
        <IconButton size={22} icon={icon} color={color} />
      ),
      drawerLabelStyle: {
        fontSize: 17,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
      drawerInactiveTintColor: '#94a3b8',
      drawerInactiveBackgroundColor: '#3d4252',
      drawerActiveTintColor: 'white',
      drawerActiveBackgroundColor: 'rgba(0, 0, 0, 0.06)',
      drawerItemStyle: { marginTop: 0, marginBottom: 0, padding: 0 },
    };
  };

  return (
    <TailwindProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Drawer.Navigator
            initialRouteName="Initial Screen"
            screenOptions={{
              header: () => undefined,
            }}
            drawerContent={CustomDrawer}
          >
            <Drawer.Screen
              name="Initial Screen"
              component={InitialNavigators}
              options={{
                ...drawerScreenOptions({ icon: 'login' }),
                drawerItemStyle: { display: 'none' },
              }}
            />

            {getUserScreens()}

            <Drawer.Screen
              name="AuthNavigators"
              component={AuthNavigators}
              options={{
                ...drawerScreenOptions({ icon: 'login' }),
                drawerItemStyle: { display: 'none' },
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </TailwindProvider>
  );
}
