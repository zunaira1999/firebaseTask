//import liraries
import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, Image,  
    FlatList, TouchableOpacity, Alert, ScrollView
} from 'react-native';
import { colors } from '../../../constants/colors';
import InputField from '../../../components/InputField';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

// create a component
const Search = ({ route, userName }) => {
    const { myName, uid, phoneNumber } = route.params
    const [ picked, setPicked ] = useState(false);
    const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    const [refresh, setrefresh] = useState(true)
    const [url, setUrl] = useState()
    // console.log(myName)
    useEffect(() => {
        getDatabase();
    }, [])


    const getDatabase = async () => {
        try {
            const data = await database().ref(`users`)
                .on("value", snapShot => {
                    let ar = [];
                    if (snapShot.exists()) {
                        snapShot.forEach((item, inx) => {
                            ar.push(item)
                            console.log(ar)

                        })

                    }
                    setList(ar)
                })
        } catch (e) {
            console.log(e)
        }
    }
    
    


    const handleLongPress = (key, cardValue) => {
        Alert.alert('Alert', `Are You Sure To Delete ${cardValue}`, [
            {
                text: 'Cancel',
                onPress: () => {
                    console.log('Cancel is press')
                }
            },
            {
                text: 'Yes',
                onPress: async () => {
                    try {
                        const response = await database().ref(`users/${key}`).remove()

                        console.log(response)
                    } catch (error) {
                        console.log(error)
                    }
                }
            },
        ])
    }
    const searchUser = () => {


        const n = database()
            .ref('users')
            .orderByChild("myName")
            .equalTo(search)
            .on('value', snapshot => {
                console.log('snap', snapshot, list)
                if (snapshot.exists()) {
                    console.log('user Found', Object.values(snapshot.val()))
                    setList([snapshot])
                    setrefresh(false)
                    setTimeout(() => {
                        setrefresh(true)
                    }, 100);
                }
                else {
                    console.log('user not exist')
                    Alert.alert('Alert', 'User not exist')
                }
            })
    }
    return (
        <View style={styles.container}>
            <View style={{
                marginTop: 40,

            }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>

                    <TextInput
                        style={styles.inputText}
                        placeholderTextColor={colors.gray}
                        placeholder={'Search user by name...'}
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                    <TouchableOpacity
                        onPress={searchUser}
                        style={{
                            backgroundColor: 'black',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                            height: 40,
                            borderRadius: 10,
                            paddingHorizontal: 5,
                            // marginRight: 20
                            marginLeft: 10,
                        }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.cardContainer}>
                    <Text style={{
                        color: 'gray',
                        fontSize: 20,
                        fontWeight: 'bold',
                        paddingHorizontal: 10
                    }}>Users List</Text>
                    {
                        search ?
                            <FlatList data={list}
                            
                                style={[{ height: 620 }]}
                                showsVerticalScrollIndicator={false}
                                renderItem={item => {
                                    
                                    if (item.item !== null) {
                                        const { item: { _snapshot: { myName, phoneNumber, imageURL, key, value } } } = item
                                        {
                                            console.log('value is', value.myName, myName)
                                        }
                                        return <TouchableOpacity
                                            onLongPress={() => handleLongPress(key, myName)}
                                            style={[styles.card]}>
                                            {
                                                console.log('data item' ,item)
                                            }
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={{ color: '#F9F9F9', fontSize: 16, paddingHorizontal: 10, fontWeight: 'bold' }}>Image: </Text>
                                                <Image style={{ height: 50, width: 50 }} source={{ uri: value.imageURL ? value.imageURL : value[Object.keys(value)[0]].imageURL }} />
                                            </View>

                                            <Text style={{ color: '#F9F9F9', fontSize: 16, fontWeight: 'bold' }}>
                                                {
                                                    console.log(value[Object.keys(value)[0]].myName, 'test', (myName != myName && myName ? myName : value.myName))
                                                }
                                                Name:{value.myName ? value.myName : value[Object.keys(value)[0]].myName}
                                            </Text>

                                            <Text style={{ color: '#F9F9F9', fontSize: 16, fontWeight: 'bold' }}>
                                                Phone Number:  {value.phoneNumber ? value.phoneNumber : value[Object.keys(value)[0]].phoneNumber}
                                            </Text>

                                        </TouchableOpacity>
                                    }
                                    

                                }}

                            />

                            :
                            // <Text>no user </Text>
                            <FlatList data={list}
                                style={{ height: 530 }}
                                showsVerticalScrollIndicator={false}
                                renderItem={item => {

                                    if (item.item !== null) {
                                        const { item: { _snapshot: { value, key } } } = item
                                        return <TouchableOpacity
                                            onLongPress={() => handleLongPress(key, value.myName)}
                                            style={styles.card}>
                                            {
                                                console.log('eles condoition',item)
                                            }
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={{ color: '#F9F9F9', fontSize: 16, paddingHorizontal: 10, fontWeight: 'bold' }}>Image: </Text>
                                                <Image style={{ height: 50, width: 50 }} source={{ uri: value.imageURL }} />
                                            </View>

                                            <Text style={{ color: '#F9F9F9', fontSize: 16, fontWeight: 'bold' }}>

                                                Name:{value.myName}
                                            </Text>

                                            <Text style={{ color: '#F9F9F9', fontSize: 16, fontWeight: 'bold' }}>
                                                Phone Number:  {value.phoneNumber}
                                            </Text>

                                        </TouchableOpacity>
                                    }

                                }}

                            />
                    }



                </View>

            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    inputText: {
        borderWidth: 1,
        width: '80%',
        height: 40,
        marginTop: 10,
        marginBottom: 20,
        borderColor: colors.white,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: 15,
        color: colors.gray,
        fontSize: 14,
        alignSelf: 'center',
        elevation: 2
    },
    card: {
        backgroundColor: '#1B2430',
        // width: '90%',
        // height:50,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 20
    },
    cardContainer: {
        marginVertical: 20,
        // height: 250,
        paddingHorizontal: 10

    },
});

//make this component available to the app
export default Search;
