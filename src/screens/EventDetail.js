import { View, Text, Dimensions, SafeAreaView, ImageBackground, TextInput, FlatList, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useContext } from 'react'
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar, HStack, Avatar } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function EventDetail() {

    const theme = useContext(themeContext);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg, }]}>
            <StatusBar backgroundColor="transparent" barStyle={'light-content'} translucent={true} />
            <View>
                <ImageBackground source={require('../../assets/image/e1.png')}
                    resizeMode='stretch'
                    style={{ width: width, height: height / 2.5, }}>
                    <AppBar
                        style={{ backgroundColor: 'transparent', boxShadow: 'none', marginTop: 35, marginHorizontal: 20, justifyContent: 'center' }}
                        elevation={0}
                        leading={<TouchableOpacity
                            onPress={() => navigation.navigate('BottomNavigator')}
                        >
                            <Icon name="arrow-back" color={Colors.secondary} size={30} />
                        </TouchableOpacity>
                        }
                        trailing={
                            <HStack>
                                <Icon name='heart-outline' color={Colors.secondary} size={25} style={{ marginRight: 10 }} />
                                <TouchableOpacity onPress={() => this.RBSheet1.open()}>
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
                                                        <Text style={[style.r12, { color: theme.txt }]}>Tictok</Text>
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

                    <Text style={[style.apptitle,{color:theme.txt}]}>National Music Festival</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity style={{ paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.primary, borderRadius: 10, paddingVertical: 4 }}>
                            <Text style={[style.r12, { color: Colors.primary }]}>Music</Text>
                        </TouchableOpacity>
                        <Image source={require('../../assets/image/pic.png')}
                            resizeMode='stretch'
                            style={{ height: height / 27, width: width / 3.5, marginHorizontal: 5 }}>
                        </Image>
                        <Text style={[style.r16, { color: theme.disable1, marginRight: 5 }]}>20,000+ going</Text>
                        <Icon name='arrow-forward' size={25} color={theme.txt}></Icon>
                    </View>

                    <View style={[style.divider1, { backgroundColor: theme.border }]}></View>

                    <View style={{ flexDirection: 'row', }}>
                        <Avatar image={require('../../assets/image/b1.png')}
                            style={{ backgroundColor: 'transparent' }} size={65}></Avatar>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={[style.b18, { color: theme.txt }]}>Monday, December 24, 2022</Text>
                            <Text style={[style.r14, { color: theme.txt, marginVertical: 7 }]}>18.00 - 23.00 PM (GMT +07:00)</Text>
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
                            <Text style={[style.b18, { color: theme.txt }]}>Grand Park, New York City</Text>
                            <Text style={[style.r14, { color: theme.txt, marginVertical: 7 }]}>Grand City St. 100, New York, US.</Text>
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
                            <Text style={[style.b18, { color: theme.txt }]}>$20.00 - $100.00</Text>
                            <Text style={[style.r14, { color: theme.txt, marginVertical: 7 }]}>Ticket price depends on package.</Text>
                        </View>
                    </View>

                    <View style={[style.divider1, { backgroundColor: theme.border }]}></View>
                    <TouchableOpacity onPress={() => navigation.navigate('Organizer')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar image={require('../../assets/image/p6.png')}
                                style={{ backgroundColor: 'transparent' }} size={65}></Avatar>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={[style.b18, { color: theme.txt }]}>World of Music</Text>
                                <Text style={[style.r14, { color: theme.disable2 }]}>Organizer</Text>
                            </View>
                            <View style={{ backgroundColor: Colors.primary, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20 }}>
                                <Text style={[style.r14, { color: Colors.secondary, }]}>Follow</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text style={[style.subtitle, { color: theme.txt, marginTop: 20 }]}>About Event</Text>
                    <Text style={[style.r16, { color: theme.disable1, marginTop: 10 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut <Text style={{ color: Colors.primary }}>Read more...</Text></Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, }}>
                        <Text style={[style.subtitle, { color: theme.txt }]}>Gallery (Pre-Event)</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
                            <Text style={[style.b16, { color: Colors.primary }]}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>
                            <View>
                                <Image source={require('../../assets/image/p2.png')}
                                    resizeMode='stretch'
                                    style={{ height: height / 10, width: width / 3.55 }}></Image>
                            </View>
                            <View style={{ marginHorizontal: 10 }}>
                                <Image source={require('../../assets/image/m3.png')}
                                    resizeMode='stretch'
                                    style={{ height: height / 10, width: width / 3.55 }}></Image>
                            </View>
                            <View>
                                <Image source={require('../../assets/image/21.png')}
                                    resizeMode='stretch'
                                    style={{ height: height / 10, width: width / 3.55 }}></Image>
                            </View>
                        </View>
                    </View>

                    <Text style={[style.subtitle, { color: theme.txt, marginTop: 20 }]}>Location</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Icon name='location' color={Colors.primary} size={20}></Icon>
                        <Text style={[style.r14, { color: theme.disable2, marginLeft: 5 }]}>Grand City St. 100, New York, United States</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('EventLocation')}>
                        <Image source={theme.location2}
                            resizeMode='stretch'
                            style={{ height: height / 4.7, width: width - 40 }}>
                        </Image>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, }}>
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

                            {/* <View style={{margin:10}}></View> */}

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
                    </View>
                </ScrollView>
            </View>

            <View style={{ backgroundColor: theme.bg, paddingVertical: 20, paddingHorizontal: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, borderColor: theme.border, borderWidth: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate('BookEvent')}
                style={[style.btn]}>
                    <Text style={[style.btntxt]}>Book Event</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}