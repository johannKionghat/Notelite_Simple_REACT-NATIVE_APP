import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import "./global.css"; 
import { useEffect, useState } from 'react';
import * as SQLite from "expo-sqlite"
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Navigation from './navigation';
import { DataProvider } from './context/dataContext';

export default function App() {
  return(
    <DataProvider>
      <NavigationContainer>
        <Navigation/>
     </NavigationContainer>
    </DataProvider>
    
  )
}
