import { ActivityIndicator, View, Text, TextInput, ScrollView, TouchableOpacity, ImageBackground, Image, Dimensions, KeyboardAvoidingView, Modal } from 'react-native'
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

export default function ReviewSummary({ route }) {
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
                <AppBar
                    color={theme.bg}
                    elevation={0}
                    title='Review Summary'
                    titleStyle={[style.apptitle, { color: theme.txt }]}
                    leading={<TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back"
                            // style={{backgroundColor:Colors.secondary,}}  
                            color={theme.txt} size={30}
                        />
                    </TouchableOpacity>
                    } />

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ padding: 5,marginTop:20 }}>
                        <View style={[style.shadow, { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.borderbg, borderRadius: 20, padding: 10 }]}>
                            <Image source={{ uri: item.image[0] }} resizeMode='stretch' style={{ height: height / 8.5, width: width / 4, borderRadius: 10 }} />
                            <View style={{ marginLeft: 10, flex: 1 }}>
                                <Text style={[style.b18, { color: theme.txt, }]}>{item.eventName}</Text>
                                <Text style={[style.r12, { color: Colors.primary, marginTop: 8 }]}>{moment.utc(item.eventDate).local().format('dddd, MMMM DD, YYYY')}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                    <Icon name='location' size={20} color={Colors.primary}></Icon>
                                    <Text style={[style.r12, { color: theme.disable2, flex: 1, marginHorizontal: 10, }]}>{item.location}</Text>

                                </View>
                            </View>
                        </View>
                    </View>

                    {/* <View style={{ paddingVertical: 15, paddingHorizontal: 5 }}>
                        <View style={[style.shadow, { backgroundColor: theme.borderbg, borderRadius: 15, padding: 15 }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Full Name</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>Andrew Ainsley</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Phone</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>+1 111 467 378 399</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Email</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>andrew_ainsley@yo...com</Text>
                            </View>
                        </View>
                    </View> */}

                    <View style={{ paddingVertical: 15, paddingHorizontal: 5 }}>
                        <View style={[style.shadow, { backgroundColor: theme.borderbg, borderRadius: 15, padding: 15 }]}>
                            {
                                ticketsPurchased.map((ticketItem, index) => (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }} key={index}>
                                        <Text style={[style.b14, { color: theme.disable2 }]}>{`${ticketItem.ticketType} Ticket(s)`}</Text>
                                        <Text style={[style.b16, { color: theme.disable1 }]}>{item.price === 0 ? (`Free Event`) : (`${ticketItem.numberOfTickets}`)}</Text>
                                    </View>
                                ))
                            }
                            
                            <View style={[style.divider, { marginVertical: 10, backgroundColor: theme.border }]}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Total</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>{`${item.currency} ${totalPrice}`}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                        {
                            loading ? (
                                <TouchableOpacity 
                                style={style.btn}>
                                    <ActivityIndicator size="small" color="#ffffff" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => navigation.navigate('Payment', { itemObj: item, ticketQuantities: ticketQuantities, totalPrice: totalPrice })}
                                style={[style.btn, ]}>
                                    <Text style={[style.btntxt, { color: Colors.secondary }]}>Pay Now</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}