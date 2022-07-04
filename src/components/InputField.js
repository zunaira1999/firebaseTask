//import liraries
import React, { Component } from 'react';
import { View, Text,TextInput, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

// create a component
const InputField = ({
    fieldName,
    keyboardType,
    placeholder,
    value,
    onChangeText,
    maxLength,
    selectTextOnFocus,
    editable
}) => {
    return (
        <View style={styles.container}>
            <TextInput 
                placeholderTextColor={'lightgray'}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                maxLength={maxLength}
                editable={editable} selectTextOnFocus={selectTextOnFocus}
                style={styles.inputText} />
                
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text:{
        color: colors.gray,
        backgroundColor:'red'
    },
    inputText:{
    borderWidth:1,
    width:'90%',
    height:40,
    marginTop:10,
    borderColor: colors.white,
    backgroundColor:colors.white,
    borderRadius:20,
    paddingHorizontal:10,
    color:colors.gray,
    fontSize:15,
    alignSelf:'center',
    elevation:2
    }
});

//make this component available to the app
export default InputField;
