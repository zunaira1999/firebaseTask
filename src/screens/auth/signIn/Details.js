import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import InputField from '../../../components/InputField'
import CustomButton from '../../../components/CustomButton';
import database from '@react-native-firebase/database';
import FlashMessage from "react-native-flash-message";
import { routes } from '../../../constants/routes';
import auth from '@react-native-firebase/auth';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function Details({ route, navigation }) {
    const { phoneNumber, image } = route.params;
    const [userName, setUserName] = useState('')
    const [list, setList] = useState('')
    const [inputTextValue, setInputTExtValue] = useState(null)

    useEffect(() => {
        getDatabase();
    }, [])

    const getDatabase = async () => {
        try {
            const data = await database().ref(`users`)
                .child(auth)
                .on("value", tempData => {
                    setList(tempData.val());
                    console.log(data)
                })

        } catch (e) {
            console.log(e)
        }
    }
    const handleAddData = async () => {
        if (userName.length > 0) {
            navigation.navigate(routes.home, { myName: `${userName}`, phoneNumber })
            const response = database()
                .ref(`users`)
                .child(auth().currentUser.uid)
                .update({
                    myName : userName,
                    imageURL: '',
                    phoneNumber,
                    userId: auth().currentUser.uid
                })
            console.log(response)
            alert('user store')
            setUserName('')
            // try {

            //     const index = list.length;
            //     const response = await database().ref(`users/${index}`).set({
            //         // index:cardIndex,
            //         name: userName,
            //         phoneNum,
            //         image
            //     })
            //     setUserName('')
            //     console.log(response)
            //     navigation.navigate(routes.home, { myName: `${userName}`, phoneNum })
            // } catch (err) {
            //     console.log(err)
            // }
            // navigation.navigate(routes.home,{myName : `${userName}`})
        } else {
            showMessage({
                message: "Please Enter Value!",
                type: "danger",
            });
        }

    }

    return (
        <View style={styles.container}>
            <FlashMessage position="bottom" />
            <View style={{
                marginTop: 30
            }}>
                <View style={{ marginBottom: 30 }}>

                    <InputField
                        value={phoneNumber}
                        editable={false} selectTextOnFocus={false}
                    />
                </View>

                <Text style={styles.text}>Name</Text>
                <View style={{ marginBottom: 40 }}>
                    <InputField
                        value={userName}
                        onChangeText={text => setUserName(text)}
                        keyboardType={'name-phone-pad'}
                        placeholder={'Enter Your Name'}
                        maxLength={13}
                    />
                </View>
                <View style={{ marginTop: 40 }}>

                    <CustomButton
                        onPress={() => handleAddData()
                            // navigation.navigate(routes.home,{myName : `${userName}`})
                        }
                        tittle={'Continue'}
                    />
                </View>

                {/* <View style={styles.cardContainer}>
                    <Text style={{
                        color: 'gray',
                        fontSize: 20,
                        fontWeight: 'bold',
                        paddingHorizontal: 10
                    }}>ToDo List</Text>

                    <FlatList data={list}
                        renderItem={item => {
                            const cardIndex = item.index
                            if (item.item !== null) {
                                return <TouchableOpacity

                                    style={styles.card}>
                                    <Text style={{ color: 'red', fontSize: 16 }}>
                                        {item.item.name}
                                    </Text>

                                </TouchableOpacity>
                            }

                        }}

                    />


                </View> */}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        paddingHorizontal: 20,
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
    cardContainer: {
        marginVertical: 20,
        height: 250,
        paddingHorizontal: 10

    },
    card: {
        backgroundColor: 'lightgray',
        width: '100%',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 10,
        // marginHorizontal:10
    }
})