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
import { ENDPOINTS } from '../api/constants';
import axios from 'axios';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function ETicket({ route }) {
    const { ticketId } = route.params;

    const theme = useContext(themeContext);
    const navigation = useNavigation();
    
    const [loading, onLoading] = useState(true);
    const [savedTicket, setSavedTicket] = useState(ticketId);
    const [ticketDetails, setTicketDetails] = useState({});

    const fetchData = async () => {
        const jsonValue = await AsyncStorage.getItem('userDetails');
        const parsedValue = JSON.parse(jsonValue);
        
        try {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedValue.token}`
                }
            };
            
            var url = `${ENDPOINTS.tickets}/${savedTicket}`;
        
            axios.get(url, config)
            .then((res) => {
                onLoading(false);
                console.log(res.data)
                setTicketDetails(res.data.data);
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

    useEffect(() => {
        const fetchDataAndHandleErrors = async () => {
            try {
                await fetchData();
            } catch (error) {
                console.log('Error in fetchData:', error);
                // Handle errors here if needed
            }
        };
    
        fetchDataAndHandleErrors();
    }, []);


    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
            <View style={[style.main, { backgroundColor: theme.bg ,marginTop:20}]}>
                <AppBar
                    color={theme.bg}
                    elevation={0}
                    title='E-Ticket'
                    titleStyle={[style.apptitle, { color: theme.txt }]}
                    leading={<TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back"
                            color={theme.txt} size={30}
                        />
                    </TouchableOpacity>
                    }
                    // trailing={<Icon name='ellipsis-horizontal-circle' size={25} color={theme.txt} />}
                />
                
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        loading ? (
                            <View style={{ width: '100%', height: '100%', paddingTop: '30%' }}>
                                <ActivityIndicator size="large" color="#584CF4" />
                            </View>
                        ) : (
                            <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
                                <View style={[style.shadow, { backgroundColor: theme.borderbg, borderRadius: 20, padding: 15 }]}>
                                    <Image source={theme.eticket} resizeMode='stretch' style={{ height: height / 2.5, width: '100%', marginTop: 15, marginBottom: 15 }} />
                                    <Text style={[style.b14, { color: theme.disable2 }]}>Event</Text>
                                    <Text style={[style.subtitle, { color: theme.txt, marginTop: 10 }]}>{ticketDetails?.eventId?.eventName}</Text>
                                    <Text style={[style.b14, { color: theme.disable2, marginTop: 10 }]}>Date</Text>
                                    <Text style={[style.subtitle, { color: theme.txt, marginTop: 10 }]}>{moment.utc(ticketDetails?.eventId?.eventDate).local().format('dddd, MMMM DD, YYYY')}</Text>
                                    <Text style={[style.b14, { color: theme.disable2, marginTop: 10 }]}>Event Location</Text>
                                    <Text style={[style.subtitle, { color: theme.txt, marginTop: 10 }]}>{ticketDetails?.eventId?.location}</Text>
                                    <Text style={[style.b14, { color: theme.disable2, marginTop: 10 }]}>Event Organizer</Text>
                                    <Text style={[style.subtitle, { color: theme.txt, marginTop: 10 }]}>{`${ticketDetails?.eventId?.eventHostId?.firstName} ${ticketDetails?.eventId?.eventHostId?.lastName}`}</Text>
                                </View>
                            </View>
                        )
                    }

                    {/* <View style={{ paddingVertical: 15, paddingHorizontal: 5 }}>
                        <View style={[style.shadow, { backgroundColor: theme.borderbg, borderRadius: 15, padding: 15 }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Full Name</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>Andrew Ainsley</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Nick Name</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>Andrew</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Gender</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>Male</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Date of birth</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>12/27/1995</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Country</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>United States</Text>
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
                    </View>

                    <View style={{ paddingVertical: 15, paddingHorizontal: 5 }}>
                        <View style={[style.shadow, { backgroundColor: theme.borderbg, borderRadius: 15, padding: 15 }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>1 Seats (Economy)</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>$50.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Tax</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>$5.00</Text>
                            </View>
                            <View style={[style.divider, { marginVertical: 10, backgroundColor: theme.border }]}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Total</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>$55.00</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingVertical: 15, paddingHorizontal: 5 }}>
                        <View style={[style.shadow, { backgroundColor: theme.borderbg, borderRadius: 15, padding: 15 }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Payment Methods</Text>
                                <Text style={[style.b16, { color: theme.disable1 }]}>MasterCard</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Order ID</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[style.b16, { color: theme.disable1 }]}>5457383979</Text>
                                    <Icon name='copy-outline' size={20} color={Colors.primary} style={{ marginLeft: 5 }} />
                                </View>
                            </View>
                            <View style={[style.divider, { marginVertical: 10, backgroundColor: theme.border }]}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[style.b14, { color: theme.disable2 }]}>Status</Text>
                                <View style={{ paddingHorizontal: 10, borderColor: Colors.primary, borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                                    <Text style={[style.b10, { color: Colors.primary }]}>Paid</Text>
                                </View>
                            </View>
                        </View>
                    </View> */}

                </ScrollView>
            </View>
            <View style={{ backgroundColor: theme.bg, paddingVertical: 20, paddingHorizontal: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, borderColor: theme.border, borderWidth: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomNavigator')}
                style={[style.btn]}>
                    <Text style={[style.btntxt]}>Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}