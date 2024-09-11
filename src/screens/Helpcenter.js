import { View, Text ,SafeAreaView, TextInput, StatusBar,TouchableOpacity,Image,ScrollView,Dimensions, Linking} from 'react-native'
import React,{useState,useContext} from 'react'
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar, Avatar} from '@react-native-material/core';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createMaterialTopTabNavigator();

const width =Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const Tabs = () =>{
    return (
        <Tab.Navigator
        screenOptions={{
            // tabBarStyle: { height:50,marginVertical:30,marginHorizontal:2},
            tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarShowLabel:true,
          tabBarItemStyle:{marginHorizontal:-10},
          tabBarIndicatorStyle:{backgroundColor:Colors.primary}            

          }}>
            <Tab.Screen name="About" component={About} 
                options={{
                    tabBarShowLabel:true,
                    tabBarLabel: ({focused, color,}) => (
                    <Text style={{color: focused ? Colors.primary : Colors.disable,fontFamily:'Urbanist-Regular',textAlign:'center',fontSize:16}}>About</Text>
                    ),
                    headerShown:false,
                }}/>
            {/* <Tab.Screen name="FAQ" component={FAQ} 
                options={{
                    tabBarShowLabel:true,
                    tabBarLabel: ({focused, color,}) => (
                    <Text style={{color: focused ? Colors.primary : Colors.disable,fontFamily:'Urbanist-Regular',textAlign:'center',fontSize:16}}>FAQ</Text>
                    ),
                    headerShown:false,
                }}/> */}
            <Tab.Screen name="Contact us" component={Contactus}
                options={{
                    tabBarShowLabel:true,
                    tabBarLabel: ({focused, color,}) => (
                    <Text style={{color: focused ? Colors.primary : Colors.disable,fontFamily:'Urbanist-Regular',textAlign:'center',fontSize:16}}>Contact us</Text>
                    ),
                    headerShown:false,
                }} />
        </Tab.Navigator>
      )
}

