//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../../constants/colors';
import InputField from '../../../components/InputField';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// create a component
const AllUsers = ({ route }) => {
    const [list, setList] = useState([])
    const [value, setValue] = useState('')
    const [result, setResult] = useState([])

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
    console.log('   setList(arr)', list);

    const searchName = () => {
        let newlist = list
        let searchdata = list.filter((item) => {
            return item = myName


        })

        console.log('list is here', searchdata);
    }
    return (
        <View style={styles.container}>
            <View style={{
                marginTop: 40,

            }}>
                <View>
                    <TextInput
                        style={styles.inputText}
                        placeholderTextColor={colors.gray}
                        placeholder={'Search user'}
                        onChangeText={(e) => setValue(e)}
                        value={value}
                    />

                </View>
                {
                    result.map((result, index) => {
                        <Text style={{ color: 'black' }}>
                            {result}
                        </Text>
                    })
                }

                <View style={styles.cardContainer}>
                    <Text style={{
                        color: 'gray',
                        fontSize: 20,
                        fontWeight: 'bold',
                        paddingHorizontal: 10
                    }}>All Users</Text>
                   
                    <FlatList data={list.filter(ii =>
                        value !== ''
                            ? ii?._snapshot?.value?.myName
                                .toLocaleLowerCase()
                                .includes(value.toLocaleLowerCase())
                            : ii,
                    )}

                        renderItem={item => {
                            const cardIndex = item.index
                            if (item.item !== null) {
                                const { item: { _snapshot: { value, key } } } = item
                                return <TouchableOpacity

                                    style={styles.card}>
                                    {
                                        console.log(item)
                                    }
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#F9F9F9', fontSize: 16, paddingHorizontal: 10, fontWeight: 'bold' }}>Image: </Text>
                                        <Image style={{ height: 50, width: 50 }} source={{ uri: value.imageURL }} />
                                    </View>

                                    <Text style={{ color: '#F9F9F9', fontSize: 16, fontWeight: 'bold' }}>

                                        Name :{value.myName}
                                    </Text>

                                    <Text style={{ color: '#F9F9F9', fontSize: 16, fontWeight: 'bold' }}>
                                        Phone Number:  {value.phoneNumber}
                                    </Text>

                                </TouchableOpacity>
                            }

                        }}

                    />
                </View>
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
    inputText: {
        borderWidth: 1,
        width: '90%',
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
export default AllUsers;
