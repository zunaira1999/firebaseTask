//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native';
import { colors } from '../../../constants/colors';
import InputField from '../../../components/InputField';

// create a component
const AllUsers = () => {
    return (
        <View style={styles.container}>
            <View style={{
                marginTop:40,
                
            }}>
                <TextInput  
                    style={styles.inputText}
                    placeholderTextColor={colors.gray}
                    placeholder={'Serch User'}
                />
                <Text style={{color:'red'}}>dsfsdfsd</Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },
    inputText:{
        borderWidth:1,
        width:'90%',
        height:40,
        marginTop:10,
        marginBottom: 20,
        borderColor: colors.white,
        backgroundColor:colors.white,
        borderRadius:20,
        paddingHorizontal:15,
        color:colors.gray,
        fontSize:14,
        alignSelf:'center',
        elevation:2
        }
});

//make this component available to the app
export default AllUsers;
