//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

// create a component
const RootNavigation = () => {
    return (
        <SafeAreaProvider>
            <AuthNavigation />
            
        </SafeAreaProvider>
    );
};



//make this component available to the app
export default RootNavigation;
