import { ActivityIndicator, View, Text, Dimensions, SafeAreaView, ImageBackground, TextInput, FlatList, StatusBar, TouchableOpacity, Image, ScrollView, Modal } from 'react-native'
import React, { useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar, HStack, Avatar } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ENDPOINTS } from '../api/constants';
import axios from 'axios';
import moment from 'moment';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function EventDetail({ route }) {
    const { itemObj } = route.params;

    const theme = useContext(themeContext);
    const navigation = useNavigation();
    
    const [loading, onLoading] = useState(false);
    const [error, onError] = useState('');
    const [item, setItem] = useState(itemObj);
    const [isvisible, setIsVisible] = useState(false)
    const [isVisibleSuccess, setIsVisibleSuccess] = useState(false)
    const [isVisibleFailed, setIsVisibleFailed] = useState(false)

    const saveEvent = async () => {
        onLoading(true);
  
        try {
          const jsonValue = await AsyncStorage.getItem('userDetails');
          const parsedValue = JSON.parse(jsonValue);

          var config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${parsedValue.token}`
            }
          };
      
          var data = {
            "userId": parsedValue.user.id,
            "eventId": item._id
          };
          
          var url = `${ENDPOINTS.favorites}`;
      
          axios.post(url, data, config)
          .then(async (res) => {
            onLoading(false);

            setIsVisible(false);
            setIsVisibleSuccess(true);
          })
          .catch(error => {
            
            if (error.response) {
            console.log(error.response)
              onLoading(false);
              onError(error.response.data.error);
              setIsVisible(false);
              setIsVisibleFailed(true);
            } else if (error.request) {
              console.log(error.request);
              onLoading(false);
              onError('Problem signing in. Please try later!');
              setIsVisible(false);
              setIsVisibleFailed(true);
            } else {
              onLoading(false);
              onError('Problem signing in. Please try later!');
              setIsVisible(false);
              setIsVisibleFailed(true);
            }
          });
          
        } catch (error) {
          onLoading(false);
          console.log(error);
        }
      };

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg, }]}>
            <StatusBar backgroundColor="transparent" barStyle={'light-content'} translucent={true} />
            <View>
                <ImageBackground source={{ uri: item.image[0] }}
                    resizeMode='stretch'
                    style={{ width: width, height: height / 3, }}>
                    <AppBar
                        style={{ backgroundColor: 'transparent', boxShadow: 'none', marginTop: 35, marginHorizontal: 20, justifyContent: 'center' }}
                        elevation={0}
                        leading={<TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name="arrow-back" color={Colors.secondary} size={30} />
                        </TouchableOpacity>
                        }
                        trailing={
                            <HStack>
                                <TouchableOpacity onPress={() => setIsVisible(true)}>
                                    <Icon name='heart-outline' color={Colors.secondary} size={25} style={{ }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => this.RBSheet1.open()}>
                                    <RBSheet ref={ref => {
                                        this.RBSheet1 = ref;
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
                                        <View style={{ marginHorizontal: 20, marginTop: 15 }}>
                                            <Text style={[style.apptitle, { textAlign: 'center', color: theme.txt }]}>Share</Text>
                                            <View style={[style.divider, { marginVertical: 15, backgroundColor: theme.border }]}></View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                <TouchableOpacity onPress={() => {this.RBSheet1.close(),navigation.navigate('Going')}}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image source={require('../../assets/image/wp.png')} resizeMode='stretch' style={{ height: height / 15, width: width / 7 }} />
                                                        <Text style={[style.r12, { color: theme.txt }]}>WhatsApp</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {this.RBSheet1.close(),navigation.navigate('Going')}}>
                                                    <View style={{ marginHorizontal: 7, alignItems: 'center' }}>
                                                        <Image source={require('../../assets/image/twitter.png')} resizeMode='stretch' style={{ height: height / 15, width: width / 7 }} />
                                                        <Text style={[style.r12, { color: theme.txt }]}>Twitter</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {this.RBSheet1.close(),navigation.navigate('Going')}}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image source={require('../../assets/image/fcb.png')} resizeMode='stretch' style={{ height: height / 15, width: width / 7 }} />
                                                        <Text style={[style.r12, { color: theme.txt }]}>Facebook</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {this.RBSheet1.close(),navigation.navigate('Going')}}>
                                                    <View style={{ marginLeft: 7, alignItems: 'center' }}>
                                                        <Image source={require('../../assets/image/insta.png')} resizeMode='stretch' style={{ height: height / 15, width: width / 7 }} />
                                                        <Text style={[style.r12, { color: theme.txt }]}>Instagram</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly' }}>
                                                <TouchableOpacity onPress={() => {this.RBSheet1.close(),navigation.navigate('Going')}}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image source={require('../../assets/image/yahoo.png')} resizeMode='stretch' style={{ height: height / 15, width: width / 7 }} />
                                                        <Text style={[style.r12, { color: theme.txt }]}>Yahoo</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {this.RBSheet1.close(),navigation.navigate('Going')}}>
                                                    <View style={{ marginHorizontal: 7, alignItems: 'center' }}>
                                                        <Image source={require('../../assets/image/tictok.png')} resizeMode='stretch' style={{ height: height / 15, width: width / 7 }} />
                                                        <Text style={[style.r12, { color: theme.txt }]}>Tiktok</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {this.RBSheet1.close(),navigation.navigate('Going')}}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image source={require('../../assets/image/chat.png')} resizeMode='stretch' style={{ height: height / 15, width: width / 7 }} />
                                                        <Text style={[style.r12, { color: theme.txt }]}>Chat</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {this.RBSheet1.close(),navigation.navigate('Going')}}>
                                                    <View style={{ marginLeft: 7, alignItems: 'center' }}>
                                                        <Image source={require('../../assets/image/chat2.png')} resizeMode='stretch' style={{ height: height / 15, width: width / 7 }} />
                                                        <Text style={[style.r12, { color: theme.txt }]}>WeChat</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </RBSheet>
                                    <Icon name='paper-plane-outline' color={Colors.secondary} size={25} />
                                </TouchableOpacity>
                            </HStack>
                        }
                    />
                </ImageBackground>
            </View>
            <View style={[style.main, { backgroundColor: theme.bg, marginTop: 10 }]}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={[style.apptitle,{color:theme.txt}]}>{item.eventName}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity style={{ paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.primary, borderRadius: 10, paddingVertical: 4, marginRight: 10 }}>
                            <Text style={[style.r12, { color: Colors.primary }]}>{item.category}</Text>
                        </TouchableOpacity>
                        <Image source={require('../../assets/image/pic.png')}
                            resizeMode='stretch'
                            style={{ height: height / 27, width: width / 3.5, marginHorizontal: 10 }}>
                        </Image>
                        <Text style={[style.r16, { color: theme.disable1, marginRight: 5 }]}>1,000+ going</Text>
                        {/* <Icon name='arrow-forward' size={25} color={theme.txt}></Icon> */}
                    </View>

                    <View style={[style.divider1, { backgroundColor: theme.border }]}></View>

                    <View style={{ flexDirection: 'row', }}>
                        <Avatar image={require('../../assets/image/b1.png')}
                            style={{ backgroundColor: 'transparent' }} size={65}></Avatar>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={[style.b18, { color: theme.txt }]}>{moment.utc(item.eventDate).local().format('dddd, MMMM DD, YYYY')}</Text>
                            <Text style={[style.r14, { color: theme.txt, marginVertical: 7 }]}>Event Date</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, width: width / 2.1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 }}>
                                <Icon name='calendar-sharp' color={Colors.secondary}></Icon>
                                <Text style={[style.r14, { color: Colors.secondary, marginLeft: 10 }]}>Add to My Calendar</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Avatar image={require('../../assets/image/b2.png')}
                            style={{ backgroundColor: 'transparent' }} size={65}></Avatar>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={[style.b18, { color: theme.txt }]}>{item.location}</Text>
                            <Text style={[style.r14, { color: theme.txt, marginVertical: 7 }]}>Event Location</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, width: width / 1.9, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 }}>
                                <Icon name='calendar-sharp' color={Colors.secondary}></Icon>
                                <Text style={[style.r14, { color: Colors.secondary, marginLeft: 10 }]}>See Location on Maps</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Avatar image={require('../../assets/image/b3.png')}
                            style={{ backgroundColor: 'transparent' }} size={65}></Avatar>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={[style.b18, { color: theme.txt }]}>{item.price === 0 ? (`Free`) : (`${item.currency} ${item.price}`)}</Text>
                            <Text style={[style.r14, { color: theme.txt, marginVertical: 7 }]}>Ticket price</Text>
                        </View>
                    </View>

                    <View style={[style.divider1, { backgroundColor: theme.border }]}></View>
                    <TouchableOpacity onPress={() => navigation.navigate('Organizer')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar image={require('../../assets/image/p6.png')}
                                style={{ backgroundColor: 'transparent' }} size={65}></Avatar>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={[style.b18, { color: theme.txt }]}>{`${item.eventHostId?.firstName} ${item.eventHostId.lastName}`}</Text>
                                <Text style={[style.r14, { color: theme.disable2 }]}>Organizer</Text>
                            </View>
                            <View style={{ backgroundColor: Colors.primary, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20 }}>
                                <Text style={[style.r14, { color: Colors.secondary, }]}>Follow</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text style={[style.subtitle, { color: theme.txt, marginTop: 20 }]}>About Event</Text>
                    <Text style={[style.r16, { color: theme.disable1, marginTop: 10 }]}>{item.description}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 10 }}>
                        <Text style={[style.subtitle, { color: theme.txt }]}>Gallery</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
                            <Text style={[style.b16, { color: Colors.primary }]}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>
                            {
                                item.image.map((imgItem, index) => (
                                    <View key={index}>
                                        <Image source={{ uri: imgItem }}
                                            resizeMode='stretch'
                                            style={{ height: height / 10, width: width / 3.55, marginRight: 10 }}></Image>
                                    </View>
                                ))
                            }
                        </View>
                    </View>

                    <Text style={[style.subtitle, { color: theme.txt, marginTop: 20 }]}>Location</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                        <Icon name='location' color={Colors.primary} size={20}></Icon>
                        <Text style={[style.r14, { color: theme.disable2, marginLeft: 5 }]}>{item.location}</Text>
                    </View>
                    <TouchableOpacity /* onPress={() => navigation.navigate('EventLocation')} */>
                        <Image source={theme.location2}
                            resizeMode='stretch'
                            style={{ height: height / 4.7, width: width - 40 }}>
                        </Image>
                    </TouchableOpacity>

                    <View style={{ marginVertical: 20 }} />

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, }}>
                        <Text style={[style.subtitle, { color: theme.txt }]}>More Events like this</Text>
                        <Text style={[style.b16, { color: Colors.primary }]}>See All</Text>
                    </View>

                    <View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>

                            <View style={[{ padding: 10, }]}>
                                <View style={[style.shadow, { padding: 15, backgroundColor: theme.borderbg, borderRadius: 15 }]}>
                                    <Image source={require('../../assets/image/i3.png')}
                                        resizeMode='stretch'
                                        style={{ width: width / 1.5, height: height / 4.2 }}></Image>
                                    <Text style={[style.subtitle, { color: theme.txt, marginTop: 10 }]}>National Music Festival</Text>
                                    <Text style={[style.r16, { color: Colors.primary, marginVertical: 5 }]}>Mon, Dec 24 • 18.00 - 23.00 PM</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Icon name='location' size={20} color={Colors.primary}></Icon>
                                        <Text style={[style.r16, { color: theme.disable2, flex: 1, marginHorizontal: 10, }]}>Grand Park, New York</Text>
                                        <Icon name='heart-outline' size={25} color={Colors.primary}></Icon>
                                    </View>
                                </View>
                            </View>

                            <View style={[{ padding: 10, }]}>
                                <View style={[style.shadow, { padding: 15, backgroundColor: theme.borderbg, borderRadius: 15 }]}>
                                    <Image source={require('../../assets/image/i4.png')}
                                        resizeMode='stretch'
                                        style={{ width: width / 1.5, height: height / 4.2 }}></Image>
                                    <Text style={[style.subtitle, { color: theme.txt, marginTop: 10 }]}>Music Concert</Text>
                                    <Text style={[style.r16, { color: Colors.primary, marginVertical: 5 }]}>Tue, Dec 24 • 18.00 - 23.00 PM</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Icon name='location' size={20} color={Colors.primary}></Icon>
                                        <Text style={[style.r16, { color: theme.disable2, flex: 1, marginHorizontal: 10 }]}>Avenue City, New York</Text>
                                        <Icon name='heart-outline' size={25} color={Colors.primary}></Icon>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View> */}
                </ScrollView>
            </View>

            <View style={{ backgroundColor: theme.bg, paddingVertical: 20, paddingHorizontal: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, borderColor: theme.border, borderWidth: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate('BookEvent', { itemObj: item })}
                style={[style.btn]}>
                    <Text style={[style.btntxt]}>Book Event</Text>
                </TouchableOpacity>
            </View>

            <Modal transparent={true} visible={isvisible}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#000000aa',
                    transparent: 'true'
                }}>
                    <View style={[style.modalcontainer, { backgroundColor: theme.bg, width: width - 40, borderRadius: 30 ,marginVertical:110}]}>
                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { setIsVisible(false) }}>
                                    <Icon name='close' size={20} color={theme.txt} />
                                </TouchableOpacity>
                            </View>
                            <Image source={require('../../assets/image/confirm.png')} resizeMode='stretch' style={{ height: height / 5.5, width: width / 2.5, alignSelf: 'center', marginTop: 10 }} />
                            <Text style={[style.apptitle, { color: Colors.primary, textAlign: 'center', marginTop: 20 }]}>Confirm</Text>
                            <Text style={[style.r16, { color: theme.txt, textAlign: 'center', marginTop: 10 }]}>Do you want to save this event for later?</Text>

                            {
                                loading ? (
                                    <View style={{marginTop:20}}>
                                        <TouchableOpacity style={style.btn}>
                                            <ActivityIndicator size="small" color="#ffffff" />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={{ marginTop: 20 }}>
                                        <TouchableOpacity onPress={() => {saveEvent()}}
                                            style={style.btn}>
                                            <Text style={style.btntxt}>Yes</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                            
                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity onPress={() => {setIsVisible(false)}}
                                    style={[style.btn,{backgroundColor:theme.btn}]}>
                                    <Text style={[style.btntxt,{color:Colors.primary}]}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} visible={isVisibleSuccess}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#000000aa',
                    transparent: 'true'
                }}>
                    <View style={[style.modalcontainer, { backgroundColor: theme.bg, width: width - 40, borderRadius: 30 ,marginVertical:110}]}>
                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { setIsVisibleSuccess(false) }}>
                                    <Icon name='close' size={20} color={theme.txt} />
                                </TouchableOpacity>
                            </View>
                            <Image source={require('../../assets/image/congrats1.png')} resizeMode='stretch' style={{ height: height / 5.5, width: width / 2.5, alignSelf: 'center', marginTop: 10 }} />
                            <Text style={[style.apptitle, { color: Colors.primary, textAlign: 'center', marginTop: 20 }]}>Success!</Text>
                            <Text style={[style.r16, { color: theme.txt, textAlign: 'center', marginTop: 10 }]}>Event has been saved in your favorites.</Text>
                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity onPress={() => {setIsVisibleSuccess(false)}}
                                    style={style.btn}>
                                    <Text style={style.btntxt}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} visible={isVisibleFailed}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#000000aa',
                    transparent: 'true'
                }}>
                    <View style={[style.modalcontainer, { backgroundColor: theme.bg, width: width - 40, borderRadius: 30 ,marginVertical:110}]}>
                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { setIsVisibleFailed(false) }}>
                                    <Icon name='close' size={20} color={theme.txt} />
                                </TouchableOpacity>
                            </View>
                            <Image source={require('../../assets/image/failed.png')} resizeMode='stretch' style={{ height: height / 5.5, width: width / 2.5, alignSelf: 'center', marginTop: 10 }} />
                            <Text style={[style.apptitle, { color: '#F75555', textAlign: 'center', marginTop: 20 }]}>Oops, Failed!</Text>
                            <Text style={[style.r16, { color: theme.txt, textAlign: 'center', marginTop: 10 }]}>{error}</Text>
                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity onPress={() => setIsVisibleFailed(false)}
                                    style={[style.btn,{backgroundColor:theme.btn}]}>
                                    <Text style={[style.btntxt,{color:Colors.primary}]}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}