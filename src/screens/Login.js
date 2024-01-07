import { ActivityIndicator, View, Text ,SafeAreaView, TextInput, StatusBar,TouchableOpacity,Image,ScrollView,Dimensions,KeyboardAvoidingView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState,useContext} from 'react'
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar} from '@react-native-material/core';
import  Icon  from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { ENDPOINTS } from '../api/constants';
import axios from 'axios';
import { AuthContext } from '../../App';

const width =Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function Login() {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const theme = useContext(themeContext);
    const { signIn, state } = React.useContext(AuthContext);
    const navigation=useNavigation();
    const [isSelected, setIsSelected] = useState(false);
    const [isFocused, setIsFocused] = useState(false)

    const [loading, onLoading] = React.useState(false);
    const [error, onError] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const login = () => {
      onLoading(true);

      try {
        var config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
    
        var data = {
          "email": email,
          "password": password
        };
        
        var url = ENDPOINTS.login;
    
        axios.post(url, data, config)
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
            elevation={0}
            leading={ <TouchableOpacity onPress={()=>navigation.navigate('Introduction')}>
            <Icon name="arrow-back"  
            color={theme.txt} size={30}
            />
            </TouchableOpacity>
        }/>

        <ScrollView showsVerticalScrollIndicator={false}>

        <Image source={require('../../assets/image/logo1.png')}
               resizeMode='stretch'
               style={{height:height/10,width:width/4.5,alignSelf:'center'}}></Image>

        <View style={{marginVertical:20}}>
            <Text style={[style.title,{color:theme.txt,alignSelf:'center'}]}>Login to Your Account</Text>
        </View>      

        <View style={[style.inputContainer,{marginTop:20,borderColor: isFocused === 'Email' ? Colors.primary : theme.input,borderWidth:1,backgroundColor: isFocused==='Email' ?'#584CF410': theme.input}]}>
        <Icon name='mail' size={25} color={isFocused==='Email' ?'#584CF4': Colors.disable}></Icon>
                    <TextInput placeholder='Email'
                    keyboardType='email-address'
                    selectionColor={Colors.primary}
                    onFocus={() => setIsFocused('Email')}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={onChangeEmail}
                    placeholderTextColor={Colors.disable}
                    style={[{paddingHorizontal:10,color:theme.txt,fontFamily:'Urbanist-Regular',flex:1}]}
                    />
        </View>

        <View style={[style.inputContainer,{borderColor: isFocused==='Password' ? Colors.primary : theme.input,borderWidth:1,backgroundColor: isFocused==='Password' ?'#584CF410': theme.input}]}>
        <Icon name='lock-closed' size={25} color={isFocused==='Password' ?'#584CF4': Colors.disable}></Icon>
            <TextInput placeholder='Password'
            secureTextEntry={!isPasswordVisible}
            onFocus={() => setIsFocused('Password')}
            onBlur={() => setIsFocused(false)}
            onChangeText={onChangePassword}
            selectionColor={Colors.primary}
            placeholderTextColor={Colors.disable}
            style={[{paddingHorizontal:10,color:theme.txt,fontFamily:'Urbanist-Regular',flex:1}]}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} >
                <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} color={isFocused==='Password' ?'#584CF4': Colors.disable} size={20} />
            </TouchableOpacity>
        </View>

        {/* <View style={{ flexDirection: 'row', marginVertical: 20, paddingLeft:10,alignItems:'center',justifyContent:'center' }}>
         
         <CheckBox
           value={isSelected}
           onValueChange={() => setIsSelected(!isSelected)}
           tintColors={{ true: Colors.primary, false: Colors.primary }}
          //  style={{borderColor:Colors.primary}}
         />
        <View>
            <Text style={[style.b18,{color:theme.txt,marginLeft:5}]}>Remember me</Text>
        </View>
            
        </View> */}

       <View style={{ marginVertical: 20 }}>
          {
            state.loginError && state.loginError.length > 0 ? (
              <Text style={{ color: 'red', marginTop: 20, marginBottom: 20, textAlign: 'center' }}>{state.loginError}</Text>
            ) : (
              null
            )
          }
          {
            state.loginLoading ? (
              <TouchableOpacity 
              style={style.btn}>
                <ActivityIndicator size="small" color="#ffffff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => signIn({ email, password })} 
              style={style.btn}>
                <Text style={style.btntxt}>Sign in</Text>
              </TouchableOpacity>
            )
          }
        </View>

        <View style={{marginTop:20,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('ForgotPass')}>
            <Text style={[style.subtxt,{color:Colors.primary,fontFamily:'Urbanist-SemiBold'}]}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', paddingHorizontal:30,marginVertical:50}}>
              <View style={[style.divider,{flex:1,backgroundColor:theme.border}]}></View>
              <Text style={{color:theme.disable2,fontFamily:'Urbanist-Regular',marginHorizontal:10}}>or continue with</Text>
              <View style={[style.divider,{flex:1,backgroundColor:theme.border}]}></View>
        </View>

        
        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-evenly'}}>
          <TouchableOpacity style={[style.btnoutline,{backgroundColor:theme.borderbg,borderColor:theme.border}]}>
            <Image source={require('../../assets/image/Fb.png')}
            resizeMode='stretch'
            style={{height:height/25,width:width/11}}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={[style.btnoutline,{backgroundColor:theme.borderbg,borderColor:theme.border}]}>
            <Image source={require('../../assets/image/Google.png')}
            resizeMode='stretch'
            style={{height:height/25,width:width/11}}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={[style.btnoutline,{backgroundColor:theme.borderbg,borderColor:theme.border}]}>
            <Image source={theme.apple}
            resizeMode='stretch'
            style={{height:height/25,width:width/11}}></Image>
          </TouchableOpacity>
        </View> */}

        <View style={{flexDirection:'row',justifyContent:'center',paddingTop:30,marginBottom:10}}>
            <Text style={[style.r14,{color:theme.inputtxt}]}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={[style.b14,{color:Colors.primary,}]}> Sign up</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{flexDirection:'row',justifyContent:'center',paddingTop:30,marginBottom:10}}>
            <Text style={[style.r14,{color:theme.inputtxt}]}>Check the OTP screen</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('NewPass', { email: 'kayosarp@gmail.com' })}>
                <Text style={[style.b14,{color:Colors.primary,}]}> OTP screen</Text>
            </TouchableOpacity>
          </View> */}

        </ScrollView>
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}