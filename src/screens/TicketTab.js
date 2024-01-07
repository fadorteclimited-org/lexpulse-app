import { ActivityIndicator, View, Text, SafeAreaView, TextInput, StatusBar, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar, } from '@react-native-material/core';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import All from './All';
import { ENDPOINTS } from '../api/constants';
import axios from 'axios';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import { color } from 'react-native-elements/dist/helpers';
import { AuthContext } from '../../App';

const Tab = createMaterialTopTabNavigator();

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                // tabBarStyle: { height:50,marginVertical:30,marginHorizontal:2},
                tabBarLabelStyle: {
                    fontSize: 15,
                },
                tabBarShowLabel: true,
                tabBarItemStyle: { marginHorizontal: -10 },
                tabBarIndicatorStyle: { backgroundColor: Colors.primary },
                swipeEnabled:false,

            }}>
            <Tab.Screen name="Upcoming" component={Upcoming}
                options={{
                    tabBarShowLabel: true,
                    tabBarLabel: ({ focused, color, }) => (
                        <Text style={{ color: focused ? Colors.primary : Colors.disable, fontFamily: 'Urbanist-Regular', textAlign: 'center', fontSize: 16 }}>Upcoming</Text>
                    ),
                    headerShown: false,
                }} />
            <Tab.Screen name="Completed" component={Completed}
                options={{
                    tabBarShowLabel: true,
                    tabBarLabel: ({ focused, color, }) => (
                        <Text style={{ color: focused ? Colors.primary : Colors.disable, fontFamily: 'Urbanist-Regular', textAlign: 'center', fontSize: 16 }}>Completed</Text>
                    ),
                    headerShown: false,
                }} />
            {/* <Tab.Screen name="Cancelled" component={Cancelled}
                options={{
                    tabBarShowLabel: true,
                    tabBarLabel: ({ focused, color, }) => (
                        <Text style={{ color: focused ? Colors.primary : Colors.disable, fontFamily: 'Urbanist-Regular', textAlign: 'center', fontSize: 16 }}>Cancelled</Text>
                    ),
                    headerShown: false,
                }} /> */}
        </Tab.Navigator>
    )
}

