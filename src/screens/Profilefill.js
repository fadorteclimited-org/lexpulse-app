import { ActivityIndicator, View, Text, SafeAreaView, TextInput, StatusBar,TouchableOpacity,Image,ScrollView,Dimensions,KeyboardAvoidingView, Platform} from 'react-native'
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
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function Profilefill({ route }) {
    const { email, password, country } = route.params;
    const [photo, setPhoto] = React.useState(null);

    const theme = useContext(themeContext);
    const navigation=useNavigation();
    const [isFocused, setIsFocused] = useState(false)

    const [loading, onLoading] = React.useState(false);
    const [error, onError] = React.useState('');
    const [firstName, onChangeFirstName] = React.useState('');
    const [lastName, onChangeLastName] = React.useState('');

    const [openGender, setOpenGender] = useState(false);
    const [valueGender, setValueGender] = useState(null);
    const [itemsGender, setItemsGender] = useState([
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'},
        {label: 'Other', value: 'Other'}
    ]);

    const handleChoosePhoto = () => {
      launchImageLibrary({ noData: true }, (response) => {
        console.log(response);
        if (response.assets) {
          setPhoto(response);
        }
      });
    };

    const createFormData = (photo, body = {}) => {
      const data = new FormData();
    
      data.append('image', {
        name: photo[0].fileName,
        type: photo[0].type,
        uri: Platform.OS === 'ios' ? photo[0].uri.replace('file://', '') : photo[0].uri,
      });
    
      Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
      });
    
      return data;
    };

    const fillProfile = async () => {
        onLoading(true);

        if(photo === null || 
          firstName === '' || 
          lastName === '' || 
          valueGender === null) {
          onError('Please make sure all fields are filled out and update your profile pic.');
          onLoading(false);
          return;
        }

        try {
          var config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
      
          var dataItems = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "country": country,
            "gender": valueGender,
            "password": password,
            "userType": "attendee"
          };

          var data = createFormData(photo.assets, dataItems);
          
          var url = ENDPOINTS.signup;
      
          axios.post(url, data, config)
          .then(async (res) => {
            onLoading(false);
            const jsonValue = JSON.stringify(res.data);

            await AsyncStorage.setItem('userDetails', jsonValue);
            navigation.navigate('OtpVerification', { email: email, fromRoute: 'profile' });
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
            leading={ <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name="arrow-back"  
            // style={{backgroundColor:Colors.secondary,}}  
            color={theme.txt} size={30}
            />
            </TouchableOpacity>
        }/>

        <View>

            <TouchableOpacity activeOpacity={0.9} onPress={() => handleChoosePhoto()}>
              {
                photo !== null ? (
                  <Avatar image={{ uri: photo?.assets[0]?.uri }}
                    size={100} style={{alignSelf:'center', marginVertical: 20}}></Avatar>
                ) : (
                  <Avatar image={require('../../assets/image/user.png')}
                    size={100} style={{alignSelf:'center', marginVertical: 20}}></Avatar>
                )
              }
                <Image source={require('../../assets/image/Exclude.png')}
               resizeMode='stretch'
               style={{height:height/32,width:width/15,position:'absolute',bottom:15,right:130}}></Image>
            </TouchableOpacity>

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

            <View style={[style.txtinput,{borderColor: isFocused === 'Gender' ? Colors.primary : theme.input,backgroundColor: isFocused ==='Gender' ?'#584CF410': theme.input,marginTop:20}]}>
                <DropDownPicker
                    open={openGender}
                    value={valueGender}
                    items={itemsGender}
                    setOpen={setOpenGender}
                    setValue={setValueGender}
                    setItems={setItemsGender}
                    placeholder="Select a Gender"
                    style={{ borderColor: isFocused === 'Gender' ? Colors.primary : theme.input, backgroundColor: isFocused ==='Gender' ?'#584CF410': theme.input }}
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
                    <View style={{marginTop:100,marginBottom:20}}>
                        <TouchableOpacity style={style.btn}>
                            <ActivityIndicator size="small" color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{marginTop:130,marginBottom:20}}>
                        <TouchableOpacity onPress={() => fillProfile()} style={style.btn}>
                            <Text style={style.btntxt}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}