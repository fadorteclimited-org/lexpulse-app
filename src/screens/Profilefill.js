import { ActivityIndicator, View, Text, SafeAreaView, TextInput, StatusBar,TouchableOpacity,Image,ScrollView,Dimensions,KeyboardAvoidingView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState,useContext} from 'react'
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar, Avatar} from '@react-native-material/core';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { ENDPOINTS } from '../api/constants';
import axios from 'axios';

const width =Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function Profilefill() {

    const theme = useContext(themeContext);
    const navigation=useNavigation();
    const [isFocused, setIsFocused] = useState(false)

    const [loading, onLoading] = React.useState(false);
    const [error, onError] = React.useState('');
    const [firstName, onChangeFirstName] = React.useState('');
    const [lastName, onChangeLastName] = React.useState('');

    const fillProfile = async () => {
        onLoading(true);
  
        try {
          var config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };

          const jsonValue = await AsyncStorage.getItem('userDetails');
          const parsedValue = JSON.parse(jsonValue);
      
          var data = {
            "firstName": firstName,
            "lastName": lastName
          };
          
          var url = `${ENDPOINTS.signup}/${parsedValue.user.id}`;
      
          axios.patch(url, data, config)
          .then(async (res) => {
            onLoading(false);
            const jsonValue = JSON.stringify(res.data);

            await AsyncStorage.setItem('userDetails', jsonValue);
            navigation.navigate('BottomNavigator');
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

    return (
    <SafeAreaView style={[style.area,{backgroundColor:theme.bg,}]}>

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex:1}}>

        <View style={[style.main,{backgroundColor:theme.bg,marginTop:20}]}>
            <AppBar 
            color={theme.bg}
            title='Fill Your Profile'
            titleStyle={[style.apptitle,{color:theme.txt}]}
            elevation={0}
            leading={ <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
            <Icon name="arrow-back"  
            // style={{backgroundColor:Colors.secondary,}}  
            color={theme.txt} size={30}
            />
            </TouchableOpacity>
        }/>

        <ScrollView showsVerticalScrollIndicator={false}>

            <View>
                <Avatar image={require('../../assets/image/user.png')}
                size={100} style={{alignSelf:'center', marginVertical: 20, borderColor: '#584CF4', borderWidth: 2}}></Avatar>
                {/* <Image source={require('../../assets/image/Exclude.png')}
               resizeMode='stretch'
               style={{height:height/32,width:width/15,position:'absolute',bottom:0,right:125}}></Image> */}
            </View>

            <View style={[style.txtinput,{borderColor: isFocused === 'First Name' ? Colors.primary : theme.input,backgroundColor: isFocused==='First Name' ?'#584CF410': theme.input,marginTop:20}]}>
            <TextInput placeholder='First Name'
                    selectionColor={Colors.primary}
                    onFocus={() => setIsFocused('First Name')}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={onChangeFirstName}
                    placeholderTextColor={Colors.disable}
                    style={[{paddingHorizontal:10,color:theme.txt,fontFamily:'Urbanist-Regular',flex:1}]}
            />
            </View>

            <View style={[style.txtinput,{borderColor: isFocused === 'Last Name' ? Colors.primary : theme.input,backgroundColor: isFocused==='Last Name' ?'#584CF410': theme.input,marginTop:20}]}>
            <TextInput placeholder='Last Name'
                    selectionColor={Colors.primary}
                    onFocus={() => setIsFocused('Last Name')}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={onChangeLastName}
                    placeholderTextColor={Colors.disable}
                    style={[{paddingHorizontal:10,color:theme.txt,fontFamily:'Urbanist-Regular',flex:1}]}
            />
            </View>

            {/* <View style={[style.inputContainer,{borderColor: isFocused==='Date of Birth' ? Colors.primary : theme.input,borderWidth:1,backgroundColor: isFocused==='Date of Birth' ?'#584CF410': theme.input,marginTop:20}]}>
                <TextInput placeholder='Date of Birth'
                onFocus={() => setIsFocused('Date of Birth')}
                onBlur={() => setIsFocused(false)}
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                style={[{paddingHorizontal:10,color:theme.txt,fontFamily:'Urbanist-Regular',flex:1}]}
                />
                <TouchableOpacity>
                    <Icon name='calendar-outline' color={isFocused==='Date of Birth' ?'#584CF4': Colors.disable} size={20} />
                </TouchableOpacity>
            </View>

            <View style={[style.inputContainer,{borderColor: isFocused==='Email' ? Colors.primary : theme.input,borderWidth:1,backgroundColor: isFocused==='Email' ?'#584CF410': theme.input,marginTop:20}]}>
                <TextInput placeholder='Email'
                onFocus={() => setIsFocused('Email')}
                onBlur={() => setIsFocused(false)}
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                style={[{paddingHorizontal:10,color:theme.txt,fontFamily:'Urbanist-Regular',flex:1}]}
                />
                <TouchableOpacity>
                    <Icon name='mail-outline' color={isFocused==='Email' ?'#584CF4': Colors.disable} size={20} />
                </TouchableOpacity>
            </View>

            <View style={[style.inputContainer,{borderColor: isFocused==='Gender' ? Colors.primary : theme.input,borderWidth:1,backgroundColor: isFocused==='Gender' ?'#584CF410': theme.input,marginTop:20}]}>
                <TextInput placeholder='Gender'
                onFocus={() => setIsFocused('Gender')}
                onBlur={() => setIsFocused(false)}
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                style={[{paddingHorizontal:10,color:theme.txt,fontFamily:'Urbanist-Regular',flex:1}]}
                />
                <TouchableOpacity>
                    <Icon name='caret-down' color={isFocused==='Gender' ?'#584CF4': Colors.disable} size={20} />
                </TouchableOpacity>
            </View> */}

            {
                error && error.length > 0 ? (
                    <Text style={{ color: 'red', marginTop: 20, textAlign: 'center' }}>{error}</Text>
                ) : (
                    null
                )
            }
            {
                loading ? (
                    <View style={{marginTop:40,marginBottom:20}}>
                        <TouchableOpacity style={style.btn}>
                            <ActivityIndicator size="small" color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{marginTop:40,marginBottom:20}}>
                        <TouchableOpacity onPress={() => fillProfile()} style={style.btn}>
                            <Text style={style.btntxt}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </ScrollView>
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}