const Upcoming = () => {

    const theme = useContext(themeContext);
    const { signOut } = React.useContext(AuthContext);
    const navigation = useNavigation();
    const [loading, onLoading] = useState(true);
    const [error, onError] = useState('');
    const [list, setList] = useState([]);

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
            
            var url = `${ENDPOINTS.tickets}/user/${parsedValue.user.id}/booked`;
        
            axios.get(url, config)
            .then((res) => {
                onLoading(false);
                setList(res.data.data);
            })
            .catch(error => {
                console.log(error);
                
                if (error.response) {
                    if(error.response.status === 403) {
                        signOut();
                        return;
                    }
    
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
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg, paddingTop: 10 }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{height:height/1.5}}>
            {
                loading ? (
                    <View style={{ width: '100%', height: '100%', paddingTop: '30%' }}>
                        <ActivityIndicator size="large" color="#584CF4" />
                    </View>
                ) : (
                    <>
                    {
                        list.length > 0 ? (
                            list.map((item, index) => (
                                <View style={{ padding: 5, marginTop: 10 }} key={index}>
                                    <View style={[style.shadow, { backgroundColor: theme.borderbg, backgroundColor: theme.borderbg, borderRadius: 20, padding: 10 }]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <Image source={{ uri: item?.eventId?.image[0] }} resizeMode='stretch' style={{ height: height / 8.5, width: width / 3.6, borderRadius: 10 }} />
                                            <View style={{ marginLeft: 10, }}>
                                                <Text style={[style.b18, { color: theme.txt, }]}>{item?.eventId?.eventName}</Text>
                                                <Text style={[style.r12, { color: Colors.primary, marginTop: 8 }]}>{moment.utc(item?.eventId?.eventDate).local().format('dddd, MMMM DD, YYYY')}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                                    <Icon name='location' size={20} color={Colors.primary}></Icon>
                                                    <Text style={[style.r12, { color: theme.disable2, flex: 1, marginHorizontal: 5, }]}>{item?.eventId?.location}</Text>
                                                    <TouchableOpacity style={{ borderColor: Colors.primary, borderWidth: 1, paddingHorizontal: 10, paddingBottom: 6, borderRadius: 10, paddingTop: 4 }}>
                                                        <Text style={[style.r10, { color: Colors.primary }]}>{item.status}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[style.divider, { backgroundColor: theme.border, marginVertical: 15 }]}></View>
                                        <View style={{ flexDirection: 'row', }}>
                                            {/* <TouchableOpacity onPress={() => this.RBSheet6.open()}
                                                style={[style.btn, { flex: 1, backgroundColor: theme.borderbg, paddingVertical: 8,borderColor:Colors.primary,borderWidth:1 }]}>

                                                <RBSheet ref={ref => {
                                                    this.RBSheet6 = ref;
                                                }}
                                                    height={300}
                                                    openDuration={100}
                                                    customStyles={{
                                                        container: {
                                                            borderTopRightRadius: 20,
                                                            borderTopLeftRadius: 20,
                                                            backgroundColor: theme.bg
                                                        }
                                                    }}>
                                                    <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                                                        <Text style={[style.apptitle, { textAlign: 'center', color: theme.txt }]}>Cancel Booking</Text>
                                                        <View style={[style.divider, { marginVertical: 15, backgroundColor: theme.border }]}></View>
                                                        <Text style={[style.apptitle, { textAlign: 'center', color: theme.txt }]}>Are you sure you want to cancel this event?</Text>
                                                        <Text style={[style.r16, { textAlign: 'center', color: theme.txt, marginTop: 15 }]}>Only 80% of funds will be returned to your account according to our policy.</Text>
                                                        <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <View style={{ flex: 1 }}>
                                                                <TouchableOpacity onPress={() => this.RBSheet6.close()}
                                                                    style={[style.btn, { backgroundColor: theme.btn }]}>
                                                                    <Text style={[style.btntxt, { color: Colors.primary }]}>No, Don't Cancel</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={{ marginHorizontal: 10 }}></View>
                                                            <View style={{ flex: 1 }}>
                                                                <TouchableOpacity onPress={() => {this.RBSheet6.close(),navigation.navigate('Cancelreason')}}
                                                                style={[style.btn,]}>
                                                                    <Text style={[style.btntxt, { color: Colors.secondary }]}>Yes, Cancel</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </RBSheet>
                                                <Text style={[style.btntxt, { color: Colors.primary, fontSize: 14 }]}>Cancel Booking</Text>
                                            </TouchableOpacity>
                                            <View style={{ margin: 5 }}></View> */}
                                            <TouchableOpacity onPress={() => navigation.navigate('ETicket', { ticketId: item._id })}
                                                style={[style.btn, { flex: 1, paddingVertical: 8 }]}>
                                                <Text style={[style.btntxt, { fontSize: 14 }]}>View E-Ticket</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={{ height: '80%', width: '100%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/noevents.png')} resizeMode='stretch' style={{width:width/1.5, height:height/4.2, marginTop: '30%' }}></Image>
                            </View>
                        )
                    }
                    </>
                )
            }

            {/* <View style={{ padding: 5, marginTop: 10 }}>
                <View style={[style.shadow, { backgroundColor: theme.borderbg, backgroundColor: theme.borderbg, borderRadius: 20, padding: 10 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image source={require('../../assets/image/u2.png')} resizeMode='stretch' style={{ height: height / 8.5, width: width / 3.6 }} />
                        <View style={{ marginLeft: 10, }}>
                            <Text style={[style.b18, { color: theme.txt, }]}>Art & Mural Worksh...</Text>
                            <Text style={[style.r12, { color: Colors.primary, marginTop: 8 }]}>Wed, Dec 27 • 14.00 - 16.00 PM</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                <Icon name='location' size={20} color={Colors.primary}></Icon>
                                <Text style={[style.r12, { color: theme.disable2, flex: 1, marginHorizontal: 5, }]}>Central Art, Was...</Text>
                                <TouchableOpacity style={{ borderColor: Colors.primary, borderWidth: 1, paddingHorizontal: 10, paddingBottom: 6, borderRadius: 10, paddingTop: 4 }}>
                                    <Text style={[style.r10, { color: Colors.primary }]}>Paid</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[style.divider, { backgroundColor: theme.border, marginVertical: 15 }]}></View>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity onPress={() => this.RBSheet6.open()}
                            style={[style.btn, { flex: 1, backgroundColor: theme.borderbg, paddingVertical: 8 ,borderColor:Colors.primary,borderWidth:1}]}>
                            <Text style={[style.btntxt, { color:Colors.primary, fontSize: 14 }]}>Cancel Booking</Text>
                        </TouchableOpacity>
                        <View style={{ margin: 5 }}></View>
                        <TouchableOpacity onPress={() => navigation.navigate('ETicket')}
                            style={[style.btn, { flex: 1, paddingVertical: 8 }]}>
                            <Text style={[style.btntxt, { fontSize: 14 }]}>View E-Ticket</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const Completed = () => {

    const theme = useContext(themeContext);
    const { signOut } = React.useContext(AuthContext);
    const navigation = useNavigation();
    const [loading, onLoading] = useState(true);
    const [error, onError] = useState('');
    const [list, setList] = useState([]);

    const [L1, setL1] = useState(false);
    const [L2, setL2] = useState(false);
    const [L3, setL3] = useState(false);
    const [L4, setL4] = useState(false);
    const [L5, setL5] = useState(false);

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
            
            var url = `${ENDPOINTS.tickets}/user/${parsedValue.user.id}/completed`;
        
            axios.get(url, config)
            .then((res) => {
                onLoading(false);
                setList(res.data.data);
            })
            .catch(error => {
                console.log(error);
                
                if (error.response) {
                    if(error.response.status === 403) {
                        signOut();
                        return;
                    }
    
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
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg, paddingTop: 10 }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{height:height/1.5}}>
            {
                loading ? (
                    <View style={{ width: '100%', height: '100%', paddingTop: '30%' }}>
                        <ActivityIndicator size="large" color="#584CF4" />
                    </View>
                ) : (
                    <>
                    {
                        list.length > 0 ? (
                            list.map((item, index) => (
                                <View style={{ padding: 5, marginTop: 10 }} key={index}>
                                    <View style={[style.shadow, { backgroundColor: theme.borderbg, backgroundColor: theme.borderbg, borderRadius: 20, padding: 10 }]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <Image source={{ uri: item?.eventId?.image[0] }} resizeMode='stretch' style={{ height: height / 8.5, width: width / 3.6, borderRadius: 10 }} />
                                            <View style={{ marginLeft: 10, }}>
                                                <Text style={[style.b18, { color: theme.txt, }]}>{item?.eventId?.eventName}</Text>
                                                <Text style={[style.r12, { color: Colors.primary, marginTop: 8 }]}>{moment.utc(item?.eventId?.eventDate).local().format('dddd, MMMM DD, YYYY')}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                                    <Icon name='location' size={20} color={Colors.primary}></Icon>
                                                    <Text style={[style.r12, { color: theme.disable2, flex: 1, marginHorizontal: 5, }]}>{item?.eventId?.location}</Text>
                                                    <TouchableOpacity style={{ borderColor: '#07BD74', borderWidth: 1, paddingHorizontal: 7, paddingBottom: 6, borderRadius: 10, paddingTop: 4 }}>
                                                        <Text style={[style.r10, { color: '#07BD74' }]}>{item.status}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[style.divider, { backgroundColor: theme.border, marginVertical: 15 }]}></View>
                                        <View style={{ flexDirection: 'row', }}>
                                            {/* <TouchableOpacity onPress={() => this.RBSheet5.open()}
                                                style={[style.btn, { flex: 1, backgroundColor: theme.borderbg, paddingVertical: 8 ,borderColor:Colors.primary,borderWidth:1}]}>
                                                <RBSheet ref={ref => {
                                                    this.RBSheet5 = ref;
                                                }}
                                                    height={500}
                                                    openDuration={100}
                                                    customStyles={{
                                                        container: {
                                                            borderTopRightRadius: 20,
                                                            borderTopLeftRadius: 20,
                                                            backgroundColor: theme.bg
                                                        }
                                                    }}>
                                                    <View style={{ marginHorizontal: 20, marginTop: 15 }}>
                                                        <Text style={[style.apptitle, { textAlign: 'center', color: theme.txt }]}>Leave a Review</Text>
                                                        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                                                            <View style={[style.divider, { marginVertical: 15, backgroundColor: theme.border }]}></View>
                                                            <Text style={[style.apptitle, { textAlign: 'center', color: theme.txt }]}>How was your experience with Art & Painting Training?</Text>
                                                            <View style={[style.divider, { marginVertical: 15, backgroundColor: theme.border }]}></View>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                                <TouchableOpacity onPress={() => setL1(!L1)}>
                                                                    <Icon name={L1 ? 'star' : 'star-outline'} color={Colors.primary} size={30} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() => setL2(!L2)}>
                                                                    <Icon name={L2 ? 'star' : 'star-outline'} color={Colors.primary} size={30} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() => setL3(!L3)}>
                                                                    <Icon name={L3 ? 'star' : 'star-outline'} color={Colors.primary} size={30} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() => setL4(!L4)}>
                                                                    <Icon name={L4 ? 'star' : 'star-outline'} color={Colors.primary} size={30} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() => setL5(!L5)}>
                                                                    <Icon name={L5 ? 'star' : 'star-outline'} color={Colors.primary} size={30} />
                                                                </TouchableOpacity>

                                                            </View>
                                                            <View style={[style.divider, { marginVertical: 15, backgroundColor: theme.border }]}></View>
                                                            <Text style={[style.apptitle, { color: theme.txt }]}>Write your Review</Text>
                                                            <View style={[style.txtinput, { borderColor: theme.border, backgroundColor: theme.btn, marginTop: 15, height: 100, }]}>
                                                                <TextInput placeholder='Your review here..' placeholderTextColor={Colors.disable} selectionColor={Colors.primary}
                                                                    multiline={true}

                                                                    style={[style.r14, { color: theme.txt, textAlignVertical: 'top' }]} />
                                                            </View>
                                                            <View style={[style.divider, { marginVertical: 15, backgroundColor: theme.border }]}></View>
                                                            <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between',marginBottom:50 }}>
                                                                <View style={{ flex: 1 }}>
                                                                    <TouchableOpacity onPress={() => this.RBSheet5.close()}
                                                                        style={[style.btn, { backgroundColor: theme.btn }]}>
                                                                        <Text style={[style.btntxt, { color: Colors.primary }]}>Maybe Later</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                                <View style={{ marginHorizontal: 10 }}></View>
                                                                <View style={{ flex: 1 }}>
                                                                    <TouchableOpacity 
                                                                    style={[style.btn,]}>
                                                                        <Text style={[style.btntxt, { color: Colors.secondary }]}>Submit</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </ScrollView>
                                                    </View>
                                                </RBSheet>
                                                <Text style={[style.btntxt, { color: Colors.primary, fontSize: 14 }]}>Leave a Review</Text>


                                            </TouchableOpacity>
                                            <View style={{ margin: 5 }}></View> */}
                                            <TouchableOpacity onPress={() => navigation.navigate('ETicket', { ticketId: item._id })}
                                                style={[style.btn, { flex: 1, paddingVertical: 8 }]}>
                                                <Text style={[style.btntxt, { fontSize: 14 }]}>View E-Ticket</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={{ height: '80%', width: '100%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/noevents.png')} resizeMode='stretch' style={{width:width/1.5, height:height/4.2, marginTop: '30%' }}></Image>
                            </View>
                        )
                    }
                    </>
                )
            }
            </ScrollView>
        </SafeAreaView>
    )
}

