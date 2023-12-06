import { View, Text ,SafeAreaView, TextInput, StatusBar,TouchableOpacity,Image,ScrollView,Dimensions,KeyboardAvoidingView} from 'react-native'
import React,{useState,useContext,useCallback} from 'react'
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar} from '@react-native-material/core';
import  Icon  from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

const width =Dimensions.get('screen').width
const height = Dimensions.get('screen').height


export default function Signup() {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const theme = useContext(themeContext);
    const navigation=useNavigation();
    const [isSelected, setIsSelected] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

  return (
     <SafeAreaView style={[style.area,{backgroundColor:theme.bg,}]}>

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex:1}}>
        
        <View style={[style.main,{backgroundColor:theme.bg,marginTop:20}]}>
            <AppBar 
            color={theme.bg}
            elevation={0}
            leading={ <TouchableOpacity onPress={()=>navigation.navigate('Letsin')}>
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
                    selectionColor={Colors.primary}
                    onFocus={() => setIsFocused('Email')}
                    onBlur={() => setIsFocused(false)}
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
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    style={[{paddingHorizontal:10,color:theme.txt,fontFamily:'Urbanist-Regular',flex:1}]}
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} >
                        <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} color={isFocused==='Password' ?'#584CF4': Colors.disable} size={20} />
                    </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', marginVertical: 20, paddingLeft:10,alignItems:'center',justifyContent:'center' }}>
         
        <CheckBox
           value={isSelected}
           onValueChange={() => setIsSelected(!isSelected)}
           tintColors={{ true: Colors.primary, false: Colors.primary }}/>
        <View>
            <Text style={[style.b18,{color:theme.txt,marginLeft:5}]}>Remember me</Text>
        </View>
            
        </View>

       <View style={{}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Profilefill')} 
            style={style.btn}>
               <Text style={style.btntxt}>Sign up</Text>
            </TouchableOpacity>
        </View>

        

        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', paddingHorizontal:30,marginVertical:50}}>
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
        </View>

        <View style={{flexDirection:'row',justifyContent:'center',paddingTop:30,marginBottom:10}}>
            <Text style={[style.r14,{color:theme.inputtxt}]}>Don't have an account?</Text>
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