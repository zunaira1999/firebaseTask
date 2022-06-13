//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../constants/colors';
import { routes } from '../../../constants/routes';

// create a component
const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity
                    onPress={()=>navigation.navigate(routes.add)}
                    // disabled={disabled}
                    style={styles.btnContainer}>
                    <Text style={styles.text}>Add </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>navigation.navigate(routes.allUSers)}
                    // disabled={disabled}
                    style={styles.btnContainer}>
                    <Text style={styles.text}>All Users </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>navigation.navigate(routes.search)}
                    // disabled={disabled}
                    style={styles.btnContainer}>
                    <Text style={styles.text}>Search </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'center'
    },
    content: {
        marginTop: 50,
        flex: 0.7,
        // alignItems:'center',
        justifyContent:'center'
    },
    btnContainer: {
        // flex: 1,
        borderWidth: 1,
        borderColor: colors.black,
        height: 40,
        marginHorizontal: 30,
        marginBottom:20,
        justifyContent: 'center',
        // alignItems:'center',
        borderRadius: 20,
        elevation: 2
    },
    text: {
        color: colors.black,
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default Home;
