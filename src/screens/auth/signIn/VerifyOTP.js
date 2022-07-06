//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';

import auth from '@react-native-firebase/auth';

import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import database from '@react-native-firebase/database';
//constants
import { colors } from '../../../constants/colors';

//components
import InputField from '../../../components/InputField';
import CustomButton from '../../../components/CustomButton';
import { routes } from '../../../constants/routes';

// create a component
const VerifyOTP = (
    // props
    { navigation, route, onPress, value, onChangeText }
) => {
    const { myName, phoneNumber, confirm } = route.params;
    // const confirm = props.navigation.getParam('confirm')
    console.log('route', confirm)
    
    const [isLoading, setISLoading] = useState()
    const [number, setNumber] = useState('')
    // const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [list, setList] = useState('')

   

    const confirmCode = async () => {
       
        try {
            setISLoading(true)
            const data = await confirm.confirm(code);
            console.log('data', data)
            alert('verified user')
            setISLoading(false)
            const n = await database().ref('users')
                .child(auth().currentUser.uid)
                .once('value',snapshot=>{
                    if(snapshot.exists()){
                        let num= snapshot.val().phoneNumber
                        if(num == phoneNumber){
                        navigation.navigate(routes.home, {  confirm : 'confirm', phoneNumber })
                       }
                    }else{
                        navigation.navigate(routes.details, { confirm :'confirm' , phoneNumber })
                        const response =  database().ref(`users`)
                        .child(auth().currentUser.uid).set({
                            myName:'',
                            phoneNumber,
                            imageURL: '',
                            userId: auth().currentUser.uid,
                           
                            //  filename
                        })
                        console.log(response)
                        
                       
                        console.log(num)
                    }
                })
        } catch (error) {
            setISLoading(false)
            showMessage({
                message: `${error}`,
                type: "danger",
            });
            console.log(error);
            setISLoading(false)
        }

    }

    return (
        <SafeAreaView style={styles.backgroundImage}
        >
            <FlashMessage position="bottom" />
            {
                isLoading ?  <View
                style={{
                    minHeight: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    <ActivityIndicator color={'black'} size='large' />
                </View>
                : 
                <View style={styles.ContentContainer}>
                <Text style={styles.tittle}>Verify OTP</Text>

                <Text style={styles.text}>Enter 6digit code</Text>
                <View style={{ marginBottom: 40 }}>
                    <InputField
                        value={code}
                        // value={value}
                        // onChangeText={onChangeText}
                        onChangeText={text => setCode(text)}
                        keyboardType={'number-pad'}
                        placeholder={'Enter 6 character code'}
                        maxLength={6}
                    />
                </View>

                <View style={{ marginTop: 40 }}>
                    <TouchableOpacity
                        onPress={
                            // onPress
                            confirmCode
                        }
                        // disabled={number.length == 6 ? false : true}
                        style={[styles.container, {
                            backgroundColor:
                                // 'black'
                                code.length == 6 ? 'black' : 'white'
                        }]}>
                        <Text style={[styles.btnText, {
                            color:
                                // 'white' 
                                code.length == 6 ? 'white' : 'black'
                        }]}>Continue</Text>
                    </TouchableOpacity>

                </View>
            </View>
            }
           

        </SafeAreaView>
    );
};

// define your styles
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
        // alignItems:'center',
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

//make this component available to the app
export default VerifyOTP;
