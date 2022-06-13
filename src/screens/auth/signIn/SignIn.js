//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

import auth from '@react-native-firebase/auth';

//constants
import { colors } from '../../../constants/colors';

//components
import InputField from '../../../components/InputField';
import CustomButton from '../../../components/CustomButton';
import { routes } from '../../../constants/routes';

// create a component
const SignIn = ({ navigation }) => {

    const [number, setNumber] = useState('')
    const [confirm, setConfirm] = useState(null);

    const handleVerification = async (number) => {
        console.log(number)
        // navigation.navigate(routes.otp, { 'confirm': confirm })
        try {
            const confirmation = await auth().signInWithPhoneNumber(number);
            if (confirmation) {
                setConfirm(confirmation);
                navigation.navigate(routes.otp, { 'confirm': confirm })
            }  
            console.log(confirmation)
        } catch (error) {
            console.log(error)
        }
        
    }
    // console.log(handleVerification)

    return (
        <SafeAreaView style={styles.backgroundImage}
        >
            <View style={styles.ContentContainer}>
                <Text style={styles.tittle}>SignIn</Text>

                <Text style={styles.text}>Phone Number</Text>
                <View style={{ marginBottom: 40 }}>
                    <InputField
                        value={number}
                        onChangeText={text => setNumber(text)}
                        keyboardType={'name-phone-pad'}
                        placeholder={'Enter Your Phone Number'}
                        maxLength={13}
                    />
                </View>

                <View style={{ marginTop: 40 }}>
                    <TouchableOpacity
                        onPress={()=>handleVerification('+923061402407')}
                        disabled={number.length == 11 ? false : true}
                        style={[styles.container,{backgroundColor: number.length == 13 ? 'black': 'white'}]}>
                        <Text style={[styles.btnText,{color: number.length ==13? 'white':'black'}]}>Continue</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // opacity: 0.6,
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'center',
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
        borderWidth:1,
        borderColor:colors.black,
        height:40,
        marginHorizontal:30,
        justifyContent:'center',
        // alignItems:'center',
        borderRadius:20,
        elevation:2
    },
    btnText:{
        color:colors.black,
        alignSelf:'center',
        fontSize:16,
        fontWeight:'bold'
    }
});

//make this component available to the app
export default SignIn;
