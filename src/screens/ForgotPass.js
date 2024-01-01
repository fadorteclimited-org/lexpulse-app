import { View, Text ,SafeAreaView, TextInput, StatusBar,TouchableOpacity,Image,ScrollView,Dimensions} from 'react-native'
import React,{useState,useContext} from 'react'
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar, Avatar} from '@react-native-material/core';
import  Icon  from 'react-native-vector-icons/Ionicons';

const width =Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function ForgotPass() {

    const theme = useContext(themeContext);
    const navigation=useNavigation();

    const [isFocused, setIsFocused] = useState(false);
    const [loading, onLoading] = React.useState(false);
    const [error, onError] = React.useState('');
    const [email, onChangeEmail] = React.useState('');

    const sendCode = () => {
        onLoading(true);

        if(email === '') {
          onError('Please enter email');
          onLoading(false);
          return;
        }

        try {
          var config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
      
          var data = {
            "email": email
          };
          
          var url = `${ENDPOINTS.login}/reset-password`;
      
          axios.post(url, data, config)
          .then(async (res) => {
            onLoading(false);
            navigation.navigate('OtpVerification', { email: email, fromRoute: 'forgotPassword' });
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
    <View style={[style.main,{backgroundColor:theme.bg,marginTop:20}]}>
        <AppBar 
            color={theme.bg}
            title='Forgot Password'
            titleStyle={[style.apptitle,{color:theme.txt}]}
            elevation={0}
            leading={ <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back"  
            // style={{backgroundColor:Colors.secondary,}}  
            color={theme.txt} size={30}
            />
            </TouchableOpacity>
        }/>

        <ScrollView showsVerticalScrollIndicator={false}>

        <Image source={require('../../assets/image/forgot.png')}
            resizeMode='stretch'
            style={{height:height/3.5,width:width/1.4,alignSelf:'center',marginTop:30}}>
        </Image>

        <Text style={[style.r18,{color:theme.txt,marginTop:35}]}>Please enter your email so we can send you a code to reset your password</Text>

        {/* <View style={{flexDirection:'row',alignItems:'center',padding:15,borderWidth:1,borderRadius:20,marginTop:25,borderColor:theme.border,backgroundColor:theme.borderbg}}>
            <Avatar image={require('../../assets/image/m.png')}
            style={{backgroundColor:'transparent'}} size={65}></Avatar>
            <View style={{marginHorizontal:20}}>
                <Text style={[style.r14,{color:theme.disable}]}>via SMS:</Text>
                <Text style={[style.b16,{color:theme.txt}]}>+1 111 ******99</Text>
            </View>
        </View>

        <View style={{flexDirection:'row',alignItems:'center',padding:15,borderWidth:1,borderRadius:20,marginTop:20,borderColor:theme.border,backgroundColor:theme.borderbg}}>
            <Avatar image={require('../../assets/image/m1.png')}
            style={{backgroundColor:'transparent'}} size={65}></Avatar>
            <View style={{marginHorizontal:20}}>
                <Text style={[style.r14,{color:theme.disable}]}>via Email:</Text>
                <Text style={[style.b16,{color:theme.txt}]}>and***ley@yourdomain.com</Text>
            </View>
        </View> */}

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

        {/* <View style={{marginTop:40,marginBottom:20}}>
        <TouchableOpacity onPress={()=>navigation.navigate('OtpVerification')} 
            style={[style.btn]}>
            <Text style={style.btntxt}>Continue</Text>
        </TouchableOpacity>
        </View> */}

       <View style={{ marginTop:40, marginBottom:20 }}>
          {
            error && error.length > 0 ? (
              <Text style={{ color: 'red', marginTop: 20, marginBottom: 20, textAlign: 'center' }}>{error}</Text>
            ) : (
              null
            )
          }
          {
            loading ? (
              <TouchableOpacity 
              style={style.btn}>
                <ActivityIndicator size="small" color="#ffffff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => sendCode()} 
              style={style.btn}>
                <Text style={style.btntxt}>Continue</Text>
              </TouchableOpacity>
            )
          }
        </View>
        
    </ScrollView>
    </View>
    </SafeAreaView>
  )
}