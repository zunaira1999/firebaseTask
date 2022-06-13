//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet,Platform ,Image, TouchableOpacity } from 'react-native';
import { profile } from '../../../assets';
import { colors } from '../../../constants/colors';

import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

// create a component
const Add = () => {
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

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
    const StoreUser= async()=>{
        const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

    setUploading(true)

    try {
      await storage().ref(filename).putFile(uploadUri)
      setUploading(false)
      Alert.alert(
        'Image Uploaded',
        'Your image has been uploaded to the firebase cloud storage Successfully!'
      )
    } catch (e) {
      console.log(e)
    }

    setImage(null)
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
                <Text style={styles.text}>Name: </Text>
                <Text style={styles.text}>UserName </Text>

            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Phone Number: </Text>
                <Text style={styles.text}>012345689 </Text>

            </View>
                <View style={{
                    justifyContent:'flex-end',
                    flex:0.6
                }}>
                <TouchableOpacity
                onPress={StoreUser}
                // disabled={disabled}
                style={styles.btnContainer}>
                <Text style={styles.btnText}>Store User</Text>
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
