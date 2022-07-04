//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Image, TouchableOpacity, Alert, SnapshotViewIOSBase } from 'react-native';
import { profile, logout } from '../../../assets';
import { colors } from '../../../constants/colors';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import storage from '@react-native-firebase/storage';

import ImagePicker from 'react-native-image-crop-picker';
import { routes } from '../../../constants/routes';

// create a component
const Add = ({ navigation, route, cardIndex }) => {
    // const user_name = navigation.getParam('userName');
    const { myName, phoneNumber, uid } = route.params;
    const [nameExist,setNameExist] = useState()
    const [list, setList] = useState('')
    // console.log(route)
    const [url, setUrl] = useState()
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        getDatabase();
    }, [])

    const getDatabase = async () => {
        try {


            // const index = list.length
            // const data = await database().ref('todo').once('value');
            const data = await 
            database()
            .ref(`users`)
            .child(auth().currentUser.uid)
            .once('value', snapshot=> {
                 if(snapshot.exists()){
                    let newnam =snapshot.val().myName

                    setNameExist(newnam)
                    console.log('name = ', newnam)
                 }
            })
            
            
            
            // tempData => {

            //     setList(tempData.val());
                
                console.log( data)
            // })

        } catch (e) {
            console.log(e)
        }
    }


    const choosePhotoFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            const imagUri = Platform.OS === 'ios' ? image.sourceURL : image.path
            setImage(imagUri)
            console.log(imagUri)
        });
    }


    // useEffect(() => {
    //     getIamge();
    // }, [])


    // const getIamge = async () => {
    //     try {
    //         const imgurl = await storage().ref(`/d5760d3d-757b-4707-9392-5a7ffa4b6eed.jpg`).getDownloadURL()
    //         console.log(url)
    //         setUrl(imgurl)
    //         // const storage=getStorage()       
    //         // const refrence= ref(storage,'/d5760d3d-757b-4707-9392-5a7ffa4b6eed.jpg')
    //         // await getDownloadURL(refrence).then((x)=>{
    //         //     setUrl(x)
    //         // }) 
    //     } catch (error) {
    //         console.log(error)
    //     }


    // }


    const StoreUser = async () => {
        const uploadUri = image;
        //   let imageUri =   setImage({uri: uploadUri.uri})

        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

        setUploading(true)

        try {
            // const index = list.length
            // .child(auth().currentUser.uid)
            await storage().ref(filename).putFile(uploadUri)
            setUploading(false)


            const n = await database().ref('users')
                .child(auth().currentUser.uid)
                .once('value', snapshot => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val())
                       let nam = snapshot.val().myName
                       setNameExist(nam)
                       console.log('user name', nameExist)
                        if (nam) 
                        {
                            const response = database().ref(`users`)
                                .child(auth().currentUser.uid).update({
                                    // myName: nam,
                                    // phoneNumber,
                                    imageURL: image ? image : '' ,
                                    // userId: auth().currentUser.uid
                                    //  filename
                                })
                                console.log(response)
                                Alert.alert(
                                    'User Saved',
                                    'User has been store to the real time database Successfully!'
                                )
                                
                        }



                        console.log(nam)
                    } else {
                        
                        const response =  database().ref(`users`)
                            .child(auth().currentUser.uid).update({
                                myName,
                                phoneNumber,
                                imageURL: image ? image :'',
                                userId: auth().currentUser.uid,
                               
                                //  filename
                            })
                            console.log(response)
                            Alert.alert(
                                'User Saved',
                                'User has been store to the real time database Successfully!'
                            )
                    }

                })


            // const response = await database().ref(`users/${index}`).set({
            // const response = await database().ref(`users`)
            //     .child(auth().currentUser.uid).set({
            //         myName,
            //         phoneNumber,
            //         imageURL: image,
            //         userId: uid
            //         //  filename
            //     })




            // Alert.alert(
            //     'User Saved',
            //     'User has been store to the real time database Successfully!'
            // )
            // console.log(response)
            // navigation.navigate(routes.details,{ image: `${imageURL}` })
        } catch (e) {
            console.log(e)
        }

        //   await storage().ref(filename).putFile(uploadUri)
        //   setUploading(false)
        //   Alert.alert(
        //     'Image Uploaded',
        //     'Your image has been uploaded to the firebase cloud storage Successfully!'
        //   )
        // } catch (e) {
        //   console.log(e)
        // }

        // setImage(null)


    }
    const userSignout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));

        navigation.navigate(routes.signin)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={choosePhotoFromGallery}
                style={{
                    height: 100,
                    marginTop: 40,
                    borderRadius: 50,
                    marginBottom: 20,
                    alignItems: 'center',
                }}>
                {
                    image !== null
                        ?
                        <Image style={[styles.profileLogo, { borderRadius: 50 }]} source={{
                            uri: image
                        }} />
                        : <Image style={styles.profileLogo} source={profile} />
                }

            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Name:  </Text>

                <Text style={styles.text}>{myName ? myName : nameExist}  </Text>

            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Phone Number: </Text>
                <Text style={styles.text}>{phoneNumber} </Text>

            </View>


            <View style={{
                justifyContent: 'flex-end',
                flex: 0.6,
                paddingVertical: 10,
            }}>
                <TouchableOpacity
                    onPress={StoreUser}
                    // disabled={disabled}
                    style={styles.btnContainer}>
                    <Text style={styles.btnText}>Update User</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => userSignout()}
                    style={[styles.btnContainer, { marginTop: 10 }]}>
                    <Text style={styles.btnText}>Logout</Text>
                </TouchableOpacity>


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
    profileLogo: {

        height: 100,
        width: 100
    },
    textContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'gray',
        fontSize: 20,
        fontWeight: 'bold',

    },
    btnContainer: {
        // flex: 1,
        borderWidth: 1,
        borderColor: colors.black,
        backgroundColor:'white',
        height: 40,
        marginHorizontal: 30,
        justifyContent: 'center',
        // alignItems: 'flex-end' ,
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
export default Add;
