//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

// create a component
const CustomButton = ({tittle,onPress,disabled}) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            disabled={disabled}
            style={styles.container}>
            <Text style={styles.text}>{tittle}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderWidth:1,
        borderColor:colors.black,
        height:40,
        marginHorizontal:30,
        justifyContent:'center',
        // alignItems:'center',
        borderRadius:20,
        backgroundColor:'white',
        elevation:2
    },
    text:{
        color:colors.black,
        alignSelf:'center',
        fontSize:16,
        fontWeight:'bold'
    }
});

//make this component available to the app
export default CustomButton;
