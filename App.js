
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";

import { gestureHandlerRootHOC } from "react-native-gesture-handler";


// User Imports
import PastActivities from "./src/components/profiling/PastActivities";
import Settings from "./src/components/profiling/Settings";

import HomeScreen from "./src/components/user/HomeScreen";
import SearchRide from "./src/components/user/SearchRide";
import Booking from "./src/components/user/Booking";
import SelectRide from "./src/components/user/SelectRide";
import ConfirmRide from "./src/components/user/ConfirmRide";
import PayRider from "./src/components/user/PayRider";
import RideSummary from "./src/components/user/RideSummary";
import WaitingRider from "./src/components/user/WaitingRider";
import InProgress from "./src/components/user/InProgress";
import PayRiderBreakdown from "./src/components/user/PayRiderBreakdown";

import PayRiderAlt from "./src/components/user/PayRiderAlt";


// Importing Driver Screens
import DriverHomeScreen from './src/components/driver/HomeScreen';
import { OnlineScreen } from './src/components/driver/OnlineScreen';
import { RideRequest } from './src/components/driver/RideRequest';
import { RideAccepted } from './src/components/driver/RideAccepted';
import { RideCancel1 } from './src/components/driver/RideCancel1';
import { WaitingForRider } from './src/components/driver/WaitingForRider';
import { RideInProgress } from './src/components/driver/RideInProgress';
import { RideAlmostEnded } from './src/components/driver/RideAlmostEnded';
import { Feedback } from './src/components/driver/Feedback';
import DriverRideSummary from './src/components/driver/RideSummary';
import { CloseToRider } from './src/components/driver/CloseToRider';
// Update 2
import DriverSettings from './src/components/driver/Settings'
import DriverPastActivities from './src/components/driver/PastActivities'



// User, Driver Profiling imports
import Splash from './src/components/profiling/User/Splash';

import SignInHome from './src/components/profiling/User/SignInHome';
import UserSignIn from './src/components/profiling/User/UserSignIn';
import UserSignUp from './src/components/profiling/User/UserSignUp';
import UserFirstSignIn from './src/components/profiling/User/UserFirstSignIn';
import UserPersonalDetails from './src/components/profiling/User/UserPersonalDetails';
import UserAddProfilePic from './src/components/profiling/User/UserAddProfilePic';
import UserPaymentMethod from './src/components/profiling/User/UserPayementMethod';
import DriverLicense from './src/components/profiling/Driver/DriverLicense';
import DriverCnic from './src/components/profiling/Driver/DriverCnic';
import VehiclePicture from './src/components/profiling/Driver/VehiclePicture';
import VehicleInformation from './src/components/profiling/Driver/VehicleInformation';
import DriverPaymentMethod from './src/components/profiling/Driver/DriverPaymentMethod';
import DriverSignIn from './src/components/profiling/Driver/DriverSignIn';
import DriverFirstSignIn from './src/components/profiling/Driver/DriverFirstSignIn';
import DriverSignUp from './src/components/profiling/Driver/DriverSignUp';
import DriverPersonalDetails from './src/components/profiling/Driver/DriverPersonalDetails';
import DriverAddProfilePic from './src/components/profiling/Driver/DriverAddProfilePic';

import Home from './src/components/profiling/User/Home';

// importing profiling screen components
// (<Splash />)
(<SignInHome />),
  (<UserSignIn />),
  (<UserSignUp />),
  (<UserPersonalDetails />),
  (<UserAddProfilePic />),
  (<UserPaymentMethod />),
  (<Home />),
  // Driver Screens
  ((<DriverSignIn />),
    (<DriverFirstSignIn />)),
  (<DriverSignUp />),
  (<DriverLicense />),
  (<DriverCnic />),
  (<VehiclePicture />),
  (<VehicleInformation />),
  (<DriverPaymentMethod />),
  (<DriverAddProfilePic />);


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomSheet = createBottomSheetNavigator();
function UserScreen() {
  return (
    <BottomSheet.Navigator
      screenOptions={{
        snapPoints: ["20%", "50%", "60%", "70%", "80%", "90%", "100%"],
      }}
    >
      <BottomSheet.Screen
        name="UserHomeScreenNavigation"
        component={UserHomeScreenNavigation}
      />
      <BottomSheet.Screen name="SearchRide" component={SearchRide} />
      <BottomSheet.Screen name="Booking" component={Booking} />
      <BottomSheet.Screen name="SelectRide" component={SelectRide} />
      <BottomSheet.Screen name="ConfirmRide" component={ConfirmRide} />
      <BottomSheet.Screen name="PayRider" component={PayRider} />
      <BottomSheet.Screen name="RideSummary" component={RideSummary} />
      <BottomSheet.Screen name="WaitingRider" component={WaitingRider} />
      <BottomSheet.Screen name="InProgress" component={InProgress} />
      <BottomSheet.Screen
        name="PayRiderBreakdown"
        component={PayRiderBreakdown}
      />
    </BottomSheet.Navigator>
  );
}

