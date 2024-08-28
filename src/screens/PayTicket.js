import { ActivityIndicator, View, Text, TextInput, ScrollView, TouchableOpacity, ImageBackground, Image, Dimensions, KeyboardAvoidingView, Modal } from 'react-native'
import  { Paystack }  from 'react-native-paystack-webview';
import React, { useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { SafeAreaView } from 'react-native'
import moment from 'moment';
import { ENDPOINTS } from '../api/constants';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import { AuthContext } from '../../App';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function PayTicket({ route }) {
    const { itemObj, ticketQuantities, totalPrice } = route.params;

    const theme = useContext(themeContext);
    const { signOut } = React.useContext(AuthContext);
    const navigation = useNavigation();
    
    const [item, setItem] = useState(itemObj);
    const [ticketsPurchased, setTicketsPurchased] = useState(ticketQuantities);

    const [loading, onLoading] = React.useState(false);
    const [error, onError] = React.useState('');

    const saveTicket = async () => {
        const jsonValue = await AsyncStorage.getItem('userDetails');
        const parsedValue = JSON.parse(jsonValue);
        onLoading(true);

        try {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedValue.token}`
                }
            };
        
            var data = {
                "eventId": item._id,
                "attendeeId": parsedValue.user.id,
                "paymentMethod": "none",
                "ticketInfo": ticketsPurchased,
                "status": "booked"
            };
            
            var url = ENDPOINTS.tickets;
        
            axios.post(url, data, config)
            .then((res) => {
                onLoading(false);
                navigation.navigate('SuccessfulBooking', { ticketId: res.data.data._id });
            })
            .catch(error => {
            
            if (error.response) {
                if(error.response.status === 403) {
                    signOut();
                    return;
                }

                onLoading(false);
                onError(error.response.data.error);
                navigation.navigate('FailedBooking');
            } else if (error.request) {
                console.log(error.request);
                onLoading(false);
                onError('Problem signing in. Please try later!');
                navigation.navigate('FailedBooking');
            } else {
                console.log(error);
                onLoading(false);
                onError('Problem signing in. Please try later!');
                navigation.navigate('FailedBooking');
            }
            });
            
        } catch (error) {
            onLoading(false);
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
            <View style={[style.main, { backgroundColor: theme.bg ,marginTop:20}]}>
                <Paystack  
                    paystackKey="pk_live_7531b0888eb0df5935732db49e74f555695adb73"
                    amount={totalPrice}
                    billingEmail="fadorteclimited@gmail.com"
                    activityIndicatorColor="green"
                    onCancel={(e) => {
                        // handle response here
                        console.log(e)
                    }}
                    onSuccess={(res) => {
                        // handle response here
                    }}
                    autoStart={true}
                />
            </View>
        </SafeAreaView>
    )
}