const About = () => {
    
    const theme = useContext(themeContext);
    const navigation = useNavigation();

    return(
        <SafeAreaView style={[style.area,{backgroundColor:theme.bg,}]}>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>

            <View style={{padding:5,marginTop:10}}>
                <View style={[style.shadow,{backgroundColor:theme.bg,padding:20,borderRadius:20}]}>
                    <View style={{alignItems:'center'}}>
                        <Image source={require('../../assets/image/logo1.png')} resizeMode='stretch' style={{ height: height / 30, width: width / 15, marginVertical: 10 }} />
                        <Text style={[style.b18,{color:theme.txt}]}>Lexpulse</Text>
                        {/* <Icons name='chevron-right' color={theme.txt} size={30} /> */}
                    </View>
                    <View style={[style.divider,{backgroundColor:theme.border,marginVertical:15}]}></View>
                    <Text style={[style.r14,{color:theme.disable1}]}>Lexpulse is a groundbreaking social event and networking app designed to enhance the event experience for both event organizers and attendees.</Text>
                </View>
            </View>

            <View style={{padding:5,marginTop:10}}>
                <TouchableOpacity style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]} activeOpacity={0.9} onPress={() => { Linking.openURL("https://lexpulse.app/terms.html") }}>
                    <Text style={[style.b18,{color:theme.txt,flex:1}]}>Terms and Conditions</Text>
                    <View>
                    <Icons name='chevron-right' color={theme.txt} size={30} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{padding:5,marginTop:10}}>
                <TouchableOpacity style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]} activeOpacity={0.9} onPress={() => { Linking.openURL("https://lexpulse.app/privacy.html") }}>
                    <Text style={[style.b18,{color:theme.txt,flex:1}]}>Privacy Policy</Text>
                    <View>
                    <Icons name='chevron-right' color={theme.txt} size={30} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{padding:5,marginTop:10}}>
                <TouchableOpacity style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]} activeOpacity={0.9} onPress={() => { Linking.openURL("https://lexpulse.app/datadeletion.html") }}>
                    <Text style={[style.b18,{color: '#F75555',flex:1}]}>Delete my account / data</Text>
                    <View>
                    <Icons name='chevron-right' color={theme.txt} size={30} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{padding:5,marginTop:10}}>
                <View style={{backgroundColor:theme.bg,padding:15,borderRadius:10,alignItems:'center'}}>
                    <Text style={[style.b10,{color:theme.txt,}]}>Version 1.0.0</Text>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const FAQ = () => {
    
    const theme = useContext(themeContext);
    const navigation=useNavigation();

    const categories =['All', 'Popular', 'Recommendation', 'Frequently visited'];

    const [categoryIndex, setcategoryIndex] = useState(0)
  
    const Categorylist=()=>{
      return( <View style={style.categorycontainer}>
        {categories.map((item,index)=>(
          <TouchableOpacity key={index} 
            activeOpacity={0.8}
            onPress={()=>setcategoryIndex(index)}>
            <Text 
             key={index} 
             style={[
             style.categoryText ,{color:theme.txt},
             categoryIndex==index && style.categoryTextSelected]}>
            {item}
          </Text>
          </TouchableOpacity>
          
        ))}
      </View>
      );
    };

    return(
        <SafeAreaView style={[style.area,{backgroundColor:theme.bg,}]}>
            <View style={{marginTop:10,marginBottom:20}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Categorylist/>
                </ScrollView>
            </View>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
            <View style={[style.inputContainer,{backgroundColor:theme.input,marginTop:-20,borderColor:theme.border}]}>
            <Icon name="search" size={20} color={Colors.disable}/>  
                <TextInput placeholder='Search...'
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    style={{flex:1,color:theme.txt,fontFamily:'Urbanist-Regular'}}/>
                <Image source={require('../../assets/image/Filter.png')}
                style={{width:width/19,height:height/35,alignSelf:'center'}}></Image>
            </View>

            <View style={{padding:5,marginTop:10}}>
                <View style={[style.shadow,{backgroundColor:theme.bg,padding:20,borderRadius:20}]}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={[style.b18,{color:theme.txt}]}>What is Lexpulse?</Text>
                        <Icon name='caret-down' size={20} color={Colors.primary}></Icon>
                    </View>
                    <View style={[style.divider,{backgroundColor:theme.border,marginVertical:15}]}></View>
                    <Text style={[style.r14,{color:theme.disable1}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                </View>
            </View>

            <View style={{padding:5,marginTop:10}}>
                <View style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
                    <Text style={[style.b18,{color:theme.txt,flex:1}]}>How to make a payment?</Text>
                    <TouchableOpacity>
                    <Icon name='caret-down' size={20} color={Colors.primary}></Icon>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{padding:5,marginTop:10}}>
                <View style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
                    <Text style={[style.b18,{color:theme.txt,flex:1}]}>How do I can cancel booking?</Text>
                    <TouchableOpacity>
                    <Icon name='caret-down' size={20} color={Colors.primary}></Icon>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{padding:5,marginTop:10}}>
                <View style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
                    <Text style={[style.b18,{color:theme.txt,flex:1}]}>How do I can delete my account?</Text>
                    <TouchableOpacity>
                    <Icon name='caret-down' size={20} color={Colors.primary}></Icon>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{padding:5,marginTop:10}}>
                <View style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
                    <Text style={[style.b18,{color:theme.txt,flex:1}]}>How do I exit the app?</Text>
                    <TouchableOpacity>
                    <Icon name='caret-down' size={20} color={Colors.primary}></Icon>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const Contactus = () => {
    
    const theme = useContext(themeContext);
    const navigation=useNavigation();

    return(
        <SafeAreaView style={[style.area,{backgroundColor:theme.bg,}]}>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
            <View style={{padding:5,marginTop:10}}>
                <TouchableOpacity style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]} activeOpacity={0.9} onPress={() => { Linking.openURL("mailto:thelexpulseteam@fadorteclimited.com") }}>
                    <Icon name='mail-outline' size={27} color={Colors.primary}></Icon>
                    <Text style={[style.b18,{color:theme.txt,flex:1,marginLeft:10}]}>Email</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={{padding:5,marginTop:10}}>
                <View style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
                    <Icon name='logo-whatsapp' size={27} color={Colors.primary}></Icon>
                    <Text style={[style.b18,{color:theme.txt,flex:1,marginLeft:10}]}>WhatsApp</Text>
                </View>
            </View> */}
            <View style={{padding:5,marginTop:10}}>
                <TouchableOpacity style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]} activeOpacity={0.9} onPress={() => { Linking.openURL("https://lexpulse.app") }}>
                    <Icon name='globe-outline' size={27} color={Colors.primary}></Icon>
                    <Text style={[style.b18,{color:theme.txt,flex:1,marginLeft:10}]}>Website</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={{padding:5,marginTop:10}}>
                <View style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
                    <Icons name='facebook' size={27} color={Colors.primary}></Icons>
                    <Text style={[style.b18,{color:theme.txt,flex:1,marginLeft:10}]}>Facebook</Text>
                </View>
            </View>
            <View style={{padding:5,marginTop:10}}>
                <View style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
                    <Icon name='logo-twitter' size={27} color={Colors.primary}></Icon>
                    <Text style={[style.b18,{color:theme.txt,flex:1,marginLeft:10}]}>Twitter</Text>
                </View>
            </View> */}
            <View style={{padding:5,marginTop:10}}>
                <TouchableOpacity style={[style.shadow,{backgroundColor:theme.bg,padding:15,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]} activeOpacity={0.9} onPress={() => { Linking.openURL("https://instagram.com/lexpulseapp") }}>
                    <Icon name='logo-instagram' size={27} color={Colors.primary}></Icon>
                    <Text style={[style.b18,{color:theme.txt,flex:1,marginLeft:10}]}>Instagram</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default function Helpcenter() {
    
    const theme = useContext(themeContext);
    const navigation=useNavigation();

    
  return (
    <SafeAreaView style={[style.area,{backgroundColor:theme.bg,}]}>
    <View style={[style.main,{backgroundColor:theme.bg,marginTop:20}]}>
        <AppBar 
            color={theme.bg}
            title='Help Center'
            titleStyle={[style.apptitle,{color:theme.txt}]}
            elevation={0}
            leading={ <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name="arrow-back"  
            // style={{backgroundColor:Colors.secondary,}}  
            color={theme.txt} size={30}
            />
            </TouchableOpacity>}
            />

        <Tabs></Tabs>

    </View>
    </SafeAreaView>
  )
}