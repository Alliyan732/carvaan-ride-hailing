import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing  Screens that i would be putting inside the child Stack Navigator 
import {CollectCash} from './CollectCash';
import {RootScreen} from './RootScreen'
import {Map1} from './Map1'


const Stack = createNativeStackNavigator();


export default function HomeScreen() {
    return (
      <Stack.Navigator initialRouteName='RootScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name='RootScreen' component={RootScreen}/>
        <Stack.Screen name='Map1' component={Map1} />
        <Stack.Screen name='CollectCash' component={CollectCash}/>
      </Stack.Navigator>
    );
  }

  