const UserHomeStackNavigation = createNativeStackNavigator();

function UserHomeScreenNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PayRiderAlt" component={PayRiderAlt} />
    </Stack.Navigator>
  );
}
function DriverScreen() {
  return (
    <BottomSheet.Navigator
      screenOptions={{
        snapPoints: ['40%', '70%', '100%'],
      }}
    >
      <BottomSheet.Screen name='DriverHomeScreen' component={DriverHomeScreen} />
      <BottomSheet.Screen name='OnlineScreen' component={OnlineScreen} options={{
        snapPoints: ['60%', '80%'],
      }} />
      <BottomSheet.Screen name='RideRequest' component={RideRequest} options={{
        snapPoints: ['55%'],
      }} />
      <BottomSheet.Screen name='RideAccepted' component={RideAccepted} options={{
        snapPoints: ['60%', '68%'],
      }} />
      <BottomSheet.Screen name='CloseToRider' component={CloseToRider} options={{
        snapPoints: ['62%'],
      }} />
      <BottomSheet.Screen name='RideCancel1' component={RideCancel1} options={{
        snapPoints: ['65%'],
      }} />
      <BottomSheet.Screen name='WaitingForRider' component={WaitingForRider} options={{
        snapPoints: ['60%'],
      }} />
      <BottomSheet.Screen name='RideInProgress' component={RideInProgress} options={{
        snapPoints: ['63%'],
      }} />
      <BottomSheet.Screen name='RideAlmostEnded' component={RideAlmostEnded} options={{
        snapPoints: ['62%', '50%'],
      }} />
      <BottomSheet.Screen name='Feedback' component={Feedback} options={{
        snapPoints: ['60%'],
      }} />
      <BottomSheet.Screen name='DriverRideSummary' component={DriverRideSummary} options={{
        snapPoints: ['100%'],
      }} />

      {/* <BottomSheet.Screen name='Info' component={Info}/> */}
    </BottomSheet.Navigator>
  )
}

function UserHome() {
  return (
    <Drawer.Navigator
      initialRouteName="UserScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="UserScreen" component={UserScreen} />
      <Drawer.Screen name="PastActivities" component={PastActivities} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

// Driver Side of Screens
function DriverHome() {
  return (
    <Drawer.Navigator initialRouteName='DriverScreen' screenOptions={{ headerShown: false }} >
      <Drawer.Screen name='DriverScreen' component={DriverScreen} />
      <Drawer.Screen name='DriverPastActivities' component={DriverPastActivities} options={{ title: "Past Activities" }} />
      <Drawer.Screen name='DriverSettings' component={DriverSettings} options={{ title: "Settings" }} />
    </Drawer.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen  name="Splash" component={Splash} options={{headerShown: false}} /> */}
        <Stack.Screen
          name="SignInHome"
          component={SignInHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserSignIn"
          component={UserSignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserSignUp"
          component={UserSignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserFirstSignIn"
          component={UserFirstSignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserPersonalDetails"
          component={UserPersonalDetails}
        />
        <Stack.Screen
          name="UserAddProfilePic"
          component={UserAddProfilePic}
          options={{ title: 'Personal Details' }}
        />
        <Stack.Screen
          name="UserPaymentMethod"
          component={UserPaymentMethod}
          options={{ title: 'Add A New Card' }}
        />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />

        {/* Driver Screens */}
        <Stack.Screen
          name="DriverLicense"
          component={DriverLicense}
          options={{ title: 'Driver License' }}
        />
        <Stack.Screen
          name="DriverCnic"
          component={DriverCnic}
          options={{ title: 'CNIC' }}
        />
        <Stack.Screen
          name="VehiclePicture"
          component={VehiclePicture}
          options={{ title: 'Vehicle Picture' }}
        />
        <Stack.Screen
          name="VehicleInformation"
          component={VehicleInformation}
          options={{ title: 'Vehicle Information' }}
        />
        <Stack.Screen
          name="DriverPaymentMethod"
          component={DriverPaymentMethod}
          options={{ title: 'Payment Method' }}
        />
        <Stack.Screen
          name="DriverSignIn"
          component={DriverSignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverSignUp"
          component={DriverSignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverFirstSignIn"
          component={DriverFirstSignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverPersonalDetails"
          component={DriverPersonalDetails}
          options={{ title: 'About' }}
        />
        <Stack.Screen
          name="DriverAddProfilePic"
          component={DriverAddProfilePic}
          options={{ title: 'Profile Picture' }}
        />

        {/* user home */}

        <Stack.Screen
          name="UserHome"
          component={UserHome}
          options={{ headerShown: false }}
        />

        {/* driver home */}

        <Stack.Screen
          name="DriverHome"
          component={DriverHome}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
