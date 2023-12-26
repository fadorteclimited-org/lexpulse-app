import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, ImageBackground, Image, Dimensions, KeyboardAvoidingView, Modal } from 'react-native'
import React, { useState, useContext } from 'react'
import { Colors } from '../theme/color'
import style from '../theme/style'
import themeContext from '../theme/themeContex'
import { useNavigation } from '@react-navigation/native';
import { AppBar } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-paper'
import OtpInputs from 'react-native-otp-inputs'
import Clipboard from '@react-native-clipboard/clipboard'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function FailedBooking() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false)
    const [isvisible, setIsVisible] = useState(false)

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <View style={{ marginHorizontal: 20, marginTop: 100 }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => { setVisible(false) }}>
                            <Icon name='close' size={20} color={theme.txt} />
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../../assets/image/failed.png')} resizeMode='stretch' style={{ height: height / 5.5, width: width / 2.5, alignSelf: 'center', marginTop: 10 }} />
                    <Text style={[style.apptitle, { color: '#F75555', textAlign: 'center', marginTop: 20 }]}>Oops, Failed!</Text>
                    <Text style={[style.r16, { color: theme.txt, textAlign: 'center', marginTop: 10 }]}>Your booking failed. Please check and then try again.</Text>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('BottomNavigator') }}
                            style={style.btn}>
                            <Text style={style.btntxt}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}