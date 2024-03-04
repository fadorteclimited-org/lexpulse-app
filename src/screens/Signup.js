import { ActivityIndicator, View, Text ,SafeAreaView, TextInput, StatusBar, TouchableOpacity,Image,ScrollView,Dimensions,KeyboardAvoidingView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState,useContext,useCallback} from 'react'
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar} from '@react-native-material/core';
import  Icon  from 'react-native-vector-icons/Ionicons';
// import CheckBox from '@react-native-community/checkbox';
import { ENDPOINTS } from '../api/constants';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


export default function Signup() {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const theme = useContext(themeContext);
    const navigation=useNavigation();
    const [isSelected, setIsSelected] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const [loading, onLoading] = React.useState(false);
    const [error, onError] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Ghana', value: 'Ghana'},
        {label: 'Kenya', value: 'Kenya'},
    ]);

    const signup = () => {
      onLoading(true);
      if(email === '' || password === '' || value === null) {
        onError('Please enter all fields');
        onLoading(false);
        return;
      }

      onLoading(false);
      navigation.navigate('Profilefill', { email: email, password: password, country: value });
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
            leading={ <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Icon name="arrow-back"  
            // style={{backgroundColor:Colors.secondary,}}  
            color={theme.txt} size={30}
            />
            </TouchableOpacity>
        }/>

        <ScrollView showsVerticalScrollIndicator={false}>

        <Image source={require('../../assets/image/logo1.png')}
               resizeMode='stretch'
               style={{height:height/10,width:width/4.5,alignSelf:'center'}}></Image>

        <View style={{marginVertical:20}}>
            <Text style={[style.title,{color:theme.txt,alignSelf:'center'}]}>Create New Account</Text>
        </View>      

        <View style={[style.inputContainer,{marginTop:20,borderColor: isFocused === 'Email' ? Colors.primary : theme.input,borderWidth:1,backgroundColor: isFocused==='Email' ?'#584CF410': theme.input}]}>
        <Icon name='mail' size={25} color={isFocused==='Email' ?'#584CF4': Colors.disable}></Icon>
                <TextInput placeholder='Email'
                    keyboardType='email-address'
                    selectionColor={Colors.primary}
                    onFocus={() => setIsFocused('Email')}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={onChangeEmail}
                    autoCapitalize='none'
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

        <View style={[style.txtinput,{borderColor: isFocused === 'Country' ? Colors.primary : theme.input,backgroundColor: isFocused ==='Country' ?'#584CF410': theme.input,marginTop:10}]}>
            {/* <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select your country"
                style={{ borderColor: isFocused === 'Country' ? Colors.primary : theme.input, backgroundColor: isFocused ==='Country' ?'#584CF410': theme.input }}
            /> */}
            <Dropdown
                style={{ backgroundColor: '#FAFAFA', padding: 10, borderRadius: 10 }}
                /* placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle} */
                data={items}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select your country"
                // searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                    setValue(item.value);
                }}
            />
        </View>

        {/* <View style={{ flexDirection: 'row', marginVertical: 20, paddingLeft:10,alignItems:'center',justifyContent:'center' }}>
         
        <CheckBox
           value={isSelected}
           onValueChange={() => setIsSelected(!isSelected)}
           tintColors={{ true: Colors.primary, false: Colors.primary }}/>
        <View>
            <Text style={[style.b18,{color:theme.txt,marginLeft:5}]}>Remember me</Text>
        </View>
            
        </View> */}

       <View style={{}}>
          {
            error && error.length > 0 ? (
              <Text style={{ color: 'red', marginTop: 20, textAlign: 'center' }}>{error}</Text>
            ) : (
              null
            )
          }
          {
            loading ? (
              <View style={{ marginTop: 100 }}>
                <TouchableOpacity 
                style={style.btn}>
                  <ActivityIndicator size="small" color="#ffffff" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginTop: 100 }}>
                <TouchableOpacity onPress={() => signup()} style={style.btn}>
                  <Text style={style.btntxt}>Sign up</Text>
                </TouchableOpacity>
              </View>
            )
          }
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
            <Text style={[style.r14,{color:theme.inputtxt}]}>Have an account?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text style={[style.b14,{color:Colors.primary,}]}> Sign In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}