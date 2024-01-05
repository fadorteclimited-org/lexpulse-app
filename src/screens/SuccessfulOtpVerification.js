import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, ImageBackground, Image, Dimensions, KeyboardAvoidingView, Modal } from 'react-native'
import React, { useState, useContext } from 'react'
import { Colors } from '../theme/color'
import style from '../theme/style'
import themeContext from '../theme/themeContex'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../App';
import { AppBar } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-paper'
import OtpInputs from 'react-native-otp-inputs'
import Clipboard from '@react-native-clipboard/clipboard'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function SuccessfulOtpVerification() {
    const theme = useContext(themeContext);
    const { successfulOtpHome } = React.useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <View style={{ marginHorizontal: 20, marginTop: 100 }}>
                    
                    <Image source={require('../../assets/image/congrats1.png')} resizeMode='stretch' style={{ height: height / 5.5, width: width / 2.5, alignSelf: 'center', marginTop: 10 }} />
                    <Text style={[style.apptitle, { color: Colors.primary, textAlign: 'center', marginTop: 20 }]}>Congratulations!</Text>
                    <Text style={[style.r16, { color: theme.txt, textAlign: 'center', marginTop: 10 }]}>You have successfully been verified! Click the button to go to your home.</Text>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={() => successfulOtpHome()}
                            style={style.btn}>
                            <Text style={style.btntxt}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}