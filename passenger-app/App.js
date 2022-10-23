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
import ForgotPassword from './src/screens/auth/ForgotPassword';
import ForgotPasswordResetPage from './src/screens/auth/ForgotPasswordResetPage';
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';
import VerifyEmail from './src/screens/auth/VerifyEmail';
import BuyTickets from './src/screens/buyTickets/BuyTickets';
import DownloadTicket from './src/screens/buyTickets/DownloadTicket';
import TicketPayment from './src/screens/buyTickets/TicketPayment';
import ComplaintsAndSuggestions from './src/screens/complaintsSuggestions/ComplaintsAndSuggestions';
import MyProfile from './src/screens/myProfile/MyProfile';
import ReserveSeats from './src/screens/reserveSeats/ReserveSeats';
import SearchResults from './src/screens/search/SearchResults';
import SearchTrains from './src/screens/search/SearchTrains';
import TrainDetails from './src/screens/search/TrainDetails';
import MyTickets from './src/screens/tickets/MyTickets';
import SearchTimeTable from './src/screens/timeTables/SearchTimeTable';
import StationSchedule from './src/screens/timeTables/StationSchedule';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  'Possible Unhandled Promise Rejection ...',
  'Request error: , [AxiosError: Request failed with status code 401]',
]);

export const Stack = createNativeStackNavigator();
export const Drawer = createDrawerNavigator();

function SearchNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="SearchTrains"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="SearchTrains"
        component={SearchTrains}
        initialParams={{ screenTitle: 'Search Trains' }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        initialParams={{ screenTitle: 'Available Trains' }}
      />
      <Stack.Screen
        name="TrainDetails"
        component={TrainDetails}
        initialParams={{ screenTitle: 'Train details' }}
      />
    </Stack.Navigator>
  );
}
function TimeTableNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="SearchTimeTable"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="SearchTimeTable"
        component={SearchTimeTable}
        initialParams={{ screenTitle: 'Search Time Table' }}
      />
      <Stack.Screen
        name="StationSchedule"
        component={StationSchedule}
        initialParams={{ screenTitle: 'Station Schedule' }}
      />
    </Stack.Navigator>
  );
}
function MyTicketsNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="MyTickets"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="MyTickets"
        component={MyTickets}
        initialParams={{ screenTitle: 'My Tickets' }}
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
      <Stack.Screen
        name="Register"
        component={Register}
        initialParams={{ screenTitle: 'Register' }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        initialParams={{ screenTitle: 'Reset Password' }}
      />
      <Stack.Screen
        name="ForgotPasswordResetPage"
        component={ForgotPasswordResetPage}
        initialParams={{ screenTitle: 'Reset Password' }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        initialParams={{ screenTitle: 'Verify Email' }}
      />
    </Stack.Navigator>
  );
}

function BuyTicketsNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="BuyTickets"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="BuyTickets"
        component={BuyTickets}
        initialParams={{ screenTitle: 'Buy Tickets' }}
      />
      <Stack.Screen
        name="TicketPayment"
        component={TicketPayment}
        initialParams={{ screenTitle: 'Ticket Payment' }}
      />
      <Stack.Screen
        name="DownloadTicket"
        component={DownloadTicket}
        initialParams={{ screenTitle: 'Download Ticket' }}
      />
    </Stack.Navigator>
  );
}
function ComplaintsAndSuggestionsNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="ComplaintsAndSuggestions"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="ComplaintsAndSuggestions"
        component={ComplaintsAndSuggestions}
        initialParams={{ screenTitle: 'Complaints and Suggestions' }}
      />
    </Stack.Navigator>
  );
}
function ReserveSeatsNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="ReserveSeats"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="ReserveSeats"
        component={ReserveSeats}
        initialParams={{ screenTitle: 'Reserve Seats' }}
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
            name="My Tickets"
            component={MyTicketsNavigators}
            options={drawerScreenOptions({ icon: 'barcode' })}
          />
          <Drawer.Screen
            name="My Profile"
            component={MyProfileNavigators}
            options={drawerScreenOptions({ icon: 'card-account-details' })}
          />
          <Drawer.Screen
            name="Complaints and Suggestions"
            component={ComplaintsAndSuggestionsNavigators}
            options={drawerScreenOptions({ icon: 'message-processing' })}
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
            initialRouteName="Search Trains"
            screenOptions={{
              header: () => undefined,
            }}
            drawerContent={CustomDrawer}
          >
            <Drawer.Screen
              name="Search Trains"
              component={SearchNavigators}
              options={drawerScreenOptions({ icon: 'magnify' })}
            />
            <Drawer.Screen
              name="Time Tables"
              component={TimeTableNavigators}
              options={drawerScreenOptions({ icon: 'table-large' })}
            />
            <Drawer.Screen
              name="Buy Tickets"
              component={BuyTicketsNavigators}
              options={drawerScreenOptions({ icon: 'cards' })}
            />
            <Drawer.Screen
              name="Reserve Seats"
              component={ReserveSeatsNavigators}
              options={drawerScreenOptions({ icon: 'seat-recline-extra' })}
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
