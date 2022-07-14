//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { routes } from '../../constants/routes';
import SignIn from '../../screens/auth/signIn/SignIn';
import { colors } from '../../constants/colors';
import VerifyOTP from '../../screens/auth/signIn/VerifyOTP';
import Home from '../../screens/dashboard/home/Home';
import Add from '../../screens/dashboard/add/Add';
import AllUsers from '../../screens/dashboard/allUsers/AllUsers';
import Search from '../../screens/dashboard/search/Search';
import Details from '../../screens/auth/signIn/Details';
import BasicInformation from '../../screens/dashboard/basic information/BasicInformation';


const Stack = createNativeStackNavigator()

// create a component
const AuthNavigation = () => {
    return (
        <>
        <StatusBar
            barStyle='dark-content'
            translucent
            backgroundColor={colors.white}
            
        />

        <Stack.Navigator   screenOptions={{headerShown:false , animation: 'slide_from_bottom'  }} >
            <Stack.Screen name={routes.signin} component={SignIn} />
            <Stack.Screen name={routes.otp} component={VerifyOTP} />
            <Stack.Screen name={routes.home} component={Home} />
            <Stack.Screen name={routes.add} component={Add} />
            <Stack.Screen name={routes.allUSers} component={AllUsers} />
            <Stack.Screen name={routes.search} component={Search} />
            <Stack.Screen name={routes.details} component={Details} />

            <Stack.Screen name={routes.basicInformation} component={BasicInformation} />

        </Stack.Navigator>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default AuthNavigation;
