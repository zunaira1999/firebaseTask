//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation/RootNavigation';

// create a component
const App = () => {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
    </SafeAreaProvider>
  );
};




//make this component available to the app
export default App;