const Cancelled = () => {

    const theme = useContext(themeContext);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg, paddingTop: 10 }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{height:height/1.2}}>
            <View style={{ padding: 5, marginTop: 10 }}>
                <View style={[style.shadow, { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.borderbg, borderRadius: 20, padding: 10 }]}>
                    <Image source={require('../../assets/image/t1.png')} resizeMode='stretch' style={{ height: height / 8.5, width: width / 3.6 }} />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                        <Text style={[style.b18, { color: theme.txt, }]}>Traditional Dance Fe...</Text>
                        <Text style={[style.r12, { color: Colors.primary, marginTop: 8 }]}>Tue, Dec 16 • 18.00 - 22.00 PM</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                            <Icon name='location' size={20} color={Colors.primary}></Icon>
                            <Text style={[style.r12, { color: theme.disable2, flex: 1, marginHorizontal: 5, }]}>New Avenue...</Text>
                            <TouchableOpacity style={{ borderColor: '#F75555', borderWidth: 1, paddingHorizontal: 7, paddingBottom: 6, borderRadius: 10, paddingTop: 4 }}>
                                <Text style={[style.r10, { color: '#F75555' }]}>cancelled</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            
            </ScrollView>
        </SafeAreaView>
    )
}


export default function TicketTab() {

    const theme = useContext(themeContext);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg, }]}>
            <View style={[style.main, { backgroundColor: theme.bg ,marginTop:20}]}>


                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, }}>

                    <View >
                        <Avatar source={require('../../assets/image/logo1.png')}
                            size={40}></Avatar>
                    </View>

                    <Text style={[style.apptitle, { color: theme.txt, flex: 1, marginLeft: 10 }]}>Tickets</Text>

                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Messagedelete')}>
                            <Icon name='search' size={30} color={theme.txt}></Icon>
                        </TouchableOpacity>

                        <View style={{ margin: 10 }}></View>
                        <TouchableOpacity onPress={() => navigation.navigate('MessageN')}>
                            <Icon name="ellipsis-horizontal-circle" color={theme.txt} size={30} />
                        </TouchableOpacity>

                    </View> */}

                </View>

                <Tabs></Tabs>

            </View>
        </SafeAreaView>
    )
}