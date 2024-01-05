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
import { ENDPOINTS } from '../api/constants';
import axios from 'axios';
import moment from 'moment';
import { Avatar } from 'react-native-paper'
import OtpInputs from 'react-native-otp-inputs'
import Clipboard from '@react-native-clipboard/clipboard'
import { SafeAreaView } from 'react-native'
import { AuthContext } from '../../App';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function Notification2() {
    const theme = useContext(themeContext);
    const { signOut } = React.useContext(AuthContext);
    const navigation = useNavigation();
    const [iconsStuff, setIconsStuff] = useState([]);
    
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
            
            var url = `${ENDPOINTS.notifications}?userId=${parsedValue.user.id}`;
        
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
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
            <View style={[style.main, { backgroundColor: theme.bg,marginTop:20 }]}>
                <AppBar
                    color={theme.bg}
                    elevation={0}
                    title='Notifications'
                    titleStyle={[style.apptitle, { color: theme.txt }]}
                    leading={<TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back"
                            // style={{backgroundColor:Colors.secondary,}}  
                            color={theme.txt} size={30}
                        />
                    </TouchableOpacity>
                    }
                    // trailing={<Icon name='ellipsis-horizontal-circle' size={30} color={theme.txt} />}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        loading ? (
                            <View style={{ width: '100%', height: '100%', paddingTop: '30%' }}>
                                <ActivityIndicator size="large" color="#584CF4" />
                            </View>
                        ) : (
                            
                            list.length > 0 ? (

                                list.map((item, index) => (
                                    <View key={index}>
                                        <View style={{ flexDirection: 'row', marginTop: 20 ,alignItems:'center'}}>
                                            {
                                                item.notificationType === "services" ? (
                                                    <Avatar.Icon 
                                                        icon='account'
                                                        size={50} 
                                                        style={{ backgroundColor: '#22BB9C20' }} color='#22BB9C' />
                                                ) : (
                                                    null
                                                )
                                            }

                                            {
                                                item.notificationType === "booking" ? (
                                                    <Avatar.Icon 
                                                        icon='calendar-month-outline'
                                                        size={50} 
                                                        style={{ backgroundColor: theme.btn }} 
                                                        color={Colors.primary} />
                                                ) : (
                                                    null
                                                )
                                            }

                                            {
                                                item.notificationType === "payment" ? (
                                                    <Avatar.Icon 
                                                        icon='wallet'
                                                        size={50} 
                                                        style={{ backgroundColor: '#246BFD20' }} color='#246BFD' />
                                                ) : (
                                                    null
                                                )
                                            }

                                            {
                                                item.notificationType === "points" ? (
                                                    <Avatar.Icon 
                                                        icon='ticket'
                                                        size={50} 
                                                        style={{ backgroundColor: '#FB940020' }} color='#FB9400' />
                                                ) : (
                                                    null
                                                )
                                            }
                                            
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={[style.subtitle, { color: theme.txt }]}>{item.title}</Text>
                                                <Text style={[style.r16, { color: theme.txt ,marginTop:5}]}>{moment.utc(item.createdAt).local().format('MMM DD, YYYY, hh:mm A')}</Text>
                                            </View>
                                            {/* <View style={{flex:1,alignItems:'flex-end'}}>
                                                <TouchableOpacity style={{paddingVertical:3,backgroundColor:Colors.primary,borderRadius:5,paddingHorizontal:7,alignItems:'center'}}>
                                                <Text style={[style.r12, { color: Colors.secondary ,textAlign:'center'}]}>New</Text>
                                                </TouchableOpacity>
                                            </View> */}
                                        </View>
                                        <Text style={[style.r14, { color: theme.disable1,marginTop:10}]}>{item.message}</Text>
                                    </View>
                                ))

                            ) : (
                                <View style={{ height: '80%', width: '100%', alignItems: 'center' }}>
                                    <Image source={require('../../assets/image/noevents.png')} resizeMode='stretch' style={{width:width/1.5, height:height/4.2, marginTop: '30%' }}></Image>
                                </View>
                            )
                        )
                    }

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}