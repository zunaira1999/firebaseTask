//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import auth from '@react-native-firebase/auth';

//constants
import { colors } from '../../../constants/colors';
import FlashMessage from "react-native-flash-message";

//components
import InputField from '../../../components/InputField';
import CustomButton from '../../../components/CustomButton';
import { routes } from '../../../constants/routes';
import VerifyOTP from './VerifyOTP';

// create a component
const SignIn = ({ navigation }) => {

    const [userName, setUserName] = useState('')
    const [number, setNumber] = useState('')
    const [confirm, setConfirm] = useState(null);
    const [isLoading, setISLoading] = useState()



    const handleVerification = async (number) => {
        console.log(number)

        try {
            setISLoading(true)
            const confirmation = await auth().signInWithPhoneNumber(number);
            if (confirmation) {
                setConfirm(confirmation);
                alert('user sign in')
                navigation.navigate(routes.otp, { confirm: confirmation, phoneNumber: `${number}` })
                setISLoading(false)
            }
            console.log(confirmation)
        } catch (error) {
            console.log(error)
            setISLoading(false)
            showMessage({
                message: `${error}`,
                type: "danger",
            });
            setISLoading(false)
        }





    }





    return (
        <SafeAreaView style={styles.backgroundImage}
        >
            {
                isLoading ?
                    
                     <View style={{
                        minHeight: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator size={'large'} color='black' />
                    </View>
                    :
                    <View>
                        <FlashMessage position="bottom" />
                        <View style={styles.ContentContainer}>
                            <Text style={styles.tittle}>SignIn</Text>



                            <Text style={styles.text}>Phone Number</Text>
                            <View style={{ marginBottom: 40 }}>
                                <InputField
                                    value={number}
                                    onChangeText={text => setNumber(text)}
                                    keyboardType={'name-phone-pad'}
                                    placeholder={'+923012345678'}
                                    maxLength={13}

                                />
                            </View>

                            <View style={{ marginTop: 40 }}>
                                <TouchableOpacity
                                    onPress={() => handleVerification(number)}
                                    // disabled={number.length == 12 ? false : true}
                                    style={[styles.container, {
                                        backgroundColor: 'black'
                                        // number.length == 13 ? 'black': 'white'
                                    }]}>
                                    <Text style={[styles.btnText, {
                                        color: 'white'
                                        // number.length ==13? 'white':'black'
                                    }]}>Continue</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

            }


        </SafeAreaView>
    );

};

// // define your styles
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        backgroundColor: 'white',
    },
    ContentContainer: {
        marginTop: 50

        // opacity:
    },
    tittle: {
        color: colors.black,
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    text: {
        color: 'black',
        paddingHorizontal: 20,
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
    container: {
        // flex: 1,
        borderWidth: 1,
        borderColor: colors.black,
        height: 40,
        marginHorizontal: 30,
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 2
    },
    btnText: {
        color: colors.black,
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

// //make this component available to the app
export default SignIn;
