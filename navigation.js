import { View, Text } from 'react-native';
import React from 'react';
import EditScreen from './screens/EditScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <Stack.Navigator
    >
        <Stack.Screen name="Notelite" component={HomeScreen}/>
        <Stack.Screen name="Edit" component={EditScreen}/>
    </Stack.Navigator>
  )
}