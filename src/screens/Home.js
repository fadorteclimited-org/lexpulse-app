import { ActivityIndicator, View, Text ,SafeAreaView, ImageBackground,TextInput, StatusBar,TouchableOpacity,Image,ScrollView,Dimensions} from 'react-native'
import React,{useState, useContext, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar,} from '@react-native-material/core';
import  Icon  from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';
import { ENDPOINTS } from '../api/constants';
import axios from 'axios';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import { color } from 'react-native-elements/dist/helpers';
import TopNavigator from '../navigator/TopNavigator';
// import Demo from './Demo';
const width =Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function Home() {

    const theme = useContext(themeContext);
    const navigation = useNavigation();

    const [userDets, setUserDets] = useState({});

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Ghana', value: 'Ghana'},
        {label: 'Kenya', value: 'Kenya'},
        {label: 'Nigeria', value: 'Nigeria'},
        {label: 'South Africa', value: 'South Africa'}
    ]);
    
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
            
            var url = `${ENDPOINTS.events + (parsedValue.user.country ? (`?country=${parsedValue.user.country}`) : (``))}`;
        
            axios.get(url, config)
            .then((res) => {
                onLoading(false);
                setList(res.data.data);
                setValue(parsedValue.user.country);
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

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('userDetails');
                const parsedValue = JSON.parse(jsonValue);

                setUserDets(parsedValue);
            } catch (error) {
                console.log('Error in fetchData:', error);
                // Handle errors here if needed
            }
        };
    
        fetchUserDetails();
    }, []);

    const getNewCountryEvents = async (country) => {
        onLoading(true);
        const jsonValue = await AsyncStorage.getItem('userDetails');
        const parsedValue = JSON.parse(jsonValue);
        
        try {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedValue.token}`
                }
            };
            
            var url = `${ENDPOINTS.events + (country.value ? (`?country=${country.value}`) : (``))}`;
        
            axios.get(url, config)
            .then((res) => {
                onLoading(false);
                setList(res.data.data);
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

    const [T1, setT1] = useState(false)
    const [T2, setT2] = useState(false)
    const [T3, setT3] = useState(false)
    const [T4, setT4] = useState(false)
    const [T5, setT5] = useState(false)
    const [T6, setT6] = useState(false)

  return (
    <SafeAreaView style={[style.area,{backgroundColor:theme.bg,}]}>
    <View style={[style.main,{backgroundColor:theme.bg,marginTop:20}]}>
        
        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
            <Avatar.Image source={require('../../assets/image/user.png')} size={60}></Avatar.Image>
            <View style={{flex:1,marginLeft:10}}>
                <Text style={[style.r16,{color:theme.disable}]}>Welcome 👋</Text>
                <Text style={[style.subtitle,{color:theme.txt}]}>{`${userDets?.user?.firstName} ${userDets?.user?.lastName}`}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Notification2')}>
            <Avatar.Icon icon='bell-outline' size={50} style={{backgroundColor:theme.borderbg,borderWidth:1,borderColor:theme.border}}></Avatar.Icon>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={[style.inputContainer,{backgroundColor:theme.input,marginTop:30,borderColor:theme.border}]} activeOpacity={0.9} onPress={() => navigation.navigate('Resultlist')}>
            <Icon name="search" size={20} color={Colors.disable} style={{ marginRight: 10 }} />  
            <Text style={{color:Colors.disable}}>Search...</Text>
                {/* <TextInput placeholder='Search...'
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    style={{flex:1,color:theme.txt,fontFamily:'Urbanist-Regular'}}/> */}
        </TouchableOpacity>

        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:30}}>
            <View style={{ width: '50%' }}>
                <Text style={[style.subtitle,{color:theme.txt}]}>Seeing 🔥 Events in</Text>
            </View>
            <View style={{ width: '50%' }}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onSelectItem={(item) => getNewCountryEvents(item)}
                    placeholder="Select a country"
                    style={{ borderColor: '#9E9E9E' }}
                />
            </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10}} nestedScrollEnabled={true}>

        {/* Featured Events UI */}
        {/* <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
            <Text style={[style.subtitle,{color:theme.txt}]}>Featured</Text>
            <Text style={[style.b16,{color:Colors.primary}]}>See All</Text>
        </View>


        <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
            <TouchableOpacity onPress={() => navigation.navigate('EventDetail')}>
            <View style={[{padding:10,}]}>
            <View style={[style.shadow,{padding:15,backgroundColor:theme.borderbg,borderRadius:15}]}>
                <Image source={require('../../assets/image/i1.png')}
                resizeMode='stretch'
                style={{width:width/1.5,height:height/4.2}}></Image>
                <Text style={[style.subtitle,{color:theme.txt,marginTop:10}]}>National Music Festival</Text>
                <Text style={[style.r16,{color:Colors.primary,marginVertical:5}]}>Mon, Dec 24 • 18.00 - 23.00 PM</Text>
                <View style={{flexDirection:'row',alignItems:'center',}}>
                    <Icon name='location' size={20} color={Colors.primary}></Icon>
                    <Text style={[style.r16,{color:theme.disable2,flex:1,marginHorizontal:10,}]}>Grand Park, New York</Text>
                    <Icon name='heart-outline' size={25} color={Colors.primary}></Icon>
                </View>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('EventDetail')}>
            <View style={[{padding:10,}]}>
            <View style={[style.shadow,{padding:15,backgroundColor:theme.borderbg,borderRadius:15}]}>
                <Image source={require('../../assets/image/i2.png')}
                resizeMode='stretch'
                style={{width:width/1.5,height:height/4.2}}></Image>
                <Text style={[style.subtitle,{color:theme.txt,marginTop:10}]}>Music Concert</Text>
                <Text style={[style.r16,{color:Colors.primary,marginVertical:5}]}>Tue, Dec 24 • 18.00 - 23.00 PM</Text>
                <View style={{flexDirection:'row',alignItems:'center',}}>
                    <Icon name='location' size={20} color={Colors.primary}></Icon>
                    <Text style={[style.r16,{color:theme.disable2,flex:1,marginHorizontal:10}]}>Avenue City, New York</Text>
                    <Icon name='heart-outline' size={25} color={Colors.primary}></Icon>
                </View>
            </View>
            </View>
            </TouchableOpacity>
        </ScrollView>
        </View> */}
        {/* Featured Events UI */}

        {
            loading ? (
                <View style={{ width: '100%', height: '100%', paddingTop: '30%' }}>
                    <ActivityIndicator size="large" color="#584CF4" />
                </View>
            ) : (
                <>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} style={{ marginVertical: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={()=>setT1(!T1)}
                            style={{ paddingVertical: 5, paddingHorizontal: 15, borderColor: Colors.primary, borderWidth: 1, borderRadius: 15, backgroundColor:T1?Colors.primary:theme.bg}}>
                                <Text style={[style.b16, { color: T1?Colors.secondary:Colors.primary }]}>✅ All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setT2(!T2)} style={{ paddingVertical: 5, paddingHorizontal: 15, borderColor: Colors.primary, borderWidth: 1, borderRadius: 15, marginHorizontal: 10 , backgroundColor:T2?Colors.primary:theme.bg}}>
                                <Text style={[style.b16, { color: T2?Colors.secondary:Colors.primary }]}>🎵 Music</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setT3(!T3)} style={{ paddingVertical: 5, paddingHorizontal: 15, borderColor: Colors.primary, borderWidth: 1, borderRadius: 15,  backgroundColor:T3?Colors.primary:theme.bg}}>
                                <Text style={[style.b16, { color: T3?Colors.secondary:Colors.primary  }]}>💼 Workshops</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setT4(!T4)} style={{ paddingVertical: 5, paddingHorizontal: 15, borderColor: Colors.primary, borderWidth: 1, borderRadius: 15, marginHorizontal: 10, backgroundColor:T4?Colors.primary:theme.bg }}>
                                <Text style={[style.b16, {color: T5?Colors.secondary:Colors.primary  }]}>🎨 Art</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setT5(!T5)} style={{ paddingVertical: 5, paddingHorizontal: 15, borderColor: Colors.primary, borderWidth: 1, borderRadius: 15,  backgroundColor:T5?Colors.primary:theme.bg}}>
                                <Text style={[style.b16, { color: T5?Colors.secondary:Colors.primary }]}>🍕 Food & Drink</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setT6(!T6)} style={{ paddingVertical: 5, paddingHorizontal: 15, borderColor: Colors.primary, borderWidth: 1, borderRadius: 15, marginLeft: 10, backgroundColor:T6?Colors.primary:theme.bg }}>
                                <Text style={[style.b16, {color: T6?Colors.secondary:Colors.primary  }]}>🧥 Fashion</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    {
                        list.length > 0 ? (
                            <View style={{flexDirection:'row', flexWrap: 'wrap', width: '100%'}}>
                                {
                                    list.map((item, index) => (
                                        <TouchableOpacity style={[{padding:5, width: "50%"}]} activeOpacity={0.9} key={index} onPress={() => navigation.navigate('EventDetail', { itemObj: item })}>
                                            <View style={[style.shadow,{padding:10,backgroundColor:theme.borderbg,borderRadius:15, flex: 1}]}>
                                                <ImageBackground source={{ uri: item.image[0] }}
                                                resizeMode='stretch'
                                                imageStyle={{ borderRadius: 20}}
                                                style={{height: height/6}}></ImageBackground>
                                                <Text style={[style.b18,{color:theme.txt,marginTop:5}]}>{item.eventName}</Text>
                                                <Text style={[style.r12,{color:Colors.primary,marginVertical:5}]}>{moment.utc(item.eventDate).local().format('MMM DD, YYYY')}</Text>
                                                <View style={{flexDirection:'row',alignItems:'center',}}>
                                                    <Icon name='location' size={20} color={Colors.primary}></Icon>
                                                    <Text style={[style.r12,{color:theme.disable2,flex:1,marginHorizontal:10,}]}>{item.location ? (item.location.length > 10 ? `${item.location.substring(0, 10)}...` : item.location) : 'No Location'}</Text>
                                                    <View>
                                                    <Icon name='list-circle-outline' size={20} color={Colors.primary}></Icon>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        ) : (
                            <View style={{ height: '80%', width: '100%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/noevents.png')} resizeMode='stretch' style={{width:width/1.5, height:height/4.2, marginTop: '30%' }}></Image>
                            </View>
                        )
                    }

                    <View style={{ marginTop: 100, marginBottom: 30 }} />
                </>
            )
        }

        </ScrollView>

    </View>
    </SafeAreaView>
  )
}