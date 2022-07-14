import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView,
    Image
} from 'react-native'
import { upload } from '../../../assets'
export default function BasicInformation() {
    return (
        <SafeAreaView
            style={styles.main_container}>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={styles.text_heading}>
                        Property Tittle <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <TextInput
                        style={styles.input_text}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.text_heading}>
                                Proparty Title
                            </Text>

                            <TouchableOpacity
                                style={styles.btn_background}
                            >
                                <Text style={styles.btn_text}>
                                    sale
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '50%', }}>
                            <Text style={[styles.text_heading,]}>
                                Size
                            </Text>
                            <TextInput
                                style={styles.input_text}
                            />
                        </View>

                    </View>

                    <Text style={styles.text_heading}>
                        Sale Price <Text style={{ color: 'red' }}>*</Text>
                    </Text>

                    <TextInput
                        style={styles.input_text}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.text_heading}>
                                Advance Payment <Text style={{ color: 'red' }}>*</Text>
                            </Text>

                            <TextInput
                                style={[styles.input_text, { marginRight: 10 }]}
                            />
                        </View>
                        <View style={{ width: '50%', }}>
                            <Text style={styles.text_heading}>
                                Category <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.input_text}
                            />
                        </View>

                    </View>

                    <Text style={styles.text_heading}>
                        Category Type<Text style={{ color: 'red' }}>*</Text>
                    </Text>

                    <TextInput
                        style={styles.input_text}
                    />

                    <TouchableOpacity
                        style={[styles.btn_background, {
                            marginTop: 10,
                            width: '55%',
                            backgroundColor: '#E83D3D'

                        }]}
                    >
                        <Text style={styles.btn_text}>
                            Add Feature
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.text_heading}>
                                State <Text style={{ color: 'red' }}>*</Text>
                            </Text>

                            <TextInput
                                style={[styles.input_text, { marginRight: 10 }]}
                            />
                        </View>
                        <View style={{ width: '50%', }}>
                            <Text style={styles.text_heading}>
                                City <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.input_text}
                            />
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.text_heading}>
                            Description
                            </Text>

                            <TextInput
                                style={[styles.input_text, { marginRight: 10 }]}
                            />
                        </View>
                        <View style={{ width: '50%', }}>
                            <Text style={styles.text_heading}>
                                Address <Text style={{ color: 'red' }}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.input_text}
                            />
                        </View>

                    </View>

                    <View style={{marginTop:20,alignItems:'center'}}>
                        <Image 
                            style={styles.icon}
                            source={upload} 
                        />
                        <Text style={{
                            fontSize:27,
                            color:'#999999',
                            fontWeight:'bold',
                            marginBottom:5
                        }}>
                            Upload your photo
                        </Text>
                        <Text style={{
                            color:'#999999',
                            fontSize:18,
                            marginBottom:5
                        }}>
                            Its must be a clean photo
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.btn_background, {
                            marginTop: 10,
                            width: '55%',
                            backgroundColor: '#E83D3D',
                            alignSelf:'center',
                            marginBottom:10

                        }]}
                    >
                        <Text style={styles.btn_text}>
                            Click here to upload
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[styles.btn_background, {
                            marginTop: 30,
                            width: '55%',
                            backgroundColor: '#E83D3D',
                            alignSelf:'center',
                            marginBottom:10

                        }]}
                    >
                        <Text style={styles.btn_text}>
                            Submmit Now
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white',

    },
    content: {
        marginHorizontal: 15,
        marginTop: 40
    },
    text_heading: {
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 15,
    },
    input_text: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 3,
        backgroundColor: '#F0F8FF',
        color: 'gray',
        fontSize: 16,
        paddingHorizontal: 10,

    },
    btn_background: {
        backgroundColor: '#FFB769',
        height: 50,
        width: 100,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btn_text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    icon:{
        height:50,
        width:50,
        marginBottom:10
    }
})