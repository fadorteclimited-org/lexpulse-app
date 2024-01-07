import { ActivityIndicator, View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, ImageBackground, Image, Dimensions, KeyboardAvoidingView } from 'react-native'
import React, { useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../theme/color'
import style from '../theme/style'
import themeContext from '../theme/themeContex'
import { useNavigation } from '@react-navigation/native';
import { AppBar } from '@react-native-material/core';
import { ENDPOINTS } from '../api/constants';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import OtpInputs from 'react-native-otp-inputs'
import Clipboard from '@react-native-clipboard/clipboard'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function OtpVerification({ route }) {
    const { email, fromRoute } = route.params;
    const theme = useContext(themeContext);
    const navigation = useNavigation();

    const [loading, onLoading] = React.useState(false);
    const [sendCodeLoading, onSendCodeLoading] = React.useState(false);
    const [error, onError] = React.useState('');
    const [code, onChangeCode] = React.useState('');

    const verifyCode = async () => {
        onLoading(true);

        if(code === '') {
          onError('Please enter code');
          onLoading(false);
          return;
        }

        try {

          var config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
      
          var data = {
            "email": email,
            "code": code
          };
          
          var url = `${ENDPOINTS.login}/confirm-code`;
      
          axios.post(url, data, config)
          .then(async (res) => {
            onLoading(false);
            if(fromRoute === 'profile') {
              const jsonValue = JSON.stringify(res.data);
  
              await AsyncStorage.setItem('userDetails', jsonValue);
              navigation.navigate('SuccessfulOtpVerification');
            }
            else if(fromRoute === 'forgotPassword') {
                navigation.navigate('NewPass', { email: email });
            }
          })
          .catch(error => {
            console.log(error);
            
            if (error.response) {
              onLoading(false);
              onError(error.response.data.msg);
            } else if (error.request) {
              console.log(error.request);
              onLoading(false);
              onError('Problem signing in. Please try later!');
            } else {
              onLoading(false);
              onError('Problem signing in. Please try later!');
            }
          });
          
        } catch (error) {
          onLoading(false);
          console.log(error);
        }
      };

      const sendCode = () => {
        onSendCodeLoading(true);

        try {
          var config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
      
          var data = {
            "email": email
          };
          
          var url = `${ENDPOINTS.login}/reset-password`;
      
          axios.post(url, data, config)
          .then(async (res) => {
            onSendCodeLoading(false);
          })
          .catch(error => {
            console.log(error);
            
            if (error.response) {
              onSendCodeLoading(false);
              onError(error.response.data.msg);
            } else if (error.request) {
              console.log(error.request);
              onSendCodeLoading(false);
              onError('Problem signing in. Please try later!');
            } else {
              onSendCodeLoading(false);
              onError('Problem signing in. Please try later!');
            }
          });
          
        } catch (error) {
          onLoading(false);
          console.log(error);
        }
      };

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <View style={[style.main, { backgroundColor: theme.bg ,marginTop:20}]}>
                    <AppBar
                        color={theme.bg}
                        elevation={0}
                        title='OTP Code Verification'
                        titleStyle={[style.apptitle, { color: theme.txt }]}
                        leading={<TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back"
                                // style={{backgroundColor:Colors.secondary,}}  
                                color={theme.txt} size={30}
                            />
                        </TouchableOpacity>
                        } />

                    <Text style={[style.b18, { color: theme.txt, marginTop: 80, textAlign: 'center' }]}>Code has been send to your email address. Kindly check and type it in.</Text>
                    <View style={{ paddingTop: 50 }}>
                        <OtpInputs
                            Clipboard={Clipboard}
                            numberOfInputs={4}
                            selectionColor={Colors.primary}
                            handleChange={(code) => onChangeCode(code)}
                            style={{ flexDirection: 'row', justifyContent: 'space-evenly', }}
                            inputStyles={{

                                borderColor: Colors.primary,
                                backgroundColor: theme.input,
                                borderRadius: 10,
                                textAlign: 'center',
                                height: 45,
                                width: 55,
                                fontSize: 20,
                                borderWidth: 1,
                                color: theme.txt,
                                fontWeight: 'bold',

                            }}
                        />
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',paddingTop:30,marginBottom:10, marginHorizontal: 50}}>
                        <Text style={[style.b14, {color:theme.txt}]}>Didn't receive code or code expired? </Text>
                        {
                          sendCodeLoading ? (
                            <View>
                                <Text style={[style.b14, { color:Colors.primary }]}>Sending...</Text>
                            </View>
                          ) : (
                            <TouchableOpacity onPress={() => sendCode()}>
                                <Text style={[style.b14, { color:Colors.primary }]}>Get new code.</Text>
                            </TouchableOpacity>
                          )
                        }
                        
                    </View>

                    <View style={{flex:1,justifyContent:'flex-end',marginBottom:20 }}>
                        {
                            error && error.length > 0 ? (
                                <Text style={{ color: 'red', marginTop: 20, textAlign: 'center' }}>{error}</Text>
                            ) : (
                                null
                            )
                        }
                        {
                            loading ? (
                                <View style={{marginTop:100,marginBottom:20}}>
                                    <TouchableOpacity style={style.btn}>
                                        <ActivityIndicator size="small" color="#ffffff" />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={{marginTop:130,marginBottom:20}}>
                                    <TouchableOpacity onPress={() => verifyCode()} style={style.btn}>
                                        <Text style={style.btntxt}>Verify</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}